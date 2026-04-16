from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Research.ai"
    DEBUG: bool = True
    
    # OpenAI
    OPENAI_API_KEY: str
    LLM_MODEL: str = "gpt-4-turbo-preview"
    
    # Search
    TAVILY_API_KEY: str
    
    # Redis
    REDIS_URL: Optional[str] = None
    
    model_config = SettingsConfigDict(env_file="backend/.env")

settings = Settings()
