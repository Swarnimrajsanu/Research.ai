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
    
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
