from langchain_community.tools.tavily_search import TavilySearchResults
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class SearchTool:
    def __init__(self):
        self.search = TavilySearchResults(
            tavily_api_key=settings.TAVILY_API_KEY,
            max_results=5
        )

    async def run(self, query: str):
        """
        Executes a search query and returns the results.
        Returns a list of dictionaries with 'url', 'title', and 'content'.
        """
        logger.info(f"Searching web for: {query}")
        try:
            # LangChain's Tavily tool run is synchronous usually, 
            # but we can wrap it or ensure we handle it.
            results = self.search.run(query)
            return results
        except Exception as e:
            logger.error(f"Search failed: {str(e)}")
            return []
