# Portfolio Website 🚀

### https://portfolio-web-limn.onrender.com/

A modern, full-stack portfolio website featuring a stunning purple-themed design with particle effects, AI-powered chat assistant, and seamless GitHub integration. Built with Ruby on Rails backend and React frontend.

## ✨ Features

### Landing Page
- 🎨 **Purple Gradient Theme** - Eye-catching design with animated particle background
- ⌨️ **Typewriter Effect** - Dynamic role showcase (Software Engineer, Full Stack Developer, Cloud Architect, DevOps Enthusiast)
- 👋 **Interactive Hero Section** - Engaging introduction with wave animation
- 💼 **About Section** - Professional introduction highlighting skills and interests
- 🔗 **Social Integration** - Direct links to GitHub profile

### Projects Showcase
- 🚀 **Automated GitHub Integration** - Syncs your top repositories automatically
- 🤖 **AI-Powered Descriptions** - Uses Groq AI (openai/gpt-oss-120b) to generate engaging project descriptions
- 🐳 **Docker Launch Integration** - One-click container launching via GitHub Codespaces
- 📊 **Real-time Stats** - GitHub stars, forks, and language information
- 🎯 **Full-Width Cards** - Beautiful repository cards with purple shadows and hover effects

### AI Chat Assistant
- 💬 **Interactive Chatbot** - AI assistant powered by Groq to help visitors explore projects
- 🧠 **Context-Aware** - Understands your portfolio structure, tech stack, and project details
- 🎨 **Purple-Themed UI** - Matches the overall design aesthetic
- ⚡ **Real-time Responses** - Fast, intelligent answers about your work

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with custom purple theme
- **Effects:** 
  - react-tsparticles for animated background
  - typewriter-effect for dynamic text
  - react-parallax-tilt for 3D effects
  - react-icons for social icons
- **Routing:** React Router v6

### Backend
- **Framework:** Ruby on Rails 7.1
- **Database:** PostgreSQL 15
- **Cache:** Redis 7
- **AI:** Groq API (openai/gpt-oss-120b model)
- **GitHub API:** Octokit
- **Deployment:** Docker & Docker Compose

### Design Features
- Custom purple color scheme (#c770f0, #be50f4)
- Animated particle background
- Custom scrollbar styling
- Smooth transitions and hover effects
- Wave animation for emojis
- Responsive design for all devices

## 📋 Prerequisites

- Docker and Docker Compose installed
- GitHub Personal Access Token
- Groq API Key

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/AmosAlloyce/portfolio.git
cd portfolio
cp .env.example .env
# Edit .env with your API keys:
# - GITHUB_TOKEN=your_github_token
# - GROQ_API_KEY=your_groq_api_key
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

## 🎯 Project Structure

```
portfolio/
├── app/                    # Rails backend
│   ├── controllers/       # API endpoints
│   ├── models/           # Database models
│   ├── services/         # Business logic (GitHub sync, Groq AI)
│   └── views/            # Rails views
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Type.jsx          # Typewriter effect
│   │   │   ├── Particle.jsx      # Particle background
│   │   │   ├── Header.jsx        # Navigation
│   │   │   ├── ChatWidget.jsx    # AI chat
│   │   │   └── RepositoryCard.jsx # Project cards
│   │   ├── App.jsx       # Main app component
│   │   └── index.css     # Purple theme styles
│   └── dist/             # Built frontend assets
└── config/               # Rails configuration
```

## 🌐 Routes

- `/` - Landing page with hero section and introduction
- `/projects` - Full repository listings with stats
- `/repositories/:id` - Individual project details

## 🔌 API Endpoints

- `GET /api/repositories` - Fetch all repositories
- `GET /api/repositories/:id` - Fetch single repository
- `POST /api/sync` - Sync GitHub repositories
- `POST /api/chat` - AI chatbot interaction

## 🎨 Design System

### Colors
- **Primary Purple:** #c770f0
- **Accent Purple:** #be50f4
- **Dark Background:** #0c0513
- **Purple Background:** rgba(27, 26, 46, 0.66)

### Key Features
- Particle animation background
- Purple gradient buttons and cards
- Custom scrollbar with purple theme
- Smooth hover effects and transitions
- Wave animation for emojis
- Responsive grid layouts

## 📚 Documentation

- **TECHNICAL_PLAN.md** - Complete architecture details
- **FRONTEND_DESIGN.md** - UI/UX specifications
- **DEPLOYMENT.md** - Deployment instructions

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork it and customize it for your own use!

## 📧 Contact

**Alloyce Amos** - Software Engineer

- GitHub: [@AmosAlloyce](https://github.com/AmosAlloyce)
- Portfolio: [https://portfolio-web-limn.onrender.com](https://portfolio-web-limn.onrender.com)

---

Built with ❤️ using Rails, React, and AI