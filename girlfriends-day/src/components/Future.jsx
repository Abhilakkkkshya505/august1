import { useState } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR FUTURE BUCKET LIST ITEMS HERE
//  Add or modify items. Keep them romantic and hopeful.
// ═══════════════════════════════════════════════════════════════════════
const INITIAL_DREAMS = [
  { text: "Travel to Japan during the cherry blossom season", checked: false },
  { text: "Do a world tour", checked: false },
  { text: "Build a homestay in Uttrakhand", checked: false },
  { text: "Have a cute family with a son and a daughter", checked: false },
  { text: "Go on a cruise to the Mediterranean", checked: false },
  { text: "Buy a house together aesthetic", checked: false },
  { text: "Learn to surf together on a tropical beach in Bali", checked: false },
  { text: "Start a dog shelter", checked: false }
]

export default function Future() {
  const [dreams, setDreams] = useState(INITIAL_DREAMS)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / (rect.height / 2)) * 5 // subtle 5 degrees
    const rotateY = (x / (rect.width / 2)) * 5
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const toggleCheck = (idx) => {
    setDreams((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, checked: !item.checked } : item))
    )
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const completedCount = dreams.filter(d => d.checked).length

  return (
    <section id="future" className="relative min-h-[90vh] flex flex-col items-center justify-center py-16 px-4 w-full max-w-2xl mx-auto">
      {/* Title Header */}
      <motion.div
        className="text-center mb-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span
          className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-3"
          style={{
            background: 'rgba(255,105,180,0.1)',
            border: '1px solid rgba(255,105,180,0.2)',
            color: '#ffb6c1',
          }}
        >
          ✦ Tomorrow & Beyond ✦
        </span>
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-white">
          Our <span className="text-pink">Future Dreams</span>
        </h2>
        <p className="text-blush/60 text-sm md:text-base font-light mt-1">
          A romantic bucket list of adventures we will embark on together
        </p>
      </motion.div>

      {/* Glass Checklist Card */}
      <motion.div 
        className="glass w-full p-6 sm:p-8 md:p-10 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        style={{
          border: '1px solid rgba(255,105,180,0.2)',
          boxShadow: '0 15px 35px rgba(255,20,147,0.08)',
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        {/* Glow corner highlight */}
        <div 
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-30" 
          style={{
            background: 'radial-gradient(circle, #ff1493, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />

        {/* Counter HUD */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-pink/15">
          <span className="text-xs font-mono tracking-widest text-pink font-semibold uppercase">
            Dream Index Registry
          </span>
          <span className="text-xs font-mono text-blush/60">
            {completedCount} / {dreams.length} RESOLVED
          </span>
        </div>

        {/* Checklist */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {dreams.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onClick={() => toggleCheck(idx)}
              className="flex items-center gap-4 p-3.5 rounded-xl border border-pink/5 hover:border-pink/15 hover:bg-white/3 cursor-pointer select-none transition-all duration-300"
            >
              {/* Star Icon Checkbox */}
              <motion.div 
                className="w-6 h-6 rounded-full flex items-center justify-center border border-pink/30 text-xs flex-shrink-0"
                animate={{
                  backgroundColor: item.checked ? 'rgba(255,105,180,0.25)' : 'rgba(0,0,0,0)',
                  borderColor: item.checked ? '#ff69b4' : 'rgba(255,105,180,0.3)',
                  boxShadow: item.checked ? '0 0 10px rgba(255,105,180,0.5)' : 'none'
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  animate={{ scale: item.checked ? 1 : 0.8 }}
                  className={item.checked ? 'text-gold' : 'text-blush/40'}
                >
                  ⭐
                </motion.span>
              </motion.div>

              {/* Text */}
              <span 
                className={`text-sm sm:text-base leading-relaxed tracking-wide transition-all duration-300 ${
                  item.checked ? 'text-blush/40 line-through' : 'text-white'
                }`}
              >
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer encouraging note */}
        <p className="text-center text-xs text-gold/50 mt-8 font-light tracking-wide italic">
          "The future belongs to those who believe in the beauty of their dreams." ✦
        </p>
      </motion.div>
    </section>
  )
}
