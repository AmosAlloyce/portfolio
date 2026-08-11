import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="border-b border-white/10 backdrop-blur-lg bg-white/5 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center font-bold text-xl">
              P
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Portfolio
              </h1>
              <p className="text-sm text-gray-400">Software Engineer</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Projects
            </button>
            <a 
              href="https://github.com/AmosAlloyce" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header