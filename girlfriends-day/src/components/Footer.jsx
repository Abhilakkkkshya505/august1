import { motion } from 'framer-motion'
import { useHeartBurst } from './HeartBurst.jsx'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR CLOSING MESSAGE HERE
// ═══════════════════════════════════════════════════════════════════════
const CLOSING_MESSAGE =
  "Thank you for being you. For your love, your laughter, and the light you bring into my world every single day. I love you — today, tomorrow, and under every star in the sky."

export default function Footer() {
  const burst = useHeartBurst()

  return (
    <footer className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden">
      {/* Final shooting star */}
      <motion.div
        className="absolute top-1/4 left-1/2"
        initial={{ x: 200, y: -100, opacity: 0 }}
        whileInView={{ x: -400, y: 200, opacity: [0, 1, 1, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 4, delay: 1, ease: 'linear' }}
      >
        <span className="text-3xl text-gold">✨</span>
      </motion.div>

      {/* Sparkle particles around footer */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        >
          <span className="text-lg">⭐</span>
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="text-center max-w-xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold mb-8">
          To the stars
          <br />
          <span className="text-pink">and beyond</span>
        </h2>

        <p className="text-blush/70 text-lg leading-relaxed mb-8 font-light">
          {CLOSING_MESSAGE}
        </p>

        {/* Heart burst trigger */}
        <motion.button
          onClick={burst}
          className="inline-block text-4xl cursor-pointer bg-transparent border-none outline-none"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Click for a heart burst!"
        >
          💖
        </motion.button>
        <p className="text-blush/40 text-sm mt-4 font-light">
          Click to send hearts into the stars ✨
        </p>
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="absolute bottom-8 text-center w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-blush/20 text-xs font-light">
          Made with all my love &bull; Happy Girlfriend's Day 🩷
        </p>
      </motion.div>
    </footer>
  )
}
