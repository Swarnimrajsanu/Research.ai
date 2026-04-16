from app.tools.scraper_tool import ScraperTool
import asyncio
import logging
from typing import List

logger = logging.getLogger(__name__)

class ReaderAgent:
    def __init__(self):
        self.tool = ScraperTool()

    async def execute(self, urls: List[str]):
        """
        Scrapes multiple URLs in parallel using asyncio.gather.
        """
        logger.info(f"ReaderAgent scraping {len(urls)} URLs in parallel")
        tasks = [self.tool.scrape(url) for url in urls]
        results = await asyncio.gather(*tasks)
        
        # Filter out failed scrapes
        valid_results = [res for res in results if res]
        return valid_results
        
    async def summarize(self, content: str, llm):
        """
        Small utility to summarize individual content chunks if needed.
        """
        # For this pipeline, we'll pass the full content to the Writer, 
        # but this is here for modularity.
        pass
        
