import { DuckDuckGoSearchAPI } from '@langchain/community/tools/duckduckgo';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

// Initialize the DuckDuckGo search API
const searchAPI = new DuckDuckGoSearchAPI();

// Create a prompt template for processing search results
const promptTemplate = PromptTemplate.fromTemplate(`
Summarize the following search results in a clear and concise way:

{searchResults}

Provide a brief summary highlighting the most relevant information.
`);

// Initialize LangChain with OpenAI
const model = new ChatOpenAI({
    temperature: 0.7,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY
});

// Create the LangChain chain
const chain = new LLMChain({
    llm: model,
    prompt: promptTemplate
});

export async function performSearch(query) {
    try {
        // Perform the search using DuckDuckGo
        const searchResults = await searchAPI.call(query);
        
        if (!searchResults || searchResults.length === 0) {
            throw new Error('No results found for the given query.');
        }

        // Process results with LangChain
        const processedResults = await chain.call({
            searchResults: searchResults
        });

        return {
            rawResults: searchResults,
            summary: processedResults.text
        };
    } catch (error) {
        if (error.message.includes('API key')) {
            throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
        }
        throw new Error(`Search failed: ${error.message}`);
    }
}
