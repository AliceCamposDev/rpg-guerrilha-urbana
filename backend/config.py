import os
from pathlib import Path
import obsidiantools.api as otools

# Configurações globais
VAULT = None

# Caminhos
def get_vault_path():
    """Retorna o caminho para o vault Obsidian"""
    paths_to_try = [
        Path("public/assets/book"),
        Path("./public/assets/book"),
        Path(__file__).parent / "public" / "assets" / "book",
    ]
    
    for path in paths_to_try:
        if path.exists():
            print(f"Vault encontrado em: {path.absolute()}")
            return path
    
    raise FileNotFoundError(f"Nenhum vault encontrado. Diretório atual: {Path.cwd()}")

def init_vault():
    """Inicializa o vault Obsidian"""
    global VAULT
    
    if VAULT is not None:
        return VAULT
    
    try:
        vault_path = get_vault_path()
        VAULT = otools.Vault(vault_path).connect().gather()
        print(f"Vault inicializado: {len(VAULT.get_note_metadata())} notas")
        return VAULT
    except Exception as e:
        print(f"Erro ao inicializar vault: {e}")
        raise