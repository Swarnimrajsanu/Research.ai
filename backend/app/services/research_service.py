from langchain_openai import ChatOpenAI
from app.core.config import settings
from app.agents.search_agent import SearchAgent
from app.agents.reader_agent import ReaderAgent
from app.agents.writer_agent import WriterAgent
from app.agents.critic_agent import CriticAgent
import logging

logger = logging.getLogger(__name__)

class ResearchService:
    # In-memory history storage
    _history = []

    def __init__(self):
        self.llm = ChatOpenAI(
            openai_api_key=settings.OPENROUTER_API_KEY,
            openai_api_base="https://openrouter.ai/api/v1",
            model=settings.LLM_MODEL,
            temperature=0.2,
            default_headers={
                "HTTP-Referer": "https://research.ai", # Change to your actual domain
                "X-Title": settings.PROJECT_NAME
            }
        )
        self.search_agent = SearchAgent()
        self.reader_agent = ReaderAgent()
        self.writer_agent = WriterAgent(self.llm)
        self.critic_agent = CriticAgent(self.llm)

    async def run_pipeline(self, topic: str):
        """
        Orchestrates the multi-agent research pipeline.
        """
        try:
            # 1. Search
            logger.info(f"Step 1: Searching for '{topic}'")
            search_results = await self.search_agent.execute(topic)
            if not search_results:
                return "Failed to find any resources.", [], "No sources found."

            urls = [res['url'] for res in search_results]
            sources = [{"title": res.get('title', 'N/A'), "url": res['url'], "snippet": res.get('content', '')} for res in search_results]

            # 2. Scrape/Read in parallel
            logger.info(f"Step 2: Scrapping {len(urls)} sources")
            raw_contents = await self.reader_agent.execute(urls)
            combined_data = "\n\n".join(raw_contents)

            # 3. Write
            logger.info("Step 3: Writing report")
            # We limit the data passed to the writer to avoid token limits
            # In a production app, you might summarize chunks first
            report = await self.writer_agent.execute(topic, combined_data[:20000])

            # 4. Review
            logger.info("Step 4: Reviewing report")
            feedback = await self.critic_agent.execute(report)

            result = {
                "topic": topic,
                "report": report,
                "sources": sources,
                "feedback": feedback
            }
            self._history.append(result)

            return report, sources, feedback

        except Exception as e:
            logger.error(f"Pipeline error: {str(e)}")
            raise e

    def get_history(self):
        return self._history
