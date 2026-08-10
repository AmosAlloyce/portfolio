# Portfolio Website - Technical Plan

## Project Overview
A Ruby on Rails portfolio website showcasing 7 GitHub repositories with AI-powered features and Docker container launching capabilities via Play-with-Docker integration.

**GitHub Username:** AmosAlloyce

**Target Repositories:**
1. FinPulse (Python)
2. TechnicalOps_CaseStudy (Python)
3. bank_backend (Go)
4. go_microservices (Go)
5. java_and_python_microservices (Java)
6. crustdata-chatgpt-mcp (Python)
7. monte_carlo (Python/Node.js/React - AI Insurance Claims System)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Rails Views)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Portfolio    │  │ Project      │  │ AI Chatbot   │      │
│  │ Dashboard    │  │ Details      │  │ Interface    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Rails Backend (API + Controllers)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ GitHub API   │  │ Groq AI      │  │ PWD          │      │
│  │ Service      │  │ Service      │  │ Integration  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Repositories │  │ AI Cache     │  │ Analytics    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ GitHub API   │  │ Groq API     │  │ Play-with-   │      │
│  │              │  │              │  │ Docker       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Backend
- **Framework:** Ruby on Rails 7.1+
- **Database:** PostgreSQL 15+
- **Caching:** Redis (for API response caching)
- **Background Jobs:** Sidekiq (for async Groq processing)
- **API Client:** Octokit (GitHub API)
- **HTTP Client:** Faraday (Groq API)

### Frontend
- **Views:** ERB templates with Hotwire (Turbo + Stimulus)
- **CSS Framework:** Tailwind CSS
- **Icons:** Heroicons
- **Syntax Highlighting:** Highlight.js (for code snippets)

### AI Integration
- **Provider:** Groq API
- **Model:** llama-3.1-70b-versatile (or latest available)
- **Use Cases:**
  - Auto-generate project descriptions
  - Code analysis and technical summaries
  - Interactive chatbot for visitors

### Deployment
- **Primary Option:** Render.com (Free tier)
  - 750 hours/month free
  - PostgreSQL database included
  - Auto-deploy from GitHub
- **Backup Options:** Railway.app, Fly.io

---

## Database Schema

```sql
-- Repositories Table
CREATE TABLE repositories (
  id BIGSERIAL PRIMARY KEY,
  github_id BIGINT UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  description TEXT,
  html_url VARCHAR(500) NOT NULL,
  homepage VARCHAR(500),
  language VARCHAR(100),
  stargazers_count INTEGER DEFAULT 0,
  forks_count INTEGER DEFAULT 0,
  has_docker BOOLEAN DEFAULT false,
  docker_compose_url VARCHAR(500),
  dockerfile_url VARCHAR(500),
  readme_content TEXT,
  topics TEXT[], -- Array of topic tags
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT true,
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- AI Generated Content Table
CREATE TABLE ai_contents (
  id BIGSERIAL PRIMARY KEY,
  repository_id BIGINT REFERENCES repositories(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL, -- 'description', 'summary', 'analysis'
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  model VARCHAR(100) NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Table
CREATE TABLE analytics (
  id BIGSERIAL PRIMARY KEY,
  repository_id BIGINT REFERENCES repositories(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'view', 'docker_launch', 'chatbot_query'
  metadata JSONB, -- Additional event data
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat Messages Table (for chatbot history)
CREATE TABLE chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  repository_id BIGINT REFERENCES repositories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_repositories_github_id ON repositories(github_id);
CREATE INDEX idx_repositories_featured ON repositories(is_featured, display_order);
CREATE INDEX idx_ai_contents_repo_type ON ai_contents(repository_id, content_type);
CREATE INDEX idx_analytics_repo_event ON analytics(repository_id, event_type, created_at);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id, created_at);
```

---

## Core Features Implementation

### 1. GitHub API Integration

**Service: `app/services/github_sync_service.rb`**

