from app.tools.search_tool import SearchTool
import logging

logger = logging.getLogger(__name__)

class SearchAgent:
    def __init__(self):
        self.tool = SearchTool()

    async def execute(self, topic: str):
        logger.info(f"SearchAgent executing for topic: {topic}")
        results = await self.tool.run(topic)
        return results
