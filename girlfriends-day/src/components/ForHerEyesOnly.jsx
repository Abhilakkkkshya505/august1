import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR SECRET FOR HER EYES ONLY LETTER HERE
//  This page is hidden and breaks from the visual theme of the site.
//  It is a plain, calm, paper-style cream page designed to read like
//  a private letter.
// ═══════════════════════════════════════════════════════════════════════
const SECRET_TITLE = "For Your Eyes Only"
const SECRET_PARAGRAPHS = [
  "If you are reading this, it means you found the tiny heart hidden at the end of our digital story. I wanted to leave a quiet, unadorned space here, free from the music, the colors, and the animations — just my raw words to you.",
  "There are times when the design of a website or the rhythm of a song cannot fully capture what is in my head. I love you not just on the days when everything feels like fireworks, but on the quiet, sleepy Tuesday afternoons when we are simply sharing a room. I love the person you are when no one else is watching.",
  "You are my safe harbor, my favorite conversationalist, and the person I want to tell everything to first. Thank you for holding my hand through all the changes of the past year. My promise to you remains simple: to listen, to care, and to choose you over and over, every single day.",
  "Take this page as a small pocket of peace, just for us. You can return here whenever you need a reminder of what we are building, and how much you mean to me."
]

export default function ForHerEyesOnly() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#fff5f6] to-[#fffdfd] flex flex-col items-center justify-center p-6 md:p-12 text-[#2d1b33] select-text">
      
      {/* ── Return Button ── */}
      <motion.button
        onClick={() => navigate('/closing')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
        className="fixed top-8 left-8 flex items-center gap-2 text-xs uppercase tracking-wider font-semibold font-mono border-none bg-transparent cursor-pointer text-[#2d1b33]"
      >
        ← Back to Site
      </motion.button>

      {/* ── Main Letter Content ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="w-full max-w-xl flex flex-col items-center text-center mt-12 mb-8"
      >
        {/* Simple decorative heart divider */}
        <span className="text-xl text-pink/40 mb-6 font-light">♥</span>

        <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-wide mb-8 text-[#2d1b33]">
          {SECRET_TITLE}
        </h1>

        <div className="space-y-6 text-[#4a3a50] text-base md:text-lg leading-relaxed font-serif text-justify">
          {SECRET_PARAGRAPHS.map((p, idx) => (
            <p key={idx} className="indent-4 md:indent-8">
              {p}
            </p>
          ))}
        </div>

        <span className="text-xl text-pink/40 mt-12 font-light">♥</span>
      </motion.div>

    </div>
  )
}
