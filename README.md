# Infinity SaaS

Infinity SaaS is a cutting-edge platform designed to help businesses scale their marketing and sales efforts with AI-powered tools and automations. This repository contains the source code for Infinity SaaS, enabling you to customize, extend, or contribute to its development.

## Features

- **AI-Powered Cold Email Automation**: Send personalized cold emails by scraping recipient websites and tailoring messages using business context.
- **Gemini AI Integration**: Leverage advanced AI capabilities for generating insights, improving workflows, and automating repetitive tasks.
- **Data-Driven Insights**: Analyze performance metrics to optimize your marketing and sales strategies.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Express.js, Hono.js
- **Database**: MongoDB
- **AI Features**: Gemini AI
- **Deployment**: Vercel, AWS
- **Web Scraping**: Puppeteer, Cheerio

## Getting Started

### Prerequisites

- Node.js v16+
- MongoDB
- Environment variables for API keys (see `.env.example`)

### Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/infinity-saas.git
   cd infinity-saas
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Copy `.env.example` to `.env` and update the values for your API keys, MongoDB URI, and other configurations.  
   ```bash
   cp .env.example .env
   ```

4. **Run the Development Server**  
   ```bash
   npm run dev
   ```

   The app will be accessible at `http://localhost:3000`.

### Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run linting checks.
- `npm run test`: Run tests.


Built with ❤️ By Aryan
