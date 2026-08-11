import { useState, useEffect } from 'react'
import RepositoryCard from './components/RepositoryCard'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
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
    <div className="min-h-screen">
      <Header />
      
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

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
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

export default App
