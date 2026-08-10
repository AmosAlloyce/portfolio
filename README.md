# Portfolio Website - AI-Powered GitHub Showcase

A Ruby on Rails portfolio website that showcases your top GitHub repositories with AI-powered descriptions, code analysis, and one-click Docker container launching via Play-with-Docker.

## Features

- 🚀 **Automated GitHub Integration** - Syncs your top 7 repositories automatically
- 🤖 **AI-Powered Descriptions** - Uses Groq AI to generate engaging project descriptions
- 🐳 **Docker Launch Integration** - One-click container launching via Play-with-Docker
- 💬 **AI Chatbot** - Interactive assistant to help visitors explore your projects
- 📊 **Real-time Stats** - GitHub stars, forks, and language information
- 🎨 **Modern UI** - Built with Tailwind CSS for a professional look
- 🔍 **Smart Search & Filtering** - Filter by language, Docker availability, or search

## Tech Stack

- **Backend:** Ruby on Rails 7.1
- **Database:** PostgreSQL 15
- **Cache:** Redis 7
- **AI:** Groq API (llama-3.1-70b-versatile)
- **GitHub API:** Octokit
- **Styling:** Tailwind CSS
- **Deployment:** Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose installed
- GitHub Personal Access Token
- Groq API Key

## Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd portfolio
cp .env.example .env
# Edit .env with your API keys
```

### 2. Start Application

```bash
docker compose up
```

Visit: **http://localhost:3000**

### 3. Initialize Database

```bash
docker compose run --rm web rails db:create db:migrate
docker compose run --rm web rails runner "GithubSyncService.new.sync_all"
```

## API Endpoints

- `POST /api/sync` - Sync GitHub repositories
- `POST /api/chat` - AI chatbot interaction

## Documentation

- **TECHNICAL_PLAN.md** - Complete architecture details
- **FRONTEND_DESIGN.md** - UI/UX specifications

## Contact

**Amos Alloyce** - [@AmosAlloyce](https://github.com/AmosAlloyce)
