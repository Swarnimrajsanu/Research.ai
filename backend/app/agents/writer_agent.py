from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class WriterAgent:
    def __init__(self, llm: ChatOpenAI):
        self.llm = llm
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an expert research writer. Write clear, structured and insightful reports."),
            ("human", """Write a detailed research report on the topic below.

Topic: {topic}

Research Gathered:
{data}

Structure the report as:
- Introduction
- Key Findings (minimum 3 well-explained points)
- Conclusion
- Sources (list all URLs found in the research)

Be detailed, factual and professional."""),
        ])

    async def execute(self, topic: str, data: str):
        logger.info(f"WriterAgent generating report for topic: {topic}")
        chain = self.prompt | self.llm
        response = await chain.ainvoke({"topic": topic, "data": data})
        return response.content
