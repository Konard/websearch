import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

// Create a prompt template for processing search results
const promptTemplate = PromptTemplate.fromTemplate(`
Summarize the following search results in a clear and concise way:

{searchResults}

Provide a brief summary highlighting the most relevant information.
`);

// Initialize LangChain with OpenAI using custom endpoint
const model = new ChatOpenAI({
    temperature: 0.7,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: 'https://api.deep-foundation.tech/v1/'
    }
});

// Create the LangChain chain
const chain = new LLMChain({
    llm: model,
    prompt: promptTemplate
});

async function searchDuckDuckGo(query) {
    try {
        // Use only essential DuckDuckGo parameters
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);

        if (!response.ok) {
            throw new Error(`DuckDuckGo search request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        let results = [];

        // Process Abstract text
        if (data.AbstractText) {
            results.push(data.AbstractText);
        }

        // Process RelatedTopics
        if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
            data.RelatedTopics.forEach(topic => {
                if (topic.Text) {
                    results.push(topic.Text);
                }
            });
        }

        return results.length > 0 ? results.join('\n\n') : 'No detailed results found. Try rephrasing your search query.';

    } catch (error) {
        console.error('Search error:', error);
        throw new Error(`Search failed: ${error.message}`);
    }
}

export async function performSearch(query) {
    try {
        const searchResults = await searchDuckDuckGo(query);

        try {
            console.log('Processing results with LangChain...');
            const processedResults = await chain.call({
                searchResults: searchResults
            });

            return {
                rawResults: searchResults,
                summary: processedResults.text
            };
        } catch (summaryError) {
            console.error('Error generating summary:', summaryError);
            return {
                rawResults: searchResults,
                summary: 'Summary generation failed. Here are the raw results:\n' + searchResults
            };
        }
    } catch (error) {
        if (error.message.includes('API key')) {
            throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
        }
        throw error;
    }
}