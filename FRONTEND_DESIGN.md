# Frontend UI Design - Detailed Specification

## Design Philosophy

**Visual Identity:**
- Modern, clean, and professional
- Dark mode with accent colors
- Focus on readability and usability
- Emphasize technical sophistication
- Mobile-first responsive design

**Color Palette:**
```
Primary Background: #0f172a (slate-900)
Secondary Background: #1e293b (slate-800)
Card Background: #334155 (slate-700)
Accent Primary: #3b82f6 (blue-500)
Accent Secondary: #8b5cf6 (violet-500)
Success: #10b981 (emerald-500)
Warning: #f59e0b (amber-500)
Text Primary: #f1f5f9 (slate-100)
Text Secondary: #cbd5e1 (slate-300)
Text Muted: #94a3b8 (slate-400)
Border: #475569 (slate-600)
```

**Typography:**
- Headings: Inter (font-bold, font-extrabold)
- Body: Inter (font-normal, font-medium)
- Code: JetBrains Mono (font-mono)

---

## Page Layouts

### 1. Portfolio Dashboard (Home Page)

**URL:** `/`

**Wireframe Description:**
```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                               │
│  [Logo] Amos Alloyce                    [GitHub] [LinkedIn] │
│  Full-Stack Developer & AI Enthusiast                       │
└─────────────────────────────────────────────────────────────┘
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              HERO SECTION                            │   │
│  │  Building Intelligent Systems                        │   │
│  │  [AI-Powered Portfolio] [7 Featured Projects]       │   │
│  │  [Chat with AI Assistant] ──────────────────────►   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              FILTER & SEARCH                         │   │
│  │  [All] [Python] [Go] [Java] [Docker]  🔍 Search...  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ PROJECT CARD │  │ PROJECT CARD │  │ PROJECT CARD │     │
│  │              │  │              │  │              │     │
│  │ [Image/Icon] │  │ [Image/Icon] │  │ [Image/Icon] │     │
│  │ Title        │  │ Title        │  │ Title        │     │
│  │ Description  │  │ Description  │  │ Description  │     │
│  │ [Python] ⭐3 │  │ [Go] ⭐12    │  │ [Java] ⭐5   │     │
│  │ [🐳 Launch]  │  │ [🐳 Launch]  │  │ [View More]  │     │
│  │ [Details →]  │  │ [Details →]  │  │ [Details →]  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ PROJECT CARD │  │ PROJECT CARD │  │ PROJECT CARD │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                               │
│  ┌──────────────┐                                           │
│  │ PROJECT CARD │                                           │
│  └──────────────┘                                           │
│                                                               │
│                    [💬 AI Assistant]  ◄─── Floating Button │
│                                                               │
└─────────────────────────────────────────────────────────────┘
│                         FOOTER                               │
│  © 2026 Amos Alloyce | Built with Rails & Groq AI          │
└─────────────────────────────────────────────────────────────┘
```

**Component Structure:**

```erb
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <%= render 'shared/head' %>
  </head>
  <body class="bg-slate-900 text-slate-100 min-h-screen">
    <%= render 'shared/header' %>
    
    <main class="container mx-auto px-4 py-8">
      <%= yield %>
    </main>
    
    <%= render 'shared/footer' %>
    <%= render 'shared/chatbot_button' %>
  </body>
</html>

<!-- app/views/repositories/index.html.erb -->
<div class="space-y-8">
  <%= render 'hero_section' %>
  <%= render 'filter_bar' %>
  <%= render 'repository_grid', repositories: @repositories %>
</div>
```

**Detailed Components:**

#### Header Component
```erb
<!-- app/views/shared/_header.html.erb -->
<header class="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
  <div class="container mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo & Name -->
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
          <span class="text-2xl font-bold text-white">AA</span>
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-100">Amos Alloyce</h1>
          <p class="text-sm text-slate-400">Full-Stack Developer & AI Enthusiast</p>
        </div>
      </div>
      
      <!-- Social Links -->
      <div class="flex items-center space-x-4">
        <a href="https://github.com/AmosAlloyce" 
           target="_blank"
           class="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <!-- GitHub icon SVG path -->
          </svg>
          <span class="hidden md:inline">GitHub</span>
        </a>
        
        <a href="#" 
           class="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <!-- LinkedIn icon SVG path -->
          </svg>
          <span class="hidden md:inline">LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</header>
```

