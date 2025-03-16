import readline from 'readline';
import { performSearch } from './search.js';
import { formatResults } from './utils.js';

// Create readline interface for command line interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    console.log('DuckDuckGo Search CLI (Type "exit" to quit)\n');

    const askQuestion = () => {
        rl.question('Enter your search query: ', async (query) => {
            if (query.toLowerCase() === 'exit') {
                rl.close();
                return;
            }

            try {
                console.log('\nSearching...\n');
                const results = await performSearch(query);
                console.log(formatResults(results));
            } catch (error) {
                console.error('Error:', error.message);
            }

            askQuestion(); // Continue asking for new queries
        });
    };

    askQuestion();
}

main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});

// Handle cleanup
rl.on('close', () => {
    console.log('\nThank you for using DuckDuckGo Search CLI!');
    process.exit(0);
});
