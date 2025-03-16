# DuckDuckGo Search CLI with AI Summaries

A command-line interface tool that performs DuckDuckGo searches and provides AI-powered summaries of search results using LangChain and GPT-3.5.

## Features

- Search DuckDuckGo directly from the command line
- Get AI-generated summaries of search results
- View detailed search results alongside summaries
- Simple and easy-to-use interface

## Prerequisites

- Node.js 20 or higher
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd duckduckgo-search-cli
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

Alternatively, run the setup script:
```bash
chmod +x setup.sh
./setup.sh
```

## Usage

Run a search query:
```bash
node src/index.mjs "your search query"
```

Example:
```bash
node src/index.mjs "quantum computing"
```

The output will show:
- An AI-generated summary of the search results
- Detailed results from DuckDuckGo

## Project Structure

- `src/index.mjs` - Main entry point and CLI interface
- `src/search.mjs` - Search functionality and LangChain integration
- `src/utils.mjs` - Utility functions for formatting results

## Environment Configuration

The application uses a custom OpenAI API endpoint:
```
https://api.deep-foundation.tech/v1/
```

This is configured in `src/search.mjs` and doesn't require any additional setup.

## Dependencies

- @langchain/community
- @langchain/core
- @langchain/openai
- langchain

## Publishing to GitHub

To publish this repository to GitHub:

1. Create a new repository on GitHub (without initializing with README)

2. Initialize the local repository:
```bash
git init
git add .
git commit -m "Initial commit: DuckDuckGo Search CLI with AI summaries"
```

3. Add the remote repository and push:
```bash
git remote add origin [your-github-repo-url]
git branch -M main
git push -u origin main
```

## License

ISC

## Contributing

Feel free to open issues or submit pull requests for improvements!