**Tailwind Classes Breakdown:**
- `sticky top-0 z-50` - Keeps header visible on scroll
- `backdrop-blur-sm bg-opacity-95` - Glassmorphism effect
- `container mx-auto px-4` - Responsive container
- `flex items-center justify-between` - Flexbox layout
- `space-x-4` - Horizontal spacing between elements
- `hover:bg-slate-600 transition-colors` - Smooth hover effects

#### Hero Section
```erb
<!-- app/views/repositories/_hero_section.html.erb -->
<section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700 p-8 md:p-12">
  <!-- Animated background gradient -->
  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10 animate-gradient"></div>
  
  <div class="relative z-10 max-w-3xl">
    <h2 class="text-4xl md:text-5xl font-extrabold text-slate-100 mb-4">
      Building Intelligent Systems
    </h2>
    
    <p class="text-xl text-slate-300 mb-6">
      Explore my portfolio of AI-powered applications, microservices, and full-stack projects.
      Each project is containerized and ready to launch with a single click.
    </p>
    
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
        <svg class="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
          <!-- AI icon -->
        </svg>
        <span class="text-slate-200">AI-Powered Portfolio</span>
      </div>
      
      <div class="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
        <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <!-- Projects icon -->
        </svg>
        <span class="text-slate-200">7 Featured Projects</span>
      </div>
      
      <button 
        data-controller="chatbot"
        data-action="click->chatbot#open"
        class="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-lg transition-all transform hover:scale-105">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <!-- Chat icon -->
        </svg>
        <span class="font-medium">Chat with AI Assistant</span>
      </button>
    </div>
  </div>
  
  <!-- Decorative elements -->
  <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl"></div>
</section>
```

**Animation CSS:**
```css
/* app/assets/stylesheets/animations.css */
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}
```

#### Filter Bar
```erb
<!-- app/views/repositories/_filter_bar.html.erb -->
<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700">
  <!-- Language Filters -->
  <div class="flex flex-wrap gap-2" data-controller="filter">
    <button 
      data-filter-target="button"
      data-action="click->filter#toggle"
      data-language="all"
      class="filter-btn active px-4 py-2 rounded-lg font-medium transition-all">
      All Projects
    </button>
    
    <button 
      data-filter-target="button"
      data-action="click->filter#toggle"
      data-language="python"
      class="filter-btn px-4 py-2 rounded-lg font-medium transition-all">
      <span class="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
      Python
    </button>
    
    <button 
      data-filter-target="button"
      data-action="click->filter#toggle"
      data-language="go"
      class="filter-btn px-4 py-2 rounded-lg font-medium transition-all">
      <span class="inline-block w-3 h-3 bg-cyan-400 rounded-full mr-2"></span>
      Go
    </button>
    
    <button 
      data-filter-target="button"
      data-action="click->filter#toggle"
      data-language="java"
      class="filter-btn px-4 py-2 rounded-lg font-medium transition-all">
      <span class="inline-block w-3 h-3 bg-red-400 rounded-full mr-2"></span>
      Java
    </button>
    
    <button 
      data-filter-target="button"
      data-action="click->filter#toggle"
      data-docker="true"
      class="filter-btn px-4 py-2 rounded-lg font-medium transition-all">
      <svg class="inline-block w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <!-- Docker icon -->
      </svg>
      Docker Ready
    </button>
  </div>
  
  <!-- Search Bar -->
  <div class="relative w-full md:w-64">
    <input 
      type="text"
      placeholder="Search projects..."
      data-filter-target="search"
      data-action="input->filter#search"
      class="w-full px-4 py-2 pl-10 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <!-- Search icon -->
    </svg>
  </div>
</div>
```

**Filter Button States CSS:**
```css
/* app/assets/stylesheets/components.css */
.filter-btn {
  @apply bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-100;
}

.filter-btn.active {
  @apply bg-gradient-to-r from-blue-600 to-violet-600 text-white;
}
```