```ruby
class GithubSyncService
  REPOS = [
    'AmosAlloyce/FinPulse',
    'AmosAlloyce/TechnicalOps_CaseStudy',
    'AmosAlloyce/bank_backend',
    'AmosAlloyce/go_microservices',
    'AmosAlloyce/java_and_python_microservices',
    'AmosAlloyce/crustdata-chatgpt-mcp',
    'AmosAlloyce/monte_carlo'
  ]
  
  def sync_all
    # Fetch repo data from GitHub API
    # Check for Docker files
    # Update database
    # Trigger AI content generation
  end
end
```

**Key Methods:**
- `fetch_repository_data(full_name)` - Get repo metadata
- `check_docker_files(full_name)` - Detect Dockerfile/docker-compose.yml
- `fetch_readme(full_name)` - Get README content for AI processing
- `update_repository(data)` - Upsert to database

**Rate Limiting:**
- GitHub API: 60 requests/hour (unauthenticated), 5000/hour (authenticated)
- Use personal access token
- Implement exponential backoff
- Cache responses for 1 hour

### 2. Groq AI Service

**Service: `app/services/groq_service.rb`**

```ruby
class GroqService
  MODEL = 'llama-3.1-70b-versatile'
  BASE_URL = 'https://api.groq.com/openai/v1'
  
  def generate_description(readme_content, repo_name)
    # Generate concise project description
  end
  
  def analyze_code(repo_data)
    # Technical analysis and summary
  end
  
  def chat_response(message, context)
    # Chatbot interaction
  end
end
```

**Prompts:**

1. **Description Generation:**
```
Given this README content for a project called {repo_name}:

{readme_content}

Generate a concise, engaging 2-3 sentence description that:
- Highlights the main purpose and key features
- Uses technical but accessible language
- Emphasizes practical applications
- Is suitable for a portfolio showcase

Description:
```

2. **Code Analysis:**
```
Analyze this repository data:
- Name: {name}
- Language: {language}
- Topics: {topics}
- README: {readme_excerpt}

Provide a technical summary covering:
1. Architecture/Design patterns used
2. Key technologies and frameworks
3. Notable features or innovations
4. Potential use cases

Keep it under 200 words.
```

3. **Chatbot System Prompt:**
```
You are an AI assistant for Amos Alloyce's portfolio website. You help visitors understand his projects.

Available projects:
{project_list_with_descriptions}

Guidelines:
- Be helpful and technical but approachable
- Reference specific projects when relevant
- Encourage visitors to try Docker demos
- Keep responses concise (under 150 words)
- If asked about deployment, mention Play-with-Docker integration
```

**Caching Strategy:**
- Cache AI-generated descriptions for 7 days
- Cache code analysis for 24 hours
- Don't cache chatbot responses (real-time)
- Store in `ai_contents` table with timestamps

### 3. Play-with-Docker Integration

**Implementation:**

```ruby
# app/helpers/docker_helper.rb
module DockerHelper
  PWD_BASE_URL = 'https://labs.play-with-docker.com'
  
  def pwd_launch_url(repository)
    return nil unless repository.has_docker
    
    # Generate PWD URL with docker-compose
    if repository.docker_compose_url
      "#{PWD_BASE_URL}/?stack=#{CGI.escape(repository.docker_compose_url)}"
    elsif repository.dockerfile_url
      # For single Dockerfile, create a simple stack
      "#{PWD_BASE_URL}/?stack=#{generate_simple_stack(repository)}"
    end
  end
  
  def generate_simple_stack(repository)
    # Create a minimal docker-compose.yml URL
    # that PWD can use to launch the container
  end
end
```

**Button Component:**
```erb
<!-- app/views/repositories/_docker_launch.html.erb -->
<% if repository.has_docker %>
  <a href="<%= pwd_launch_url(repository) %>" 
     target="_blank"
     class="btn-primary"
     data-controller="analytics"
     data-action="click->analytics#track"
     data-analytics-event-value="docker_launch"
     data-analytics-repo-value="<%= repository.id %>">
    <svg><!-- Docker icon --></svg>
    Launch in Play-with-Docker
  </a>
<% end %>
```

