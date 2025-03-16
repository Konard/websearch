/**
 * Formats the search results for console output
 * @param {Object} results - The search results object
 * @returns {string} Formatted string for console output
 */
export function formatResults(results) {
    const { rawResults, summary } = results;

    let output = '\n=== Search Results ===\n\n';

    // Add the LangChain summary
    output += 'Summary:\n';
    output += '---------\n';
    output += summary + '\n\n';

    // Add raw results
    output += 'Detailed Results:\n';
    output += '----------------\n';
    const resultItems = rawResults.split('\n\n');
    resultItems.forEach((result, index) => {
        if (result.trim()) {
            output += `${index + 1}. ${result.trim()}\n\n`;
        }
    });

    output += '===================\n';

    return output;
}