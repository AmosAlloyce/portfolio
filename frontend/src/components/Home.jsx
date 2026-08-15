import React from 'react'
import { useNavigate } from 'react-router-dom'
import Type from './Type'
import { AiFillGithub } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Hi There!{" "}
                <span className="wave inline-block">👋🏻</span>
              </h1>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                I'M{" "}
                <strong className="purple">ALLOYCE AMOS</strong>
              </h1>

              <div className="text-3xl md:text-4xl font-bold purple">
                <Type />
              </div>
            </div>
          </div>

          {/* Right Side - Image/Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div 
                className="w-full max-w-md aspect-square rounded-full flex items-center justify-center text-9xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(199, 112, 240, 0.1), rgba(190, 80, 244, 0.1))',
                  border: '2px solid rgba(199, 112, 240, 0.3)',
                  boxShadow: '0 0 60px rgba(199, 112, 240, 0.3)'
                }}
              >
                🚀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left Side - About Text */}
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              LET ME <span className="purple">INTRODUCE</span> MYSELF
            </h1>
            
            <div className="text-lg text-gray-300 space-y-4">
              <p>
                I'm a Software Engineer who loves transforming ideas into
                reliable, scalable products. Over time, I've explored several
                technologies and found my passion in building high-performance
                systems and intuitive user experiences.
              </p>
              
              <p>
                I'm proficient in{" "}
                <span className="purple font-semibold">
                  JavaScript, Python, Ruby, Node.js, and React
                </span>
                {" "}— and I enjoy working across both backend and frontend stacks.
              </p>
              
              <p>
                My key areas of interest include developing{" "}
                <span className="purple font-semibold">
                  Web Applications, Cloud Solutions,
                </span>
                {" "}and exploring modern DevOps practices.
              </p>
              
              <p>
                Whenever possible, I love building projects with{" "}
                <span className="purple font-semibold">Node.js</span> and modern frameworks like{" "}
                <span className="purple font-semibold">React.js</span> and{" "}
                <span className="purple font-semibold">Rails</span>.
              </p>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="btn-primary mt-8"
            >
              View My Projects →
            </button>
          </div>

          {/* Right Side - Avatar */}
          <div className="flex justify-center">
            <div 
              className="w-64 h-64 rounded-full flex items-center justify-center text-8xl transform hover:scale-110 transition-transform duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(199, 112, 240, 0.2), rgba(190, 80, 244, 0.2))',
                border: '3px solid rgba(199, 112, 240, 0.4)',
                boxShadow: '0 0 40px rgba(199, 112, 240, 0.4)'
              }}
            >
              👨‍💻
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">FIND ME ON</h1>
          <p className="text-xl text-gray-300">
            Feel free to <span className="purple">connect</span> with me
          </p>
          
          <div className="flex justify-center gap-6 pt-4">
            <a
              href="https://github.com/AmosAlloyce"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(199, 112, 240, 0.3)'
              }}
            >
              <AiFillGithub />
            </a>
            
            <a
              href="https://linkedin.com/in/alloyce-amos"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(199, 112, 240, 0.3)'
              }}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
