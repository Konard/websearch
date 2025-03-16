/**
 * Formats the search results for console output
 * @param {Object} results - The search results object
 * @returns {string} Formatted string for console output
 */
export function formatResults(results) {
    const { rawResults, summary } = results;

    if (!rawResults && !summary) {
        return 'No results found.';
    }

    let output = '\n=== Search Results ===\n\n';

    // Add the LangChain summary if available
    if (summary) {
        output += 'Summary:\n';
        output += '---------\n';
        output += summary + '\n\n';
    }

    // Add raw results if they differ from the summary
    if (rawResults && rawResults !== summary) {
        output += 'Detailed Results:\n';
        output += '----------------\n';
        output += rawResults + '\n';
    }

    output += '===================\n';
    return output;
}