#### Repository Card
```erb
<!-- app/views/repositories/_repository_card.html.erb -->
<div class="repository-card group relative bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
     data-language="<%= repository.language&.downcase %>"
     data-has-docker="<%= repository.has_docker %>">
  
  <!-- Card Header with Icon/Image -->
  <div class="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
    <!-- Language-specific gradient overlay -->
    <div class="absolute inset-0 <%= language_gradient(repository.language) %> opacity-20"></div>
    
    <!-- Project Icon/Logo -->
    <div class="relative z-10">
      <%= render 'shared/language_icon', language: repository.language, size: 'large' %>
    </div>
    
    <!-- Docker Badge (if available) -->
    <% if repository.has_docker %>
      <div class="absolute top-4 right-4 px-3 py-1 bg-blue-600 rounded-full text-xs font-medium flex items-center space-x-1">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <!-- Docker icon -->
        </svg>
        <span>Docker</span>
      </div>
    <% end %>
    
    <!-- GitHub Stats Badge -->
    <div class="absolute bottom-4 left-4 flex items-center space-x-3">
      <div class="flex items-center space-x-1 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs">
        <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <!-- Star icon -->
        </svg>
        <span><%= repository.stargazers_count %></span>
      </div>
      
      <div class="flex items-center space-x-1 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs">
        <svg class="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
          <!-- Fork icon -->
        </svg>
        <span><%= repository.forks_count %></span>
      </div>
    </div>
  </div>
  
  <!-- Card Body -->
  <div class="p-6 space-y-4">
    <!-- Title & Language Badge -->
    <div class="flex items-start justify-between">
      <h3 class="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
        <%= repository.name.titleize %>
      </h3>
      
      <%= render 'shared/language_badge', language: repository.language %>
    </div>
    
    <!-- AI-Generated Description -->
    <p class="text-slate-300 text-sm line-clamp-3">
      <%= repository.ai_description || repository.description || "No description available" %>
    </p>
    
    <!-- Topics/Tags -->
    <% if repository.topics.present? %>
      <div class="flex flex-wrap gap-2">
        <% repository.topics.first(3).each do |topic| %>
          <span class="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md">
            #<%= topic %>
          </span>
        <% end %>
        <% if repository.topics.length > 3 %>
          <span class="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded-md">
            +<%= repository.topics.length - 3 %> more
          </span>
        <% end %>
      </div>
    <% end %>
    
    <!-- Action Buttons -->
    <div class="flex items-center gap-3 pt-4 border-t border-slate-700">
      <% if repository.has_docker %>
        <%= link_to pwd_launch_url(repository),
            target: '_blank',
            data: { 
              controller: 'analytics',
              action: 'click->analytics#track',
              analytics_event_value: 'docker_launch',
              analytics_repo_value: repository.id
            },
            class: 'flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-medium transition-all transform hover:scale-105' do %>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <!-- Docker icon -->
          </svg>
          <span>Launch</span>
        <% end %>
      <% end %>
      
      <%= link_to repository_path(repository),
          class: 'flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors' do %>
        <span>View Details</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <!-- Arrow right icon -->
        </svg>
      <% end %>
    </div>
  </div>
  
  <!-- Hover Effect Overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
</div>
```

**Helper Methods:**
```ruby
# app/helpers/repositories_helper.rb
module RepositoriesHelper
  def language_gradient(language)
    case language&.downcase
    when 'python'
      'bg-gradient-to-br from-blue-500 to-yellow-500'
    when 'go'
      'bg-gradient-to-br from-cyan-500 to-blue-500'
    when 'java'
      'bg-gradient-to-br from-red-500 to-orange-500'
    when 'javascript', 'typescript'
      'bg-gradient-to-br from-yellow-500 to-yellow-600'
    when 'ruby'
      'bg-gradient-to-br from-red-600 to-red-700'
    else
      'bg-gradient-to-br from-slate-600 to-slate-700'
    end
  end
  
  def language_color(language)
    case language&.downcase
    when 'python' then 'bg-blue-500'
    when 'go' then 'bg-cyan-500'
    when 'java' then 'bg-red-500'
    when 'javascript', 'typescript' then 'bg-yellow-500'
    when 'ruby' then 'bg-red-600'
    else 'bg-slate-500'
    end
  end
end
```

