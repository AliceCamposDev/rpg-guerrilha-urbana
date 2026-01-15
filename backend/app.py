from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import obsidiantools.api as otools
import os
import uvicorn
from pathlib import Path
import json
import math
import pandas as pd

# Variável global para o vault
vault = None

class CustomJSONEncoder(json.JSONEncoder):
    """Encoder JSON personalizado para lidar com NaN, Inf, etc."""
    def encode(self, obj):
        return super().encode(self.default(obj))
    
    def default(self, obj):
        if isinstance(obj, float):
            # Converte NaN e Inf para None ou string
            if math.isnan(obj) or math.isinf(obj):
                return None
        # Para qualquer outro tipo, usa o comportamento padrão
        try:
            return super().default(obj)
        except TypeError:
            return str(obj)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager para gerenciar o ciclo de vida da aplicação"""
    global vault
    
    # Startup - carrega o vault
    print("🚀 Iniciando aplicação...")
    
    # ⚠️ ATENÇÃO: Use uma CÓPIA somente leitura do seu vault!
    # Nunca exponha seu vault original com anotações privadas.
    VAULT_PATH = Path("public/assets/book")  # Usar Path em vez de string
    
    if not VAULT_PATH.exists():
        # Tentar caminho alternativo
        VAULT_PATH = Path("./public/assets/book")
    
    if not VAULT_PATH.exists():
        # Tentar caminho absoluto
        current_dir = Path(__file__).parent
        VAULT_PATH = current_dir / "public" / "assets" / "book"
    
    print(f"📁 Procurando vault em: {VAULT_PATH.absolute()}")
    
    if not VAULT_PATH.exists():
        raise FileNotFoundError(f"Pasta '{VAULT_PATH.absolute()}' não encontrada. Diretório atual: {Path.cwd()}")
    
    try:
        print(f"🔍 Carregando vault de: {VAULT_PATH}")
        vault = otools.Vault(VAULT_PATH).connect().gather()
        print(f"✅ Vault carregado: {len(vault.get_note_metadata())} notas encontradas")
        
        # Verificar métodos disponíveis no vault
        print(f"📝 Métodos disponíveis no vault: {[m for m in dir(vault) if not m.startswith('_')]}")
        
    except Exception as e:
        print(f"❌ Erro ao carregar vault: {e}")
        import traceback
        traceback.print_exc()  # Para mais detalhes do erro
        vault = None
    
    yield
    
    # Shutdown - limpa recursos
    print("👋 Encerrando aplicação...")
    vault = None

app = FastAPI(lifespan=lifespan)

# Configurar o JSON encoder personalizado
app.json_encoder = CustomJSONEncoder

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, troque pelo domínio do seu site
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_dataframe_for_json(df):
    """Limpa um DataFrame pandas para serialização JSON"""
    if df is None:
        return []
    
    # Converte para dicionário e limpa valores NaN
    records = df.to_dict(orient="records")
    
    # Função para limpar recursivamente valores NaN
    def clean_nested(obj):
        if isinstance(obj, dict):
            return {k: clean_nested(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [clean_nested(item) for item in obj]
        elif isinstance(obj, float) and (math.isnan(obj) or math.isinf(obj)):
            return None
        elif isinstance(obj, (int, str, bool)) or obj is None:
            return obj
        else:
            return str(obj)  # Converte outros tipos para string
    
    return [clean_nested(record) for record in records]

@app.get("/")
async def root():
    """Endpoint raiz para verificar se a API está funcionando"""
    global vault
    
    return {
        "message": "API do Vault Obsidian",
        "status": "online" if vault is not None else "vault não carregado",
        "endpoints": {
            "/api/graph": "Retorna o grafo de conexões entre notas",
            "/api/notes": "Lista todas as notas",
            "/api/note/{note_name}": "Retorna conteúdo de uma nota específica",
            "/api/search/{query}": "Busca em notas"
        }
    }

@app.get("/api/graph")
async def get_graph():
    """Endpoint principal: retorna nós e arestas para o gráfico"""
    global vault
    
    if vault is None:
        return {"nodes": [], "edges": [], "error": "Vault não carregado"}
    
    try:
        # Pega o grafo interno (usando networkx)
        g = vault.graph
        
        # Converte para formato que o frontend entende
        nodes = []
        edges = []
        
        # Nós: cada nota
        for node_id in g.nodes():
            nodes.append({
                "id": node_id,
                "label": os.path.splitext(node_id)[0],  # Remove .md
                "size": g.degree(node_id) + 3  # Tamanho baseado em conexões
            })
        
        # Arestas: cada link entre notas
        for source, target in g.edges():
            edges.append({
                "id": f"{source}-{target}",
                "source": source,
                "target": target
            })
        
        return {
            "nodes": nodes,
            "edges": edges,
            "stats": {
                "total_notes": len(nodes),
                "total_links": len(edges)
            }
        }
        
    except Exception as e:
        return {"nodes": [], "edges": [], "error": str(e)}

@app.get("/api/notes")
async def get_notes():
    """Lista todas as notas com metadados básicos"""
    global vault
    
    if vault is None:
        return []
    
    try:
        notes_metadata = vault.get_note_metadata()
        # Usa a função de limpeza para remover NaN
        return clean_dataframe_for_json(notes_metadata)
    except Exception as e:
        return {"error": f"Erro ao obter notas: {str(e)}"}

@app.get("/api/note/{note_name}")
async def get_note_content(note_name: str):
    """Retorna o conteúdo de uma nota específica"""
    global vault
    
    if vault is None:
        raise HTTPException(status_code=500, detail="Vault não carregado")
    
    try:
        # Adiciona .md se não tiver extensão
        if not note_name.endswith('.md'):
            note_name_with_ext = f"{note_name}.md"
        else:
            note_name_with_ext = note_name
        
        # Verificar se a nota existe
        notes_metadata = vault.get_note_metadata()
        
        if note_name_with_ext not in notes_metadata.index:
            # Tentar encontrar por nome sem extensão
            for note_id in notes_metadata.index:
                if isinstance(note_id, str) and note_id.replace('.md', '') == note_name:
                    note_name_with_ext = note_id
                    break
            else:
                raise HTTPException(status_code=404, detail=f"Nota '{note_name}' não encontrada")
        
        # O obsidiantools tem método read_note() para ler conteúdo
        # Vamos verificar quais métodos estão disponíveis
        try:
            # Método 1: Tentar usar read_note() se disponível
            if hasattr(vault, 'read_note'):
                content = vault.read_note(note_name_with_ext)
            # Método 2: Tentar acessar diretamente pelo índice
            elif hasattr(vault, 'notes'):
                content = vault.notes.get(note_name_with_ext, "Conteúdo não disponível")
            # Método 3: Ler arquivo diretamente
            else:
                # Encontrar o caminho da nota
                note_path = notes_metadata.loc[note_name_with_ext, 'abs_filepath']
                if pd.isna(note_path):
                    raise HTTPException(status_code=404, detail=f"Caminho da nota '{note_name}' não encontrado")
                
                with open(str(note_path), 'r', encoding='utf-8') as f:
                    content = f.read()
            
            return {
                "name": note_name_with_ext,
                "content": content,
                "metadata": notes_metadata.loc[note_name_with_ext].to_dict() if note_name_with_ext in notes_metadata.index else {}
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Erro ao ler nota: {str(e)}")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar requisição: {str(e)}")

@app.get("/api/search/{query}")
async def search_notes(query: str):
    """Busca texto nas notas"""
    global vault
    
    if vault is None:
        return []
    
    try:
        results = []
        notes_metadata = vault.get_note_metadata()
        
        for note_id in notes_metadata.index:
            if notes_metadata.loc[note_id, 'note_exists']:
                try:
                    # Obter conteúdo da nota
                    if hasattr(vault, 'read_note'):
                        content = vault.read_note(note_id)
                    else:
                        note_path = notes_metadata.loc[note_id, 'abs_filepath']
                        if not pd.isna(note_path):
                            with open(str(note_path), 'r', encoding='utf-8') as f:
                                content = f.read()
                        else:
                            continue
                    
                    # Buscar pelo texto
                    if query.lower() in content.lower():
                        results.append({
                            "note": note_id,
                            "excerpt": content[:200] + "..." if len(content) > 200 else content
                        })
                        
                except Exception as e:
                    continue
        
        return results
        
    except Exception as e:
        return {"error": f"Erro na busca: {str(e)}"}

@app.get("/health")
async def health_check():
    """Endpoint de saúde para verificar o status do servidor"""
    global vault
    try:
        vault_loaded = vault is not None
        vault_notes = len(vault.get_note_metadata()) if vault else 0
        
        return {
            "status": "healthy",
            "vault_loaded": vault_loaded,
            "vault_notes": vault_notes
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    # Para desenvolvimento com reload, execute no terminal:
    # uvicorn app:app --host 0.0.0.0 --port 8000 --reload
    
    # Ou execute sem reload:
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)