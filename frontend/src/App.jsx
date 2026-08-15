import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import RepositoryCard from './components/RepositoryCard'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'
import ChatWidget from './components/ChatWidget'
import Particle from './components/Particle'
import Home from './components/Home'

function ProjectsPage() {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRepositories()
  }, [])

  const fetchRepositories = async () => {
    try {
      const response = await fetch('/api/repositories')
      if (!response.ok) throw new Error('Failed to fetch repositories')
      const data = await response.json()
      setRepositories(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="card-gradient p-8 rounded-2xl max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={fetchRepositories}
            className="btn-primary mt-6"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="purple">Featured Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of production-grade applications showcasing modern architecture, 
            cloud-native technologies, and best practices in software engineering.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="card-gradient p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold purple mb-2">{repositories.length}</div>
            <div className="text-gray-300">Projects</div>
          </div>
          <div className="card-gradient p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold purple mb-2">
              {repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
            </div>
            <div className="text-gray-300">Total Stars</div>
          </div>
          <div className="card-gradient p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {repositories.filter(repo => repo.has_docker).length}
            </div>
            <div className="text-gray-300">Docker Ready</div>
          </div>
        </div>

        {/* Repository List */}
        <div className="space-y-6">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} fullWidth={true} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p>Built with React, Rails, and modern web technologies</p>
          <p className="mt-2">© 2026 Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function RepositoryDetail() {
  const navigate = useNavigate()
  const [repository, setRepository] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get repository ID from URL path
  const repoId = window.location.pathname.split('/').pop()

  useEffect(() => {
    fetchRepository()
  }, [repoId])

  const fetchRepository = async () => {
    try {
      const response = await fetch(`/api/repositories/${repoId}`)
      if (!response.ok) throw new Error('Repository not found')
      const data = await response.json()
      setRepository(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="card-gradient p-8 rounded-2xl max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={() => navigate('/projects')}
            className="btn-primary mt-6"
          >
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-32">
      <button 
        onClick={() => navigate('/projects')}
        className="btn-secondary mb-8"
      >
        ← Back to Projects
      </button>

      <div className="card-gradient p-8 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 purple">{repository.name}</h1>
        
        {repository.description && (
          <p className="text-xl text-gray-300 mb-6">{repository.description}</p>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          {repository.language && (
            <span className="tech-badge">
              {repository.language}
            </span>
          )}
          <span className="tech-badge">
            ⭐ {repository.stargazers_count} stars
          </span>
          {repository.has_docker && (
            <span className="tech-badge">
              🐳 Docker Ready
            </span>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">README</h2>
          <div className="bg-dark-800 p-6 rounded-lg overflow-auto max-h-96">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
              {repository.readme_content || 'No README available'}
            </pre>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a 
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on GitHub →
          </a>
          {repository.has_docker && repository.quick_start_url && (
            <a 
              href={repository.quick_start_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              🚀 Launch in Codespaces
            </a>
          )}
          {repository.docker_compose_url && (
            <a 
              href={repository.docker_compose_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Docker Compose
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <Particle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/repositories/:id" element={<RepositoryDetail />} />
      </Routes>
      <ChatWidget />
    </div>
  )
}

export default App