#### Repository Grid
```erb
<!-- app/views/repositories/_repository_grid.html.erb -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
     data-controller="filter"
     data-filter-target="grid">
  <% repositories.each do |repository| %>
    <%= render 'repository_card', repository: repository %>
  <% end %>
</div>

<!-- Empty State -->
<div class="hidden" data-filter-target="empty">
  <div class="text-center py-16">
    <svg class="w-24 h-24 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <!-- Empty box icon -->
    </svg>
    <h3 class="text-xl font-bold text-slate-300 mb-2">No projects found</h3>
    <p class="text-slate-400">Try adjusting your filters or search query</p>
  </div>
</div>
```

---

### 2. Project Detail Page

**URL:** `/repositories/:id`

**Wireframe Description:**
```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                               │
└─────────────────────────────────────────────────────────────┘
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PROJECT HERO                            │   │
│  │  [Large Icon/Logo]                                   │   │
│  │  Project Name                                        │   │
│  │  AI-Generated Description                            │   │
│  │  [Python] ⭐ 12  🍴 3  Updated: 2 days ago          │   │
│  │  [🐳 Launch in Docker] [View on GitHub]             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌────────────────────┐  ┌────────────────────────────┐    │
│  │ QUICK STATS        │  │ TECHNICAL ANALYSIS         │    │
│  │ • Language: Python │  │ AI-generated technical     │    │
│  │ • Docker: Yes      │  │ summary covering:          │    │
│  │ • License: MIT     │  │ - Architecture patterns    │    │
│  │ • Size: 2.3 MB     │  │ - Key technologies         │    │
│  └────────────────────┘  │ - Notable features         │    │
│                           │ - Use cases                │    │
│  ┌────────────────────┐  └────────────────────────────┘    │
│  │ KEY FEATURES       │                                     │
│  │ • Feature 1        │  ┌────────────────────────────┐    │
│  │ • Feature 2        │  │ TECHNOLOGY STACK           │    │
│  │ • Feature 3        │  │ [FastAPI] [PostgreSQL]     │    │
│  │ • Feature 4        │  │ [Redis] [Docker]           │    │
│  └────────────────────┘  └────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              README PREVIEW                          │   │
│  │  First 500 words of README with syntax highlighting │   │
│  │  [Read Full README on GitHub →]                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              RELATED PROJECTS                        │   │
│  │  [Card 1]  [Card 2]  [Card 3]                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Component Structure:**

```erb
<!-- app/views/repositories/show.html.erb -->
<div class="space-y-8">
  <%= render 'project_hero', repository: @repository %>
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 space-y-8">
      <%= render 'technical_analysis', repository: @repository %>
      <%= render 'readme_preview', repository: @repository %>
    </div>
    
    <div class="space-y-8">
      <%= render 'quick_stats', repository: @repository %>
      <%= render 'key_features', repository: @repository %>
      <%= render 'tech_stack', repository: @repository %>
    </div>
  </div>
  
  <%= render 'related_projects', repositories: @related_repositories %>
</div>
```

#### Project Hero
```erb
<!-- app/views/repositories/_project_hero.html.erb -->
<section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700 p-8 md:p-12">
  <div class="relative z-10">
    <!-- Back Button -->
    <%= link_to repositories_path, 
        class: 'inline-flex items-center space-x-2 text-slate-400 hover:text-slate-200 mb-6 transition-colors' do %>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <!-- Arrow left icon -->
      </svg>
      <span>Back to Portfolio</span>
    <% end %>
    
    <!-- Project Icon & Title -->
    <div class="flex items-start space-x-6 mb-6">
      <div class="flex-shrink-0 w-24 h-24 <%= language_gradient(repository.language) %> rounded-2xl flex items-center justify-center">
        <%= render 'shared/language_icon', language: repository.language, size: 'xlarge' %>
      </div>
      
      <div class="flex-1">
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-100 mb-3">
          <%= repository.name.titleize %>
        </h1>
        
        <p class="text-xl text-slate-300 mb-4">
          <%= repository.ai_description || repository.description %>
        </p>
        
        <!-- Metadata -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <%= render 'shared/language_badge', language: repository.language %>
          
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <!-- Star icon -->
            </svg>
            <span><%= repository.stargazers_count %> stars</span>
          </div>
          
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <!-- Fork icon -->
            </svg>
            <span><%= repository.forks_count %> forks</span>
          </div>
          
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <!-- Clock icon -->
            </svg>
            <span>Updated <%= time_ago_in_words(repository.updated_at) %> ago</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4">
      <% if repository.has_docker %>
        <%= link_to pwd_launch_url(repository),
            target: '_blank',
            data: { 
              controller: 'analytics',
              action: 'click->analytics#track',
              analytics_event_value: 'docker_launch',
              analytics_repo_value: repository.id
            },
            class: 'flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-lg font-medium text-lg transition-all transform hover:scale-105' do %>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <!-- Docker icon -->
          </svg>
          <span>Launch in Play-with-Docker</span>
        <% end %>
      <% end %>
      
      <%= link_to repository.html_url,
          target: '_blank',
          class: 'flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium text-lg transition-colors' do %>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <!-- GitHub icon -->
        </svg>
        <span>View on GitHub</span>
      <% end %>
      
      <% if repository.homepage.present? %>
        <%= link_to repository.homepage,
            target: '_blank',
            class: 'flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium text-lg transition-colors' do %>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <!-- External link icon -->
          </svg>
          <span>Live Demo</span>
        <% end %>
      <% end %>
    </div>
  </div>
  
  <!-- Decorative elements -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
