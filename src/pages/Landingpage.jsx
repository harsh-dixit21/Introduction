import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

const LandingPage = ({ onEnter }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 20)
      mouseY.set(e.clientY - 20)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const glowX = useTransform(mouseX, [0, window.innerWidth], [-50, 50])
  const glowY = useTransform(mouseY, [0, window.innerHeight], [-50, 50])

  const variants = {
    default: { height: 40, width: 40 },
    button: { height: 80, width: 80, backgroundColor: "rgba(168, 85, 247, 0.3)" }
  }

  // Memoize particles to prevent recreating on each render
  const geometricShapes = useMemo(() => [...Array(8)], []) // Reduced from 15 to 8
  const energyParticles = useMemo(() => [...Array(15)], []) // Reduced from 30 to 15

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black cursor-none">
      {/* Custom cursor - GPU accelerated */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ x: cursorX, y: cursorY, willChange: 'transform' }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      />

      {/* Trailing cursor - simplified */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-40"
        style={{ 
          x: useTransform(cursorX, (x) => x + 15),
          y: useTransform(cursorY, (y) => y + 15),
          willChange: 'transform'
        }}
      />

      {/* Liquid morphing background - simplified and GPU accelerated */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
          </filter>
        </defs>
        <g filter="url(#goo)">
          <motion.circle
            cx="30%"
            cy="30%"
            r="150"
            fill="#a855f7"
            animate={{
              r: [150, 170, 150]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="70%"
            cy="70%"
            r="120"
            fill="#3b82f6"
            animate={{
              r: [120, 140, 120]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>

      {/* Dynamic gradient - using CSS variable for better performance */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2), transparent 80%)`
        }}
      />

      {/* 3D Grid - static to reduce repaints */}
      <div className="absolute inset-0 [transform:perspective(1000px)_rotateX(60deg)] origin-bottom pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(147,51,234,0.1)_2px,transparent_2px)] bg-[size:60px_60px]" />
      </div>

      {/* Reduced geometric shapes - GPU accelerated with transform only */}
      {geometricShapes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute will-change-transform"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {i % 3 === 0 ? (
            <div className="w-5 h-5 border-2 border-purple-500/50" />
          ) : i % 3 === 1 ? (
            <div className="w-5 h-5 border-2 border-blue-500/50 rotate-45" />
          ) : (
            <div className="w-6 h-1 bg-pink-500/50" />
          )}
        </motion.div>
      ))}

      {/* Parallax orbs - simplified with transform only */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] pointer-events-none will-change-transform"
        style={{ 
          x: useTransform(glowX, (x) => x * 0.3),
          y: useTransform(glowY, (y) => y * 0.3)
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[90px] pointer-events-none will-change-transform"
        style={{ 
          x: useTransform(glowX, (x) => -x * 0.2),
          y: useTransform(glowY, (y) => -y * 0.2)
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Reduced particles - GPU accelerated */}
      {energyParticles.map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full will-change-transform"
          style={{
            width: 2,
            height: 2,
            left: `${5 + i * 6}%`,
            top: `${80 - (i % 5) * 15}%`,
            background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#3b82f6' : '#ec4899',
          }}
          animate={{
            y: [-100, -300],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Title with simplified glitch */}
        <div className="relative mb-8">
          <motion.h1
            className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ 
              textShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
            }}
          >
            Are You Ready
          </motion.h1>
          
          {/* Simplified glitch - only triggers occasionally */}
          <motion.h1
            className="text-7xl md:text-9xl font-bold text-purple-500/40 absolute top-0 left-0 right-0 blur-sm pointer-events-none"
            animate={{
              x: [-2, 2, -2],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 10
            }}
          >
            Are You Ready
          </motion.h1>
        </div>
        
        <motion.h2
          className="text-6xl md:text-8xl font-bold mb-20 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}
        >
          To Meet The Squad?
        </motion.h2>

        {/* Optimized button */}
        <motion.div
          className="relative inline-block"
          onHoverStart={() => setCursorVariant("button")}
          onHoverEnd={() => setCursorVariant("default")}
        >
          <motion.button
            onClick={onEnter}
            className="relative px-16 py-6 text-3xl font-bold text-white overflow-visible group will-change-transform"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Simplified backgrounds */}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                  '0 0 50px rgba(168, 85, 247, 0.7)',
                  '0 0 20px rgba(168, 85, 247, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <span className="absolute inset-[2px] bg-black rounded-2xl" />
            
            <span className="relative z-10 flex items-center justify-center gap-4">
              <span>ENTER</span>
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-4xl"
              >
                →
              </motion.span>
            </span>
          </motion.button>

          {/* Simplified expanding rings */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-purple-500/40 rounded-2xl pointer-events-none"
              animate={{
                scale: [1, 2],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Simplified corner frames */}
      {[
        { position: 'top-0 left-0', borders: 'border-l-4 border-t-4', color: 'border-purple-500/40' },
        { position: 'top-0 right-0', borders: 'border-r-4 border-t-4', color: 'border-blue-500/40' },
        { position: 'bottom-0 left-0', borders: 'border-l-4 border-b-4', color: 'border-pink-500/40' },
        { position: 'bottom-0 right-0', borders: 'border-r-4 border-b-4', color: 'border-cyan-500/40' }
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.position} w-40 h-40 ${corner.borders} ${corner.color}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 + i * 0.1 }}
        />
      ))}
    </div>
  )
}

export default LandingPage
