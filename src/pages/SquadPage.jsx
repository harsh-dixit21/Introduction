import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import MemberCard from '../components/MemberCard'

const SquadPage = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const squadMembers = [
    {
      id: 1,
      name: "HARSH DIXIT",
      image: "/images/member1.jpg",
      role: "THE BEGINNING BOSS",
      color: "from-purple-500 to-pink-500",
      description: "The guy who thinks he invented 'being boyfriend material' and has the confidence of a contestant who got eliminated in Round 1. Smart enough to know 2+2=4, funny enough to make dad jokes seem cool, and apparently so good-looking that mirrors started a fan club. Self-proclaimed 'most boyfriend type' but still single because even his own standards can't meet his expectations.",
      stats: { Delusion: 100, Humor: 90, "Self-Love": 99 }
    },
    {
      id: 2,
      name: "DIVIK ARORA",
      image: "/images/member2.jpg",
      role: "THE WISEMAN",
      color: "from-blue-500 to-cyan-500",
      description: "Neem ka patta kadwa hai, Divik Arora badwa hai—a rhyme so famous it's basically his national anthem. Smart enough to code your life away, good-looking enough to make you question your genetics. The actual coder in a group of 'I'll learn Python someday' guys. He fixes your Wi-Fi, debugs your code, AND your life choices—all while maintaining that mysterious 'I'm too cool for emotions' vibe.",
      stats: { Coding: 98, Bitterness: 95, Wisdom: 92 }
    },
    {
      id: 3,
      name: "ANSH",
      image: "/images/member3.jpg",
      role: "THE ULTIMATE UNDISPUTED CONQUERER BEAST SLAYER - FINAL BOSS",
      color: "from-pink-500 to-purple-500",
      description: "THE ULTIMATE. THE UNDISPUTED. THE BEAST SLAYER. THE CONQUERER. THE GUY WHO USES ALL CAPS IN GROUP CHATS. Collects titles like infinity stones and treats life like a video game where he's already beaten every level... except laundry and cooking. The final boss who takes 47 hours to defeat but respawns every Monday morning. Legend says his ego has its own gravitational pull.",
      stats: { Power: 100, "All Caps": 100, Ego: 99 }
    },
    {
      id: 4,
      name: "HARDIK",
      image: "/images/member4.jpg",
      role: "THE NANNY",
      color: "from-cyan-500 to-blue-500",
      description: "The random dude from Jhajjar who somehow ended up babysitting this entire circus. Gulshan ka beta and proud carrier of the 'Kalua' nickname. He's the group's unofficial mom: reminds everyone to eat, sleep, and stop doing dumb stuff (they never listen). Went from small-town vibes to managing a squad of chaos agents. His superpower? Surviving in a friend group where sanity went to die.",
      stats: { Patience: 95, "Mom Energy": 98, Jhajjar: 100 }
    },
    {
      id: 5,
      name: "ADITYA",
      image: "/images/member5.jpg",
      role: "KATORI LADKI KA AASHIQ",
      color: "from-purple-500 to-blue-500",
      description: "Has a type: sharp jawlines that could cut diamonds and pillows that bear the trauma of his nightly affection. Romance level? Somewhere between a Bollywood hero and a golden retriever. So in love with 'katori ladki' that he probably dreams in slow-motion hair flips. His pillow-sucking habit while sleeping is either adorable or deeply concerning. Keep him away from home décor stores; he might propose to a cushion.",
      stats: { Romance: 100, "Pillow Love": 97, Devotion: 99 }
    },
    {
      id: 6,
      name: "ARNAV",
      image: "/images/member6.jpg",
      role: "THE GIGACHAD FROM KANPUR",
      color: "from-pink-500 to-cyan-500",
      description: "The Gigachad from Kanpur who walks into rooms like he owns the building, the street, and possibly the entire city. Jaw? Chiseled. Confidence? Illegal in 47 countries. Aura? So powerful it has its own theme music. Makes 'being from Kanpur' sound like a flex and somehow pulls it off. While others talk about being alpha, Arnav IS the entire Greek alphabet. Legends say he once looked in the mirror and the mirror blinked first.",
      stats: { Swagger: 100, Jawline: 96, "Kanpur Pride": 100 }
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic background layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Parallax grid */}
      <motion.div 
        className="fixed inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 200])
        }}
      />
      
      {/* Animated scan lines */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #a855f7 2px, #a855f7 4px)'
        }}
        animate={{
          y: ['0%', '100%']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Energy orbs */}
      <motion.div
        className="fixed top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 200]),
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="fixed bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Reduced floating shapes for performance */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed will-change-transform"
          style={{
            left: `${10 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`w-4 h-4 border-2 ${i % 3 === 0 ? 'border-purple-500/30' : i % 3 === 1 ? 'border-blue-500/30' : 'border-pink-500/30'}`} />
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Title with parallax effect */}
        <motion.div 
          className="sticky top-8 mb-16 z-20"
          style={{ opacity, scale }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text relative"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.6)' }}
          >
            Meet The Squad
          </motion.h1>
          
          {/* Animated subtitle */}
          <motion.div
            className="flex justify-center items-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.p
              className="text-purple-300/70 text-xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to unleash the chaos
            </motion.p>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Cards grid with stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {squadMembers.map((member, index) => (
            <motion.div
              key={member.id}
              onHoverStart={() => setHoveredId(member.id)}
              onHoverEnd={() => setHoveredId(null)}
              style={{
                y: useTransform(
                  scrollYProgress,
                  [0, 1],
                  [0, index % 2 === 0 ? -50 : 50]
                )
              }}
            >
              <MemberCard
                member={member}
                onClick={() => setSelectedMember(member)}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl border-2 border-purple-500/50 rounded-3xl p-8 max-w-5xl w-full relative overflow-hidden my-8"
                initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
                transition={{ type: "spring", duration: 0.7 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Animated particles in modal */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}

                {/* Glowing border pulse */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)',
                      '0 0 60px rgba(168, 85, 247, 0.6), inset 0 0 30px rgba(168, 85, 247, 0.2)',
                      '0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Close button */}
                <motion.button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-6 right-6 text-white text-4xl font-bold z-20 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 border-2 border-white/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  ×
                </motion.button>
                
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Image section */}
                  <div className="md:col-span-2 relative overflow-hidden rounded-2xl">
                    <motion.img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover min-h-[400px]"
                      initial={{ scale: 1.3, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-t ${selectedMember.color} opacity-20`}
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    {/* Scan line */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-20"
                      animate={{ y: ['-100%', '500%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Info section */}
                  <div className="md:col-span-3 flex flex-col justify-center space-y-4">
                    <motion.h2
                      className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${selectedMember.color} text-transparent bg-clip-text`}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedMember.name}
                    </motion.h2>

                    <motion.p
                      className="text-xl md:text-2xl text-purple-300 font-semibold leading-relaxed break-words"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedMember.role}
                    </motion.p>

                    <motion.p
                      className="text-base text-purple-200/80 leading-relaxed"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {selectedMember.description}
                    </motion.p>

                    {/* Stats bars */}
                    <motion.div
                      className="space-y-3 pt-4"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {Object.entries(selectedMember.stats).map(([stat, value], i) => (
                        <div key={stat}>
                          <div className="flex justify-between mb-1">
                            <span className="text-purple-300 text-sm font-semibold">{stat}</span>
                            <span className="text-purple-400 text-sm">{value}%</span>
                          </div>
                          <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${selectedMember.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-purple-400 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-blue-400 rounded-br-3xl" />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-purple-300 text-sm">Scroll</span>
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full p-1">
            <motion.div
              className="w-1 h-2 bg-purple-400 rounded-full mx-auto"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner frames */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-purple-500/30 pointer-events-none z-40" />
      <div className="fixed top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-blue-500/30 pointer-events-none z-40" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-pink-500/30 pointer-events-none z-40" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none z-40" />
    </div>
  )
}

export default SquadPage
