import React from 'react'

const RepositoryCard = ({ repository, fullWidth = false }) => {
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

  if (fullWidth) {
    return (
      <div 
        className="repo-card rounded-2xl p-6 transform transition-all duration-500 group relative overflow-hidden"
        style={{
          background: 'transparent',
          boxShadow: '0 4px 5px 3px rgba(119, 53, 136, 0.459)'
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
          {/* Left Side - Project Info */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold mb-2 transition-colors break-words" style={{ color: 'white' }}>
                  {repository.name}
                </h3>
                {repository.language && (
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`}></span>
                    <span className="text-sm text-gray-300">{repository.language}</span>
                  </div>
                )}
              </div>
              {repository.has_docker && (
                <div className="tech-badge whitespace-nowrap flex-shrink-0">
                  🐳 Docker
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-4 line-clamp-2">
              {repository.description || 'No description available'}
            </p>

            {/* Stats */}
            <div className="flex items-center flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span style={{ color: '#c770f0' }}>⭐</span>
                <span className="text-gray-300">{repository.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span style={{ color: '#be50f4' }}>🍴</span>
                <span className="text-gray-300">{repository.forks_count}</span>
              </div>
              {repository.open_issues_count > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">📋</span>
                  <span className="text-gray-300">{repository.open_issues_count}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex md:flex-col gap-3 md:min-w-[200px]">
            <a
              href={`/repositories/${repository.id}`}
              className="flex-1 md:flex-none text-center btn-primary whitespace-nowrap"
            >
              View Details →
            </a>
            {repository.has_docker && repository.quick_start_url && (
              <a
                href={repository.quick_start_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none text-center btn-secondary whitespace-nowrap"
                title="Open in GitHub Codespaces"
              >
                🚀 Quick Start
              </a>
            )}
          </div>
        </div>

        {/* Hover Effect Gradient Border */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(199, 112, 240, 0.3), rgba(190, 80, 244, 0.3))',
            boxShadow: '0 4px 4px 5px rgba(129, 72, 144, 0.561)'
          }}
        ></div>
      </div>
    )
  }

  // Original card layout for grid view
  return (
    <div 
      className="repo-card rounded-2xl p-6 transform transition-all duration-500 group relative overflow-hidden"
      style={{
        background: 'transparent',
        boxShadow: '0 4px 5px 3px rgba(119, 53, 136, 0.459)'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3 relative z-10">
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold mb-2 transition-colors break-words" style={{ color: 'white' }}>
            {repository.name}
          </h3>
          {repository.language && (
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`}></span>
              <span className="text-sm text-gray-300">{repository.language}</span>
            </div>
          )}
        </div>
        {repository.has_docker && (
          <div className="tech-badge whitespace-nowrap flex-shrink-0">
            🐳 Docker
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6 line-clamp-3 min-h-[4.5rem] relative z-10">
        {repository.description || 'No description available'}
      </p>

      {/* Stats */}
      <div className="flex items-center space-x-6 mb-6 text-sm relative z-10">
        <div className="flex items-center space-x-2">
          <span style={{ color: '#c770f0' }}>⭐</span>
          <span className="text-gray-300">{repository.stargazers_count}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span style={{ color: '#be50f4' }}>🍴</span>
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
      <div className="flex gap-3 relative z-10">
        <a
          href={`/repositories/${repository.id}`}
          className="flex-1 text-center btn-primary"
        >
          View Details
        </a>
        {repository.has_docker && repository.quick_start_url && (
          <a
            href={repository.quick_start_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            title="Open in GitHub Codespaces"
          >
            🚀
          </a>
        )}
      </div>

      {/* Hover Effect Gradient Border */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(199, 112, 240, 0.3), rgba(190, 80, 244, 0.3))',
          boxShadow: '0 4px 4px 5px rgba(129, 72, 144, 0.561)'
        }}
      ></div>
    </div>
  )
}

export default RepositoryCard
