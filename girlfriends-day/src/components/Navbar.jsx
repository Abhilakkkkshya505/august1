import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)

  const links = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/us-when', label: 'Us, When...', icon: '🎞️' },
    { path: '/letter', label: 'Love Letter', icon: '✉️' },
    { path: '/music', label: 'Soundtrack', icon: '🎵' },
    { path: '/reasons', label: 'Reasons', icon: '💖' },
    { path: '/why-i-love-you', label: 'Why I Love You', icon: '💌' },
    { path: '/memories', label: 'Our Timeline', icon: '📅' },
    { path: '/future', label: 'Future Dreams', icon: '🌠' },
  ]

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col items-center gap-2.5 mb-2"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link, idx) => {
              const isActive = location.pathname === link.path
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-lg ${
                      isActive
                        ? 'bg-pink/25 border-pink text-white shadow-pink/20 scale-105'
                        : 'bg-night-900/85 backdrop-blur border-pink/20 text-blush/80 hover:border-pink/40 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span className="text-sm font-medium tracking-wide">{link.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(255,20,147,0.4)] border border-pink/30 relative overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
        }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isOpen
            ? '0 0 35px rgba(255,20,147,0.6)'
            : '0 0 20px rgba(255,20,147,0.3)',
        }}
      >
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.span
          className="text-2xl"
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {isOpen ? '❌' : '💖'}
        </motion.span>
      </motion.button>
    </div>
  )
}
