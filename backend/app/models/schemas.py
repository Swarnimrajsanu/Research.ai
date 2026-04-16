from pydantic import BaseModel, Field
from typing import List, Optional

class ResearchRequest(BaseModel):
    topic: str = Field(..., example="The impact of quantum computing on modern cybersecurity")

class Source(BaseModel):
    title: str
    url: str
    snippet: Optional[str] = None

class ResearchResponse(BaseModel):
    report: str
    sources: List[Source]
    feedback: str
    request_id: Optional[str] = None
