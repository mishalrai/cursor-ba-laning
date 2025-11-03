#!/bin/bash

# Simple HTTP Server Starter for Testing
# This script starts a local web server to view your landing page

echo "🚀 Starting local web server..."
echo "📍 Your landing page will be available at: http://localhost:8000"
echo "🌐 Open this URL in your browser to view the page"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null
then
    echo "✅ Using Python 3"
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null
then
    echo "✅ Using Python 2"
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python is not installed. Please install Python to use this server."
    echo ""
    echo "Alternative: Just open index.html directly in your browser!"
    exit 1
fi

