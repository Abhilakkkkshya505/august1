import { useState } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR TIMELINE MILESTONES HERE
//  Add, remove, or modify items. 
//  Each milestone can have an optional photo path.
// ═══════════════════════════════════════════════════════════════════════
const MILESTONES = [
  {
    date: 'September 26, 2025',
    title: 'Our confession day',
    description: 'You confessed me on this day and I was in literal shock and then I confessed you back lol',
    
  },
  {
    date: 'October 1, 2025',
    title: 'You and me became one',
    description: 'It was the day I convinced you to be my girlfriend and be mine forever.',
    
  },
  {
    date: 'November 7, 2025',
    title: 'MUN Conference',
    description: 'You were wearing a saree and looked so beautiful and you also gave me hair tie on that day and on confession chit i complimented you hihi and also we were matching outfits ',
    
  },
  {
    date: 'January 30, 2026',
    title: 'Farewell day',
    description: 'Farewell day, my last day of school it was so good we took soo many pictures but that day I was burning of jealousy',
    
  },
  {
    date: 'August 1, 2026',
    title: 'Girlfriend\'s Day Celebration',
    description: 'A special day dedicated to you, reflecting on all the stars we\'ve aligned and the dreams we\'ve built.',
    
  }
]

// ═══════════════════════════════════════════════════════════════════════
//  TIMELINE CARD WITH 3D HOVER TILT
// ═══════════════════════════════════════════════════════════════════════
function TimelineCard({ item, isLeft }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / (rect.height / 2)) * 6 // max 6 degrees
    const rotateY = (x / (rect.width / 2)) * 6
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div 
      className="glass p-6 hover:shadow-[0_12px_32px_rgba(255,20,147,0.12)] transition-shadow duration-300 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{
        border: '1px solid rgba(255,105,180,0.2)',
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {/* Glowing highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink to-orchid" />

      {/* Date */}
      <span className="inline-block text-pink font-mono text-xs tracking-wider mb-2 font-medium">
        {item.date}
      </span>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-3">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-blush/80 text-sm md:text-base font-light leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Optional Photo */}
      {item.photo && (
        <div className={`w-full h-40 rounded-lg overflow-hidden bg-night-900/40 border border-pink/15 ${
          isLeft ? 'md:ml-auto md:w-3/4' : 'md:w-3/4'
        }`}>
          <img 
            src={item.photo} 
            alt={item.title} 
            className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none'
              const parent = e.target.parentElement
              if (parent && !parent.querySelector('.photo-placeholder')) {
                const div = document.createElement('div')
                div.className = 'photo-placeholder absolute inset-0 flex flex-col items-center justify-center text-4xl gap-1 bg-night-900/50'
                div.innerHTML = `<span>📸</span>`
                parent.appendChild(div)
              }
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

export default function Memories() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="memories" className="relative min-h-screen py-20 px-4 w-full max-w-5xl mx-auto">
      {/* Title Header */}
      <motion.div
        className="text-center mb-16 z-10"
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
          ✦ Chapter by Chapter ✦
        </span>
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-white">
          Our <span className="text-pink">Timeline</span>
        </h2>
        <p className="text-blush/60 text-sm md:text-base font-light mt-1">
          A visual record of the milestones we have created together
        </p>
      </motion.div>

      {/* Timeline List */}
      <div className="relative w-full">
        {/* Central Vertical Line (Glowing) */}
        <div 
          className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] -translate-x-[1px] md:-translate-x-1/2 z-0"
          style={{
            background: 'linear-gradient(to bottom, #ff1493, #da70d6, #ffd97d, #ff69b4)',
            boxShadow: '0 0 15px rgba(255,20,147,0.3)',
          }}
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-12 w-full"
        >
          {MILESTONES.map((item, idx) => {
            const isLeft = idx % 2 === 0

            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-start w-full ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Glowing Dot Node */}
                <div 
                  className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full z-10 -translate-x-[9px] md:-translate-x-1/2 flex items-center justify-center"
                  style={{
                    background: '#0a0a1a',
                    border: '3px solid #ff69b4',
                    boxShadow: '0 0 10px #ff1493',
                    top: '8px'
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-pink" />
                </div>

                {/* Glass Card Box */}
                <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${
                  isLeft ? 'md:pr-10 text-left md:text-right' : 'md:pl-10 text-left'
                }`}>
                  <TimelineCard item={item} isLeft={isLeft} />
                </div>

                {/* Blank space spacing on opposite side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
