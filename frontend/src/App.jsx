import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import RepositoryCard from './components/RepositoryCard'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'
import ChatWidget from './components/ChatWidget'

function HomePage() {
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
      <div className="min-h-screen flex items-center justify-center">
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
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-float">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of production-grade applications showcasing modern architecture, 
            cloud-native technologies, and best practices in software engineering.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="card-gradient p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-primary-400 mb-2">{repositories.length}</div>
            <div className="text-gray-300">Projects</div>
          </div>
          <div className="card-gradient p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-accent-400 mb-2">
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
    </>
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="card-gradient p-8 rounded-2xl max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary mt-6"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <button 
        onClick={() => navigate('/')}
        className="btn-secondary mb-8"
      >
        ← Back to Projects
      </button>

      <div className="card-gradient p-8 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 text-primary-400">{repository.name}</h1>
        
        {repository.description && (
          <p className="text-xl text-gray-300 mb-6">{repository.description}</p>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          {repository.language && (
            <span className="px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full">
              {repository.language}
            </span>
          )}
          <span className="px-4 py-2 bg-accent-500/20 text-accent-300 rounded-full">
            ⭐ {repository.stargazers_count} stars
          </span>
          {repository.has_docker && (
            <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full">
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

        <div className="mt-8 flex gap-4">
          <a 
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on GitHub →
          </a>
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
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repositories/:id" element={<RepositoryDetail />} />
      </Routes>
      <ChatWidget />
    </div>
  )
}

export default App