</section>
```

---

### 3. AI Chatbot Interface

**Wireframe Description:**
```
┌─────────────────────────────────────┐
│  AI Assistant              [X]      │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Bot: Hi! I'm here to help   │   │
│  │ you explore Amos's projects │   │
│  └─────────────────────────────┘   │
│                                     │
│           ┌─────────────────────┐  │
│           │ User: Tell me about │  │
│           │ the monte_carlo     │  │
│           │ project             │  │
│           └─────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Bot: The monte_carlo is an  │   │
│  │ AI-powered insurance...     │   │
│  │ [View Project →]            │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Typing...]                        │
│                                     │
├─────────────────────────────────────┤
│  Quick Actions:                     │
│  [Tell me about projects]           │
│  [How do I run them?]               │
│  [What technologies?]               │
├─────────────────────────────────────┤
│  [Type your message...]      [Send] │
└─────────────────────────────────────┘
```

**Component Structure:**

```erb
<!-- app/views/shared/_chatbot_button.html.erb -->
<button 
  data-controller="chatbot"
  data-action="click->chatbot#toggle"
  class="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center z-40">
  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <!-- Chat bubble icon -->
  </svg>
  
  <!-- Notification Badge (if new message) -->
  <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center text-white hidden"
        data-chatbot-target="badge">
    1
  </span>
</button>

<!-- app/views/shared/_chatbot_modal.html.erb -->
<div 
  data-controller="chatbot"
  data-chatbot-target="modal"
  class="fixed bottom-24 right-6 w-96 h-[600px] bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 hidden z-50 flex flex-col overflow-hidden">
  
  <!-- Header -->
  <div class="flex items-center justify-between p-4 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-violet-600">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <!-- AI robot icon -->
        </svg>
      </div>
      <div>
        <h3 class="font-bold text-white">AI Assistant</h3>
        <p class="text-xs text-blue-100">Powered by Groq</p>
      </div>
    </div>
    
    <button 
      data-action="click->chatbot#close"
      class="text-white hover:text-slate-200 transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <!-- X icon -->
      </svg>
    </button>
  </div>
  
  <!-- Messages Container -->
  <div 
    data-chatbot-target="messages"
    class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
    
    <!-- Welcome Message -->
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <!-- AI icon -->
        </svg>
      </div>
      <div class="flex-1 bg-slate-800 rounded-lg rounded-tl-none p-3">
        <p class="text-sm text-slate-200">
          Hi! I'm here to help you explore Amos's projects. Ask me anything about his work, technologies used, or how to run the projects!
        </p>
      </div>
    </div>
    
    <!-- Messages will be dynamically added here -->
  </div>
  
  <!-- Quick Actions -->
  <div class="p-3 border-t border-slate-700 bg-slate-800">
    <p class="text-xs text-slate-400 mb-2">Quick Actions:</p>
    <div class="flex flex-wrap gap-2">
      <button 
        data-action="click->chatbot#sendQuickMessage"
        data-message="Tell me about the featured projects"
        class="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full text-xs text-slate-200 transition-colors">
        Tell me about projects
      </button>
      <button 
        data-action="click->chatbot#sendQuickMessage"
        data-message="How do I run these projects?"
        class="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full text-xs text-slate-200 transition-colors">
        How to run?
      </button>
      <button 
        data-action="click->chatbot#sendQuickMessage"
        data-message="What technologies are used?"
        class="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full text-xs text-slate-200 transition-colors">
        Technologies?
      </button>
    </div>
  </div>
  
  <!-- Input Area -->
  <div class="p-4 border-t border-slate-700 bg-slate-800">
    <form data-action="submit->chatbot#send" class="flex items-center space-x-2">
      <input 
        type="text"
        data-chatbot-target="input"
        placeholder="Type your message..."
        class="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
      
      <button 
        type="submit"
        class="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-lg transition-all transform hover:scale-105">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <!-- Send icon -->
        </svg>
      </button>
    </form>
  </div>
  
  <!-- Typing Indicator -->
  <div 
    data-chatbot-target="typing"
    class="hidden p-4 border-t border-slate-700 bg-slate-800">
    <div class="flex items-center space-x-2 text-slate-400 text-sm">
      <div class="flex space-x-1">
        <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
      <span>AI is thinking...</span>
    </div>
  </div>
