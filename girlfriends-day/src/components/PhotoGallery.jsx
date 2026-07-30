import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ PHOTOS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════
const PHOTOS = [
  { src: '/photos/1.jpg', caption: '💕 Every day with you is a new adventure' },
  { src: '/photos/2.jpg', caption: '✨ Laughing together at our favorite place' },
  { src: '/photos/3.jpg', caption: '🌟 You light up my world like nobody else' },
  { src: '/photos/4.jpg', caption: '🩷 Cozy coffee dates and warm smiles' },
  { src: '/photos/5.jpg', caption: '💫 Lost in your eyes, always and forever' },
  { src: '/photos/6.jpg', caption: '🌙 Holding hands under the starry sky' },
  { src: '/photos/7.jpg', caption: '⭐ My favorite person in the whole universe' },
  { src: '/photos/8.jpg', caption: '🌸 Cheers to all the memories we share' },
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  const x = useMotionValue(0)
  // Map horizontal displacement to a subtle 3D rotation (up to 12 degrees)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.6, 0.9, 1, 0.9, 0.6])

  // Reset x motion value on card change
  useEffect(() => {
    x.set(0)
  }, [currentIndex, x])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % PHOTOS.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length)
  }

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 100
    const velocityThreshold = 400
    const { offset, velocity } = info

    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      handleNext()
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      handlePrev()
    }
  }

  // Animation variants for page/card sliding
  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      rotate: dir > 0 ? 8 : -8,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      rotate: dir > 0 ? -8 : 8,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  }

  const photo = PHOTOS[currentIndex]

  return (
    <section id="gallery" className="relative min-h-[90vh] flex flex-col items-center justify-center py-16 px-4">
      {/* Fixed Section indicator in top-right */}
      <div className="fixed top-16 right-6 z-40 text-[10px] sm:text-xs font-mono tracking-widest text-gold/80 bg-night-900/60 backdrop-blur px-3.5 py-1.5 rounded-full border border-gold/15 shadow-[0_0_12px_rgba(255,217,125,0.15)] select-none">
        IMAGE {currentIndex + 1} / {PHOTOS.length}
      </div>
      {/* Title Header */}
      <motion.div
        className="text-center mb-10 z-10"
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
          ✦ Memorable Moments ✦
        </span>
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-white">
          Our <span className="text-pink">Constellation</span>
        </h2>
        <p className="text-blush/60 text-sm md:text-base font-light mt-1">
          Swipe left/right or use arrows to browse our memory stack
        </p>
      </motion.div>

      {/* Main Swipe Carousel Wrapper */}
      <div className="relative w-full max-w-md flex flex-col items-center justify-center">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          className="absolute -left-6 md:-left-16 z-30 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border border-pink/20 bg-night-900/60 text-blush/70 hover:text-pink hover:border-pink/40 hover:bg-night-900/90 transition-all duration-300 shadow-md"
          aria-label="Previous image"
        >
          ←
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          className="absolute -right-6 md:-right-16 z-30 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border border-pink/20 bg-night-900/60 text-blush/70 hover:text-pink hover:border-pink/40 hover:bg-night-900/90 transition-all duration-300 shadow-md"
          aria-label="Next image"
        >
          →
        </button>

        {/* Card Container */}
        <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] md:w-[350px] md:h-[460px] flex items-center justify-center touch-pan-y">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              style={{ x, rotate, opacity }}
              className="absolute w-full h-full cursor-grab active:cursor-grabbing rounded-2xl p-3 flex flex-col justify-between"
              style={{
                x,
                rotate,
                opacity,
                background: 'linear-gradient(145deg, rgba(45,27,78,0.85), rgba(26,9,51,0.95))',
                border: '1px solid rgba(255,105,180,0.25)',
                boxShadow: '0 15px 35px rgba(255,20,147,0.15)',
              }}
            >
              {/* Image Frame */}
              <div className="w-full h-full rounded-xl overflow-hidden bg-night-900/40 relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    const parent = e.target.parentElement
                    if (parent && !parent.querySelector('.photo-placeholder')) {
                      const div = document.createElement('div')
                      div.className = 'photo-placeholder absolute inset-0 flex flex-col items-center justify-center text-5xl gap-2 bg-night-900/50'
                      div.innerHTML = `<span>🖼️</span><span class="text-xs text-blush/40 font-mono">Image ${currentIndex + 1}</span>`
                      parent.appendChild(div)
                    }
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots & Progress Indicator */}
        <div className="flex flex-col items-center gap-2 mt-8 z-10">
          <div className="flex items-center gap-2">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1)
                  setCurrentIndex(i)
                }}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  i === currentIndex ? 'bg-pink w-4 shadow-[0_0_8px_#ff69b4]' : 'bg-pink/20 hover:bg-pink/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
