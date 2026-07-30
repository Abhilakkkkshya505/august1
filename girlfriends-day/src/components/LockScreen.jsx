import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeartStarfield from './HeartStarfield.jsx'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ PASSWORD CONFIGURATION
//  - CORRECT_CODE: Clean numeric string to match against
//  - WRONG_HINT: The message displayed if they enter an incorrect code
// ═══════════════════════════════════════════════════════════════════════
const CORRECT_CODE = '01102025' // January 10, 2025
const WRONG_HINT = 'hint: a date we\'ll never forget 🥹 (MM/DD/YYYY)'

export default function LockScreen({ children }) {
  const [unlocked, setUnlocked] = useState(false)
  
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Clean inputs: strip slashes (/), dashes (-), and spaces
    const cleanInput = code.replace(/[\/\s-]/g, '')

    if (cleanInput === CORRECT_CODE) {
      // Trigger smooth fade unlock animation
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      // Reset shake state after animation
      setTimeout(() => setShake(false), 500)
    }
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] flex items-center justify-center bg-night-900 select-none overflow-hidden">
      
      {/* 3D Heart starfield background is rendered behind the lock card */}
      <HeartStarfield />

      {/* Dim overlay to make the lock card pop */}
      <div className="fixed inset-0 z-0 bg-night-900/60 backdrop-blur-sm pointer-events-none" />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={shake ? {
            x: [-10, 10, -8, 8, -5, 5, 0],
            scale: 1,
            y: 0,
            opacity: 1,
            transition: { duration: 0.45 }
          } : {
            scale: 1,
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeOut' }
          }}
          exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.6 } }}
          className="glass w-full max-w-md p-8 text-center mx-4 relative z-10"
          style={{
            border: '1px solid rgba(255,105,180,0.22)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            background: 'rgba(20, 10, 36, 0.55)',
          }}
        >
          {/* Lock Icon badge */}
          <div className="w-16 h-16 rounded-full bg-pink/10 border border-pink/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,20,147,0.2)]">
            <span className="text-3xl animate-pulse">🔒</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 text-shadow-glow">
            For Her Eyes Only
          </h1>
          
          <p className="text-blush/80 text-sm font-light mb-6">
            Enter the date that means everything to us 💕
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-night-900/80 border border-pink/20 text-white placeholder-blush/30 text-center font-mono tracking-wider focus:outline-none focus:border-pink focus:shadow-[0_0_15px_rgba(255,105,180,0.25)] text-lg transition-all duration-300"
              autoFocus
            />

            <motion.button
              type="submit"
              className="w-full py-3 rounded-full text-white font-semibold cursor-pointer border-none shadow-[0_0_20px_rgba(255,20,147,0.4)]"
              style={{
                background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Unlock Memories 💖
            </motion.button>
          </form>

          {/* Hint Overlay */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-pink/80 text-xs mt-4 font-mono font-medium tracking-wide"
              >
                {WRONG_HINT}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
