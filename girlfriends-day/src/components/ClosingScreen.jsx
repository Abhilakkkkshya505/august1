import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useHeartBurst } from './HeartBurst.jsx'
import ScratchReveal from './ScratchReveal.jsx'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR SIGNATURE AND CLOSING TEXT HERE
// ═══════════════════════════════════════════════════════════════════════
const CLOSING_MESSAGE = "I really really love you mommyyyyyy, you are my everything and literal everything I love you so much wifey"
const SIGNATURE_NAME = "Abhilakshya"

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ SCRATCH CARD CONFIGURATION (CLOSING SURPRISE REVEAL)
//  Define the hidden content displayed once scratched.
//  - REVEAL_TYPE: 'text', 'photo', or 'both'
//  - REVEAL_TEXT: Message revealed under scratch layer
//  - REVEAL_PHOTO: Image URL revealed (e.g. '/photos/secret.jpg')
// ═══════════════════════════════════════════════════════════════════════
const REVEAL_TYPE = 'both'
const REVEAL_TEXT = "I love you honey till infinity and will always be yours wifey 💖✨"
const REVEAL_PHOTO = '/photos/us-when-21.jpg'

export default function ClosingScreen() {
  const navigate = useNavigate()
  const burst = useHeartBurst()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    // Disable card tilt if mouse is hovering over the scratch canvas to avoid cursor mismatch
    if (e.target.tagName === 'CANVAS') return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / (rect.height / 2)) * 4 // subtle 4 degrees
    const rotateY = (x / (rect.width / 2)) * 4
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  // Generate slow drifting background particles
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 95}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 8}s`,
    scale: 0.5 + Math.random() * 0.8,
    emoji: ['❤️', '💖', '🌸', '✨', '💕', '🩷'][Math.floor(Math.random() * 6)]
  }))

  const handleRestart = (e) => {
    // Fun burst effect on click
    burst(e)
    setTimeout(() => {
      navigate('/')
    }, 400)
  }

  return (
    <section id="closing" className="relative min-h-[95vh] flex flex-col items-center justify-center py-16 px-6 overflow-hidden w-full">
      {/* Floating particles background (restricted to closing screen container) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-[-50px] float-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              transform: `scale(${p.scale})`,
              fontSize: '1.2rem',
              opacity: 0
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* Main Glass Panel */}
      <motion.div
        className="glass max-w-xl p-8 sm:p-12 text-center relative z-10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotateX: tilt.x,
          rotateY: tilt.y
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          border: '1px solid rgba(255,105,180,0.2)',
          boxShadow: '0 20px 45px rgba(255,20,147,0.12)',
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        {/* Secret Trigger Heart (subtle hidden trigger in bottom right corner) */}
        <button
          onClick={() => navigate('/for-her-eyes-only')}
          className="absolute bottom-3.5 right-3.5 text-white/[0.06] hover:text-pink/35 text-xs cursor-pointer transition-all duration-500 border-none bg-transparent outline-none z-40"
          title="secret note"
        >
          ♥
        </button>

        {/* Glow behind text */}
        <div 
          className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, #ff69b4, transparent 75%)' }} 
        />

        {/* Decorative Badge */}
        <motion.div
          className="inline-block mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-2xl">✨ 💖 ✨</span>
        </motion.div>

        {/* Closing Message */}
        <h2 className="text-3xl sm:text-4xl font-['Playfair_Display'] font-medium leading-relaxed text-white text-shadow-glow">
          {CLOSING_MESSAGE}
        </h2>

        {/* Signature Line */}
        <motion.p
          className="font-['Dancing_Script'] text-2xl text-pink mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          With all my love,
        </motion.p>
        <motion.p
          className="font-['Dancing_Script'] text-3xl text-gold mt-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {SIGNATURE_NAME}
        </motion.p>

        {/* Scratch Card Bonus Surprise Section */}
        <div className="mt-12 flex flex-col items-center justify-center relative z-20">
          <p className="text-xs text-pink/60 uppercase tracking-widest font-mono mb-3">✦ A Secret Gift For You ✦</p>
          <ScratchReveal width={310} height={190}>
            <div className="flex flex-col items-center justify-center text-center p-2 h-full w-full">
              {(REVEAL_TYPE === 'photo' || REVEAL_TYPE === 'both') && (
                <div className="w-full h-[65%] rounded-lg overflow-hidden bg-night-900/30 mb-2 relative">
                  <img
                    src={REVEAL_PHOTO}
                    alt="Secret Revealed"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const p = e.target.parentElement
                      if (p && !p.querySelector('.secret-ph')) {
                        const d = document.createElement('div')
                        d.className = 'secret-ph w-full h-full flex items-center justify-center text-3xl bg-pink/10 text-pink'
                        d.innerHTML = '💑'
                        p.appendChild(d)
                      }
                    }}
                  />
                </div>
              )}
              {(REVEAL_TYPE === 'text' || REVEAL_TYPE === 'both') && (
                <p className="text-sm font-serif text-white font-medium px-1 leading-snug">
                  {REVEAL_TEXT}
                </p>
              )}
            </div>
          </ScratchReveal>
        </div>

        {/* Restart Button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <button
            onClick={handleRestart}
            className="cursor-pointer px-6 py-2.5 rounded-full border border-pink/30 bg-night-900/60 text-blush hover:border-pink/60 hover:text-white transition-all duration-300 font-mono tracking-widest text-sm hover:shadow-[0_0_20px_rgba(255,105,180,0.4)]"
            style={{
              background: 'linear-gradient(135deg, rgba(26,9,51,0.6), rgba(45,27,78,0.7))',
            }}
          >
            REPLAY ↻
          </button>
        </motion.div>
      </motion.div>

      {/* Made with love watermark footer */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-xs text-blush/30 font-mono tracking-wider text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Made with ❤️ by {SIGNATURE_NAME}
      </motion.div>
    </section>
  )
}
