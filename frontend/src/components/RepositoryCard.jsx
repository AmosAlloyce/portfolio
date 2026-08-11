import React from 'react'

const RepositoryCard = ({ repository }) => {
  const languageColors = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-400',
    Python: 'bg-green-400',
    Go: 'bg-cyan-400',
    Ruby: 'bg-red-400',
    Java: 'bg-orange-400',
    default: 'bg-gray-400'
  }

  const getLanguageColor = (lang) => languageColors[lang] || languageColors.default

  return (
    <div className="card-gradient rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors break-words">
            {repository.name}
          </h3>
          {repository.language && (
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`}></span>
              <span className="text-sm text-gray-400">{repository.language}</span>
            </div>
          )}
        </div>
        {repository.has_docker && (
          <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30 whitespace-nowrap flex-shrink-0">
            🐳 Docker
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6 line-clamp-3 min-h-[4.5rem]">
        {repository.description || 'No description available'}
      </p>

      {/* Stats */}
      <div className="flex items-center space-x-6 mb-6 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-gray-300">{repository.stargazers_count}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-blue-400">🍴</span>
          <span className="text-gray-300">{repository.forks_count}</span>
        </div>
        {repository.open_issues_count > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-green-400">📋</span>
            <span className="text-gray-300">{repository.open_issues_count}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <a
          href={`/repositories/${repository.id}`}
          className="flex-1 text-center bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          View Details
        </a>
        {repository.has_docker && repository.pwd_launch_url && (
          <a
            href={repository.pwd_launch_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            title="Launch with Docker"
          >
            🚀
          </a>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

export default RepositoryCard
