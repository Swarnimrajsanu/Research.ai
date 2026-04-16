from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import logging

logger = logging.getLogger(__name__)

class CriticAgent:
    def __init__(self, llm: ChatOpenAI):
        self.llm = llm
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a sharp and constructive research critic. Be honest and specific."),
            ("human", """Review the research report below and evaluate it strictly.

Report:
{report}

Respond in this exact format:

Score: X/10

Strengths:
- ...
- ...

Areas to Improve:
- ...
- ...

One line verdict:
..."""),
        ])

    async def execute(self, report: str):
        logger.info("CriticAgent reviewing report")
        chain = self.prompt | self.llm
        response = await chain.ainvoke({"report": report})
        return response.content
