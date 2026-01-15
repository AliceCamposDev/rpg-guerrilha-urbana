from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from contextlib import asynccontextmanager
from utils import CustomJSONEncoder
from config import init_vault
from routes import graph, notes, health

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager"""
    print("Iniciando aplicação...")
    try:
        init_vault()
    except Exception as e:
        print(f"Vault não carregado: {e}")
    yield
    print("Encerrando aplicação...")

# Criar aplicação FastAPI
app = FastAPI(
    title="Obsidian Vault API",
    description="API para visualizar e navegar pelo seu vault Obsidian",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan
)

# Configurar encoder JSON
app.json_encoder = CustomJSONEncoder

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar arquivos estáticos

# Configurar templates
templates = Jinja2Templates(directory="backend/templates")

# Incluir rotas
app.include_router(graph.router, prefix="/api")
app.include_router(notes.router, prefix="/api")
# app.include_router(search.router, prefix="/api")
app.include_router(health.router, prefix="/api")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    """Página inicial com Swagger personalizado"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api")
async def api_root():
    """Endpoint raiz da API"""
    return {
        "message": "API do Vault Obsidian",
        "endpoints": {
            "/api/graph": "Retorna o grafo de conexões entre notas",
            "/api/notes": "Lista todas as notas",
            "/api/note/{note_name}": "Retorna conteúdo de uma nota específica",
            "/api/health": "Verifica o status do servidor",
            "/api/docs": "Documentação Swagger",
            "/api/redoc": "Documentação ReDoc"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)