import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const MemberCard = ({ member, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        delay: index * 0.1
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glowing border effect with animation */}
      <motion.div 
        className="absolute -inset-1 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500"
        animate={{
          background: isHovered 
            ? [
                `linear-gradient(45deg, #a855f7, #ec4899)`,
                `linear-gradient(90deg, #ec4899, #a855f7)`,
                `linear-gradient(135deg, #a855f7, #ec4899)`
              ]
            : `linear-gradient(45deg, #a855f7, #ec4899)`
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />
      
      {/* Card content */}
      <div className="relative bg-black rounded-3xl overflow-hidden border border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-300">
        {/* Image container */}
        <div className="relative h-80 overflow-hidden">
          {/* Image with zoom effect */}
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient overlay */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-t ${member.color} mix-blend-overlay`}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Scan line effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-20"
                initial={{ y: '-100%' }}
                animate={{ y: '400%' }}
                exit={{ y: '400%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </AnimatePresence>

          {/* Corner frame accents */}
          <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-white/50" />
          <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-white/50" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-white/50" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-white/50" />

          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/50" />
        </div>

        {/* Name section with enhanced styling */}
        <div className="relative p-6 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30 backdrop-blur-sm">
          {/* Animated top border */}
          <motion.div
            className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${member.color}`}
            initial={{ width: '0%' }}
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.5 }}
          />

          <motion.h3
            className={`text-3xl font-bold bg-gradient-to-r ${member.color} text-transparent bg-clip-text mb-2 relative`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            {member.name}
            
            {/* Glitch effect on hover */}
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.span
                    className="absolute top-0 left-0 text-purple-500"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: [0, 0.7, 0], x: [-2, 2, -2] }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {member.name}
                  </motion.span>
                  <motion.span
                    className="absolute top-0 left-0 text-blue-500"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: [0, 0.7, 0], x: [2, -2, 2] }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2, delay: 0.1 }}
                  >
                    {member.name}
                  </motion.span>
                </>
              )}
            </AnimatePresence>
          </motion.h3>
          
          <motion.p
            className="text-purple-300 text-lg line-clamp-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            {member.role}
          </motion.p>

          {/* Hover indicator with animation */}
          <motion.div
            className="mt-4 flex items-center text-blue-400"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm font-semibold">Click to view details</span>
            <motion.span
              className="ml-2 text-lg"
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            >
              →
            </motion.span>
          </motion.div>

          {/* Stat bars (decorative) */}
          <div className="mt-4 space-y-2">
            <motion.div
              className="h-1 bg-purple-900/50 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '100%' : '100%' }}
            >
              <motion.div
                className={`h-full bg-gradient-to-r ${member.color}`}
                initial={{ width: '0%' }}
                animate={{ width: isHovered ? '100%' : '70%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Corner accents for card */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-purple-500/30 group-hover:border-purple-500/70 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-blue-500/30 group-hover:border-blue-500/70 transition-all duration-300" />

        {/* Particle burst on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-purple-400"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 8) * 100,
                    y: Math.sin((i * Math.PI * 2) / 8) * 100,
                    opacity: [1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default MemberCard
