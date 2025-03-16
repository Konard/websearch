import { performSearch } from './search.mjs';
import { formatResults } from './utils.mjs';

async function main() {
    // Get search query from command line arguments
    const query = process.argv[2];

    if (!query) {
        console.error('Please provide a search query as a command line argument');
        console.error('Usage: node src/index.mjs "your search query"');
        process.exit(1);
    }

    try {
        console.log('\nSearching for:', query, '\n');
        const results = await performSearch(query);
        if (results && results.summary) {
            console.log(formatResults(results));
        } else {
            console.log('No results found for your query.');
        }
    } catch (error) {
        console.error('\nError:', error.message);
        process.exit(1);
    }
}

// Start the application
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});