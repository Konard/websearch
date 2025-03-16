#!/bin/bash

# Check if .env file exists
if [ -f .env ]; then
    echo ".env file already exists. Please edit it manually if you need to make changes."
    exit 1
fi

# Prompt for OpenAI API key
echo "Please enter your OpenAI API key:"
read -r api_key

# Create .env file
echo "OPENAI_API_KEY=$api_key" > .env

echo ".env file created successfully!"
echo "You can now run the application using: node src/index.mjs \"your search query\""
