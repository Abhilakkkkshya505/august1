import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ SET YOUR START DATE HERE
//  This counts the days, hours, and minutes since you started dating.
//  Format: new Date('YYYY-MM-DD')
// ═══════════════════════════════════════════════════════════════════════
const START_DATE = new Date('2025-10-01')

export default function DaysCounter() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const diff = now.getTime() - START_DATE.getTime()
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="days-counter" className="relative py-24">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="glass inline-block p-10 md:p-14">
          <p className="text-blush/60 text-lg mb-4 font-light">Together for</p>
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="text-center">
              <div
                className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold"
                style={{
                  background: 'linear-gradient(135deg, #ff1493, #ffd97d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {days}
              </div>
              <div className="text-blush/40 text-sm mt-1">Days</div>
            </div>
            <span className="text-3xl text-pink/50">✦</span>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-blush">
                {hours}
              </div>
              <div className="text-blush/40 text-sm mt-1">Hours</div>
            </div>
            <span className="text-3xl text-pink/50">✦</span>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-blush">
                {minutes}
              </div>
              <div className="text-blush/40 text-sm mt-1">Minutes</div>
            </div>
          </div>
          <p className="text-gold/60 text-sm mt-6 font-light tracking-wide">
            Every moment with you is a treasure
          </p>
        </div>
      </motion.div>
    </section>
  )
}