</div>
```

**Stimulus Controller:**
```javascript
// app/javascript/controllers/chatbot_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "messages", "input", "typing", "badge"]
  
  connect() {
    this.sessionId = this.generateSessionId()
  }
  
  toggle() {
    this.modalTarget.classList.toggle('hidden')
    if (!this.modalTarget.classList.contains('hidden')) {
      this.inputTarget.focus()
      this.hideBadge()
    }
  }
  
  open() {
    this.modalTarget.classList.remove('hidden')
    this.inputTarget.focus()
    this.hideBadge()
  }
  
  close() {
    this.modalTarget.classList.add('hidden')
  }
  
  async send(event) {
    event.preventDefault()
    
    const message = this.inputTarget.value.trim()
    if (!message) return
    
    // Add user message to chat
    this.addMessage('user', message)
    this.inputTarget.value = ''
    
    // Show typing indicator
    this.showTyping()
    
    try {
      // Send to backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
        },
        body: JSON.stringify({
          message: message,
          session_id: this.sessionId
        })
      })
      
      const data = await response.json()
      
      // Hide typing indicator
      this.hideTyping()
      
      // Add AI response
      this.addMessage('assistant', data.response, data.repository_id)
      
    } catch (error) {
      this.hideTyping()
      this.addMessage('assistant', 'Sorry, I encountered an error. Please try again.')
    }
  }
  
  sendQuickMessage(event) {
    const message = event.currentTarget.dataset.message
    this.inputTarget.value = message
    this.send(new Event('submit'))
  }
  
  addMessage(role, content, repositoryId = null) {
    const messageDiv = document.createElement('div')
    messageDiv.className = 'flex items-start space-x-3'
    
    if (role === 'user') {
      messageDiv.classList.add('flex-row-reverse', 'space-x-reverse')
      messageDiv.innerHTML = `
        <div class="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
            <!-- User icon -->
          </svg>
        </div>
        <div class="flex-1 bg-blue-600 rounded-lg rounded-tr-none p-3">
          <p class="text-sm text-white">${this.escapeHtml(content)}</p>
        </div>
      `
    } else {
      messageDiv.innerHTML = `
        <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <!-- AI icon -->
          </svg>
        </div>
        <div class="flex-1 bg-slate-800 rounded-lg rounded-tl-none p-3">
          <p class="text-sm text-slate-200">${this.escapeHtml(content)}</p>
          ${repositoryId ? `
            <a href="/repositories/${repositoryId}" 
               class="inline-flex items-center space-x-1 mt-2 text-xs text-blue-400 hover:text-blue-300">
              <span>View Project</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Arrow right icon -->
              </svg>
            </a>
          ` : ''}
        </div>
      `
    }
    
    this.messagesTarget.appendChild(messageDiv)
    this.scrollToBottom()
  }
  
  showTyping() {
    this.typingTarget.classList.remove('hidden')
    this.scrollToBottom()
  }
  
  hideTyping() {
    this.typingTarget.classList.add('hidden')
  }
  
  scrollToBottom() {
    this.mes