**Docker Detection Logic:**
```ruby
# app/services/docker_detector.rb
class DockerDetector
  def detect(github_client, full_name)
    has_compose = file_exists?(github_client, full_name, 'docker-compose.yml') ||
                  file_exists?(github_client, full_name, 'docker-compose.yaml')
    
    has_dockerfile = file_exists?(github_client, full_name, 'Dockerfile') ||
                     file_exists?(github_client, full_name, 'docker/Dockerfile')
    
    {
      has_docker: has_compose || has_dockerfile,
      docker_compose_url: compose_raw_url(full_name) if has_compose,
      dockerfile_url: dockerfile_raw_url(full_name) if has_dockerfile
    }
  end
end
```

### 4. Frontend UI Components

**Portfolio Dashboard (`app/views/repositories/index.html.erb`):**
- Grid layout (3 columns on desktop, 1 on mobile)
- Repository cards with:
  - Project name and language badge
  - AI-generated description
  - GitHub stats (stars, forks)
  - Docker launch button (if available)
  - "View Details" link
- Floating chatbot button (bottom-right)

**Project Detail Page (`app/views/repositories/show.html.erb`):**
- Hero section with project name and description
- Technical analysis section (AI-generated)
- Key features list
- Technology stack badges
- Docker launch prominent CTA
- README preview (first 500 words)
- Link to GitHub repository
- Related projects section

**AI Chatbot Interface:**
- Modal overlay or slide-in panel
- Chat history display
- Input field with send button
- Typing indicator during AI response
- Quick action buttons:
  - "Tell me about [project]"
  - "How do I run these projects?"
  - "What technologies are used?"

### 5. Background Jobs

**Sidekiq Jobs:**

```ruby
# app/jobs/sync_repositories_job.rb
class SyncRepositoriesJob < ApplicationJob
  queue_as :default
  
  def perform
    GithubSyncService.new.sync_all
  end
end

# app/jobs/generate_ai_content_job.rb
class GenerateAiContentJob < ApplicationJob
  queue_as :default
  
  def perform(repository_id)
    repository = Repository.find(repository_id)
    GroqService.new.generate_all_content(repository)
  end
end
```

**Scheduling (using whenever gem):**
```ruby
# config/schedule.rb
every 6.hours do
  runner "SyncRepositoriesJob.perform_later"
end
```

---

## Environment Variables

```bash
# .env.example
DATABASE_URL=postgresql://user:password@localhost/portfolio_production
REDIS_URL=redis://localhost:6379/0

# GitHub API
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_USERNAME=AmosAlloyce

# Groq API
GROQ_API_KEY=gsk_your_groq_api_key

# Rails
RAILS_ENV=production
SECRET_KEY_BASE=generate_with_rails_secret

# Optional: Analytics
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

---

## Deployment Strategy

### Render.com Setup

**1. Create New Web Service:**
- Connect GitHub repository
- Build Command: `bundle install && rails db:migrate`
- Start Command: `bundle exec puma -C config/puma.rb`
- Environment: Ruby 3.2+

**2. Add PostgreSQL Database:**
- Create new PostgreSQL instance (free tier)
- Auto-link to web service

**3. Add Redis Instance:**
- Create new Redis instance (free tier)
- For background jobs

**4. Environment Variables:**
- Add all variables from `.env.example`
- Use Render's secret management

**5. Custom Domain (Optional):**
- Add custom domain in Render dashboard
- Configure DNS records

### CI/CD Pipeline

**GitHub Actions (`.github/workflows/deploy.yml`):**
```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger Render Deploy
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## Performance Optimization

### Caching Strategy

1. **GitHub API Responses:**
   - Cache for 1 hour
   - Use Redis with key: `github:repo:{full_name}`

2. **AI-Generated Content:**
   - Store in database
   - Regenerate weekly or on-demand

