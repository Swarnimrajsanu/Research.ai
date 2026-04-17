from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import ResearchRequest, ResearchResponse
from app.services.research_service import ResearchService
import uuid
import logging
from app.api.deps import get_current_user
from supabase import create_client, Client
from app.core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()

# Initialize Supabase Client
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)


# Dependency to get the research service
def get_research_service():
    return ResearchService()

@router.post("/research", response_model=ResearchResponse)
async def perform_research(
    request: ResearchRequest, 
    service: ResearchService = Depends(get_research_service),
    user_id: str = Depends(get_current_user)
):
    """
    Main endpoint to initiate a multi-agent research task.
    """
    request_id = str(uuid.uuid4())
    logger.info(f"Received research request [{request_id}] for topic: {request.topic}")
    
    try:
        report, sources, feedback = await service.run_pipeline(request.topic)
        
        # Save to Supabase DB
        try:
            supabase.table("research_history").insert({
                "user_id": user_id,
                "topic": request.topic,
                "report": report
            }).execute()
            logger.info("Saved research to database successfully.")
        except Exception as db_err:
            logger.error(f"Error saving to DB: {str(db_err)}")

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
async def get_research_history(user_id: str = Depends(get_current_user)):
    """
    Returns the history of research tasks performed from the database.
    """
    try:
        response = supabase.table("research_history").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching history from DB: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve history")

