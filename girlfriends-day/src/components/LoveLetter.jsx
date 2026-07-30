import { useState } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR LOVE LETTER HERE
//  Each string in the array is a separate paragraph that fades in
//  one-by-one as you scroll.
// ═══════════════════════════════════════════════════════════════════════
const LETTER_PARAGRAPHS = [
"Happy Girlfriend's Day, my Juliet. ❤️ I really can't explain how much I love you, Palak. You are literally everything to me. I can't imagine my life without you. I am so grateful that you came into my life because you made everything feel brighter. Every dream I have, every plan I make, somehow has you in it. You are my peace, my comfort, and my whole universe.",
"I wanna marry you one day and spend my whole life with you. I wanna build a beautiful home with you, travel the world, make the best memories, and grow old together. Right now we are so young, but one day we are gonna look back at these days and laugh about how cute and stupid we were. We are gonna tell our children about the struggles we faced and how we never gave up on each other. I know we will make it work because I believe in us.",
"I am sorry for the way I have behaved sometimes, especially with all the self-blaming and overthinking. I know it hurts you too, and I never want to make you feel that way again. I promise I am gonna work on myself because you deserve the happiest version of me. And yes... from now on you are gonna see my complete baby version. The one that gets emotionally attached, wants your hugs, your attention, your love, and just wants you all the time. 😂❤️",
"I also want you to know that I am always with you. In every success, every failure, every smile, every tear, every good day and every bad day, I am gonna stand beside you. I am always gonna support you, believe in you, protect you, and remind you how amazing you are. No matter what happens, it is always gonna be you and me.",
"And one last thing... if you die before me, I am not talking to you. 😤 So that is not allowed, okay? We are staying together for a very, very long time. I love you so much, baby. More than I could ever explain. You will always be my princess, my Juliet, my whole universe... and forever my paneer. ❤️"
]

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR NAME HERE
// ═══════════════════════════════════════════════════════════════════════
const YOUR_NAME = 'Abhilakshya'

export default function LoveLetter() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / (rect.height / 2)) * 6 // max 6 degrees for subtle feel
    const rotateY = (x / (rect.width / 2)) * 6
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section id="love-letter" className="relative min-h-screen py-24">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
          A Letter <span className="text-pink">Under the Stars</span>
        </h2>
      </motion.div>

      <motion.div
        className="glass max-w-2xl mx-auto p-8 md:p-12 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        {/* Glow border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 30px rgba(255,20,147,0.05), 0 0 40px rgba(255,20,147,0.1)',
            border: '1px solid rgba(255,105,180,0.15)',
          }}
        />

        {/* Salutation */}
        <p className="font-['Dancing_Script'] text-2xl text-pink mb-6 relative z-10">
          My Dearest,
        </p>

        {/* Paragraphs */}
        <div className="space-y-6 relative z-10">
          {LETTER_PARAGRAPHS.map((paragraph, i) => (
            <motion.p
              key={i}
              className="text-blush/80 leading-relaxed text-lg font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Closing */}
        <motion.p
          className="font-['Dancing_Script'] text-xl text-pink mt-8 text-right relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
        >
          Forever yours,
          <br />
          <span className="text-gold">{YOUR_NAME} ✨</span>
        </motion.p>
      </motion.div>
    </section>
  )
}
