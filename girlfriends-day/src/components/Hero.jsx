import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR GIRLFRIEND'S NAME HERE
// ═══════════════════════════════════════════════════════════════════════
const HER_NAME = 'My Love'

export default function Hero({ onScrollClick }) {
  return (
    <section id="hero" className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6">
        {/* Badge */}
        <motion.div
          className="inline-block mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase"
            style={{
              background: 'rgba(255,105,180,0.1)',
              border: '1px solid rgba(255,105,180,0.2)',
              color: '#ffb6c1',
            }}
          >
            ✦ Happy Girlfriend's Day ✦
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-['Playfair_Display'] font-bold leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          <span
            className="inline-block animate-shimmer"
            style={{
              background: 'linear-gradient(135deg, #ffb6c1, #ff1493, #ffd97d, #ff69b4)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {HER_NAME}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-blush/50 mt-4 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          Every love story is beautiful, but ours is my favorite
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.button
            onClick={onScrollClick}
            className="cursor-pointer bg-transparent border-none outline-none"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-label="Scroll down"
          >
            <span className="text-2xl block mb-2">⭐</span>
            <span className="text-xs text-blush/30 tracking-widest uppercase">Discover</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