3. **Page Caching:**
   - Cache portfolio dashboard for 5 minutes
   - Cache project detail pages for 15 minutes
   - Bust cache on repository sync

### Database Optimization

- Index frequently queried columns
- Use `includes` to avoid N+1 queries
- Implement pagination (25 items per page)
- Use database views for complex queries

### Asset Optimization

- Compress images (WebP format)
- Minify CSS/JS in production
- Use CDN for static assets (Cloudflare)
- Lazy load images below fold

---

## Security Considerations

1. **API Keys:**
   - Never commit to repository
   - Use environment variables
   - Rotate regularly

2. **Rate Limiting:**
   - Implement rack-attack gem
   - Limit chatbot requests: 10/minute per IP
   - Limit Docker launches: 5/minute per IP

3. **Input Validation:**
   - Sanitize all user inputs
   - Validate chatbot messages
   - Prevent XSS attacks

4. **CORS:**
   - Restrict to portfolio domain only
   - No wildcard origins

5. **Database:**
   - Use parameterized queries
   - Enable SSL for connections
   - Regular backups

---

## Testing Strategy

### Unit Tests (RSpec)
- GitHub API service
- Groq AI service
- Docker detector
- Helper methods

### Integration Tests
- Repository sync flow
- AI content generation
- Chatbot interactions

### System Tests (Capybara)
- Portfolio dashboard rendering
- Project detail page navigation
- Docker launch button functionality
- Chatbot UI interactions

### Performance Tests
- Load testing with 100 concurrent users
- API response time < 200ms
- Page load time < 2s

---

## Monitoring & Analytics

### Application Monitoring
- Use Render's built-in metrics
- Track response times
- Monitor error rates
- Database query performance

### Custom Analytics
- Track repository views
- Count Docker launches
- Monitor chatbot usage
- Popular projects dashboard

### Logging
- Use Rails logger
- Log levels: INFO, WARN, ERROR
- Structured logging (JSON format)
- Retain logs for 30 days

---

## Future Enhancements

1. **Phase 2 Features:**
   - User authentication for admin panel
   - Custom project ordering via drag-drop
   - Blog integration for technical articles
   - Email notifications for new stars/forks

2. **Advanced AI Features:**
   - Code review suggestions
   - Automated changelog generation
   - Project comparison tool
   - AI-powered search

3. **Enhanced Docker Integration:**
   - Custom Docker configurations per project
   - Pre-configured environment variables
   - One-click local setup scripts
   - Video tutorials for each project

4. **Community Features:**
   - Comments on projects
   - Upvoting system
   - Share to social media
   - Newsletter signup

---

## Project Timeline

**Week 1: Foundation**
- Set up Rails project
- Configure database and Redis
- Implement GitHub API integration
- Basic repository CRUD

**Week 2: AI Integration**
- Integrate Groq API
- Implement description generation
- Build code analysis feature
- Create chatbot backend

**Week 3: Frontend & Docker**
- Design and build UI components
- Implement Play-with-Docker integration
- Create responsive layouts
- Add analytics tracking

**Week 4: Polish & Deploy**
- Write tests
- Optimize performance
- Set up CI/CD
- Deploy to Render.com
- Documentation

---

## Success Metrics

- **Performance:** Page load < 2s, API response < 200ms
- **Availability:** 99.5% uptime
- **User Engagement:** Average 3+ projects viewed per session
- **Docker Launches:** 10+ launches per week
- **Chatbot Usage:** 50+ interactions per week
- **Cost:** $0/month (free tier only)

---

## Resources & Documentation

- [Rails Guides](https://guides.rubyonrails.org/)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Groq API Docs](https://console.groq.com/docs)
- [Play-with-Docker](https://labs.play-with-docker.com/)
- [Render.com Docs](https://render.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Contact & Support

**Developer:** Amos Alloyce  
**GitHub:** [@AmosAlloyce](https://github.com/AmosAlloyce)  
**Project Repository:** [To be created]

---

*This technical plan is a living document and will be updated as the project evolves.*
