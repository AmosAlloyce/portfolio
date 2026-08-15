import { useState, useRef, useEffect } from 'react'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => crypto.randomUUID())
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || data.error || 'Sorry, I encountered an error.'
      }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen && messages.length === 0) {
      // Add welcome message on first open
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm here to help you explore Amos's portfolio. Ask me about any project, technologies used, or how to try out the demos!"
      }])
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-96 h-[600px] backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up"
          style={{
            background: 'rgba(27, 26, 46, 0.95)',
            border: '1px solid rgba(199, 112, 240, 0.3)',
            boxShadow: '0 8px 32px rgba(119, 53, 136, 0.4)'
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4"
            style={{ borderBottom: '1px solid rgba(199, 112, 240, 0.2)' }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #c770f0, #be50f4)',
                  boxShadow: '0 4px 15px rgba(199, 112, 240, 0.4)'
                }}
              >
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Portfolio Assistant</h3>
                <p className="text-xs" style={{ color: '#c770f0' }}>Powered by Groq AI</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'text-white'
                      : 'text-gray-100'
                  }`}
                  style={
                    message.role === 'user'
                      ? {
                          background: 'linear-gradient(135deg, #c770f0, #be50f4)',
                          boxShadow: '0 4px 15px rgba(199, 112, 240, 0.3)'
                        }
                      : {
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(199, 112, 240, 0.2)'
                        }
                  }
                >
                  <p className="text-sm whitespace-pre-wrap break-words text-inherit">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div 
                  className="rounded-2xl px-4 py-3"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(199, 112, 240, 0.2)'
                  }}
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c770f0', animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c770f0', animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c770f0', animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form 
            onSubmit={handleSendMessage} 
            className="p-4"
            style={{ borderTop: '1px solid rgba(199, 112, 240, 0.2)' }}
          >
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about projects..."
                disabled={isLoading}
                className="flex-1 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none disabled:opacity-50 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(199, 112, 240, 0.3)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(199, 112, 240, 0.5)'}
                onBlur={(e) => e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="rounded-xl px-6 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #c770f0, #be50f4)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(199, 112, 240, 0.4)'
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full hover:scale-110 transition-transform flex items-center justify-center z-50 group"
        aria-label="Open chat"
        style={{
          background: 'linear-gradient(135deg, #c770f0, #be50f4)',
          boxShadow: '0 8px 32px rgba(119, 53, 136, 0.6)'
        }}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {messages.length === 0 && (
              <span 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                style={{ background: '#be50f4' }}
              ></span>
            )}
          </>
        )}
      </button>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .fixed.bottom-24 {
            bottom: 5rem;
            right: 0.5rem;
            left: 0.5rem;
            width: calc(100% - 1rem);
            height: calc(100vh - 10rem);
          }
        }
      `}</style>
    </>
  )
}

export default ChatWidget