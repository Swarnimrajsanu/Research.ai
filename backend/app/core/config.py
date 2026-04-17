from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Research.ai"
    DEBUG: bool = True
    
    # OpenRouter
    OPENROUTER_API_KEY: str
    LLM_MODEL: str = "openai/gpt-4o-mini"
    
    # Search
    TAVILY_API_KEY: str
    
    # Redis
    REDIS_URL: Optional[str] = None
    # Supabase Auth & DB
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_JWT_SECRET: str
    
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
