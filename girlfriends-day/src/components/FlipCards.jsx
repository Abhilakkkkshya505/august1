import { useState } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR REASONS HERE
//  Add or remove items. Each one becomes a flip-card.
// ═══════════════════════════════════════════════════════════════════════
const REASONS = [
  { emoji: '🔥', reason: 'You are soo hot and majedar' },
  { emoji: '😋', reason: 'Very chatpati baddie' },
  { emoji: '😂', reason: 'Your laugh is my favorite sound' },
  { emoji: '🧠', reason: 'You make me feel smart' },
  { emoji: '❤️', reason: 'You love me even on my worst days' },
  { emoji: '🌟', reason: 'You make everything more beautiful' },
  { emoji: '🤗', reason: 'You are my everything' },
  { emoji: '✨', reason: 'You believe in me when I doubt myself' },
]

export default function FlipCards() {
  const [flipped, setFlipped] = useState({})

  const toggleFlip = (i) => {
    setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <section id="reasons" className="relative min-h-screen py-24">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
          Reasons I <span className="text-pink">Love You</span>
        </h2>
        <p className="text-blush/60 text-lg font-light">Tap a card to reveal</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto px-4">
        {REASONS.map((item, i) => (
          <motion.div
            key={i}
            className={`flip-card cursor-pointer ${flipped[i] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(i)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className="flip-card-inner">
              {/* Front — star card */}
              <div
                className="flip-card-front"
                style={{
                  background: 'linear-gradient(145deg, rgba(45,27,78,0.8), rgba(26,9,51,0.9))',
                  border: '1px solid rgba(255,105,180,0.2)',
                  boxShadow: '0 0 20px rgba(255,20,147,0.1)',
                }}
              >
                <span className="text-4xl mb-3">⭐</span>
                <span className="text-lg text-gold font-light">{item.emoji}</span>
                <p className="text-xs text-blush/40 mt-2">Tap to reveal ✨</p>
              </div>
              {/* Back — reason */}
              <div className="flip-card-back">
                <span className="text-3xl mb-3">{item.emoji}</span>
                <p className="text-blush text-sm font-light leading-relaxed">{item.reason}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
