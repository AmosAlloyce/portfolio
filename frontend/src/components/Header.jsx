import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-lg shadow-lg' 
          : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(27, 26, 46, 0.66)' : 'transparent',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity group"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #c770f0, #be50f4)',
                boxShadow: '0 4px 15px rgba(199, 112, 240, 0.4)'
              }}
            >
              <span className="wave">🚀</span>
            </div>
            <div>
              <h1 
                className="text-2xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #c770f0, #be50f4)'
                }}
              >
                Alloyce Amos
              </h1>
              <p className="text-sm text-gray-300">Software Engineer</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/')}
              className={`transition-colors relative group ${
                isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
              <span 
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                  isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                style={{ background: '#c770f0' }}
              ></span>
            </button>
            
            <button 
              onClick={() => navigate('/projects')}
              className={`transition-colors relative group ${
                isActive('/projects') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Projects
              <span 
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                  isActive('/projects') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                style={{ background: '#c770f0' }}
              ></span>
            </button>
            
            <a 
              href="https://github.com/AmosAlloyce" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary hover:scale-105 transition-transform"
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