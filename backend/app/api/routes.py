from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import ResearchRequest, ResearchResponse
from app.services.research_service import ResearchService
import uuid
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Dependency to get the research service
def get_research_service():
    return ResearchService()

@router.post("/research", response_model=ResearchResponse)
async def perform_research(
    request: ResearchRequest, 
    service: ResearchService = Depends(get_research_service)
):
    """
    Main endpoint to initiate a multi-agent research task.
    """
    request_id = str(uuid.uuid4())
    logger.info(f"Received research request [{request_id}] for topic: {request.topic}")
    
    try:
        report, sources, feedback = await service.run_pipeline(request.topic)
        
        return ResearchResponse(
            report=report,
            sources=sources,
            feedback=feedback,
            request_id=request_id
        )
    except Exception as e:
        logger.error(f"Error processing research [{request_id}]: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred during the research process.")

@router.get("/history")
async def get_research_history(service: ResearchService = Depends(get_research_service)):
    """
    Returns the history of research tasks performed during this session.
    """
    return service.get_history()
