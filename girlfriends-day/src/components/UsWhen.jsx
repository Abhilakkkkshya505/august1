import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT SLIDESHOW IMAGES AND CAPTIONS HERE
//  Add or update image paths and matching captions.
//  Place your images in /public/photos/ folder, named us-when-1.jpg etc.
// ═══════════════════════════════════════════════════════════════════════
const SLIDES = [
  { src: '/photos/us-when-1.jpg', caption: 'us when we first met' }, // SLIDE 1
  { src: '/photos/us-when-2.jpg', caption: 'us when we were being silly' }, // SLIDE 2
  { src: '/photos/us-when-3.jpg', caption: 'us when we stayed up all night talking' }, // SLIDE 3
  { src: '/photos/us-when-4.jpg', caption: 'us when we took our first trip together' }, // SLIDE 4
  { src: '/photos/us-when-5.jpg', caption: 'us when we tried cooking something new' }, // SLIDE 5
  { src: '/photos/us-when-6.jpg', caption: 'us when we got caught in the rain' }, // SLIDE 6
  { src: '/photos/us-when-7.jpg', caption: 'us when we took a cozy selfie' }, // SLIDE 7
  { src: '/photos/us-when-8.jpg', caption: 'us when we had a lazy Sunday morning' }, // SLIDE 8
  { src: '/photos/us-when-9.jpg', caption: 'us when we wore matching clothes' }, // SLIDE 9
  { src: '/photos/us-when-10.jpg', caption: 'us when we went stargazing' }, // SLIDE 10
  { src: '/photos/us-when-11.jpg', caption: 'us when we couldn\'t stop laughing' }, // SLIDE 11
  { src: '/photos/us-when-12.jpg', caption: 'us when we shared our favorite dessert' }, // SLIDE 12
  { src: '/photos/us-when-13.jpg', caption: 'us when we were exploring the city' }, // SLIDE 13
  { src: '/photos/us-when-14.jpg', caption: 'us when we took a walk in the autumn park' }, // SLIDE 14
  { src: '/photos/us-when-15.jpg', caption: 'us when we celebrated our first milestone' }, // SLIDE 15
  { src: '/photos/us-when-16.jpg', caption: 'us when we were singing along in the car' }, // SLIDE 16
  { src: '/photos/us-when-17.jpg', caption: 'us when we were looking at old memories' }, // SLIDE 17
  { src: '/photos/us-when-18.jpg', caption: 'us when we had a cozy movie night' }, // SLIDE 18
  { src: '/photos/us-when-19.jpg', caption: 'us when we walked along the beach' }, // SLIDE 19
  { src: '/photos/us-when-20.jpg', caption: 'us when I realized I wanted you forever' }, // SLIDE 20
]

const SLIDE_DURATION = 4000 // 4 seconds per slide

export default function UsWhen() {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const timerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / (rect.height / 2)) * 6 // max 6 degrees
    const rotateY = (x / (rect.width / 2)) * 6
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  // Autoplay handler
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % SLIDES.length)
      }, SLIDE_DURATION)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isPlaying])

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % SLIDES.length)
  }

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Slide transition variants (soft 3D scale zoom + cross-fade)
  const transitionVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    },
    exit: { 
      opacity: 0, 
      scale: 1.05, 
      transition: { duration: 0.6, ease: 'easeIn' } 
    }
  }

  const currentSlide = SLIDES[index]

  return (
    <section id="us-when" className="relative min-h-[90vh] flex flex-col items-center justify-center py-16 px-4">
      {/* Fixed Section indicator in top-right */}
      <div className="fixed top-16 right-6 z-40 text-[10px] sm:text-xs font-mono tracking-widest text-pink/80 bg-night-900/60 backdrop-blur px-3.5 py-1.5 rounded-full border border-pink/15 shadow-[0_0_12px_rgba(255,105,180,0.15)] select-none">
        FRAME {index + 1} / {SLIDES.length}
      </div>
      {/* Page Title */}
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
          ✦ Slideshow Registry ✦
        </span>
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-white tracking-wide">
          Us, <span className="text-pink">When...</span>
        </h2>
        <p className="text-blush/60 text-sm md:text-base font-light mt-1">
          A collection of small chapters in our grand love story
        </p>
      </motion.div>

      {/* Main Slide Card Container */}
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center">
        {/* Glass Card Outer */}
        <motion.div 
          className="glass w-[290px] h-[380px] sm:w-[350px] sm:h-[450px] md:w-[400px] md:h-[500px] p-4 flex flex-col justify-between relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          style={{
            border: '1px solid rgba(255,105,180,0.2)',
            boxShadow: '0 15px 40px rgba(255,20,147,0.1)',
            transformStyle: 'preserve-3d',
            perspective: 1000
          }}
        >
          {/* Slideshow Display */}
          <div className="w-full h-full rounded-xl overflow-hidden bg-night-900/40 relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={index}
                variants={transitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentSlide.src}
                  alt={currentSlide.caption}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    const parent = e.target.parentElement
                    if (parent && !parent.querySelector('.photo-placeholder')) {
                      const div = document.createElement('div')
                      div.className = 'photo-placeholder absolute inset-0 flex flex-col items-center justify-center text-5xl gap-2 bg-night-900/40'
                      div.innerHTML = `<span>💑</span><span class="text-xs text-blush/40 font-mono">Image ${index + 1}</span>`
                      parent.appendChild(div)
                    }
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Instagram Story Progress Bar Overlay */}
          {isPlaying && (
            <motion.div
              key={`progress-${index}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-[3px] bg-pink shadow-[0_0_8px_#ff69b4]"
            />
          )}
        </motion.div>

        {/* Controls HUD */}
        <div className="flex items-center gap-6 mt-6 z-10">
          <button
            onClick={handlePrev}
            className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center border border-pink/20 bg-night-900/50 text-blush/80 hover:text-pink hover:border-pink/40 hover:bg-night-900/80 transition-all duration-300 shadow-md"
            aria-label="Previous slide"
          >
            ←
          </button>
          
          <button
            onClick={togglePlay}
            className="cursor-pointer px-4 py-1.5 rounded-full border border-pink/30 bg-pink/10 text-xs font-mono tracking-widest text-pink hover:bg-pink/20 hover:text-white transition-all duration-300 shadow-md flex items-center gap-2"
          >
            <span>{isPlaying ? '⏸ PAUSE' : '▶ PLAY'}</span>
          </button>

          <button
            onClick={handleNext}
            className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center border border-pink/20 bg-night-900/50 text-blush/80 hover:text-pink hover:border-pink/40 hover:bg-night-900/80 transition-all duration-300 shadow-md"
            aria-label="Next slide"
          >
            →
          </button>
        </div>

        {/* Slide Index dots */}
        <div className="flex flex-col items-center gap-2 mt-4 z-10">
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[280px] sm:max-w-[320px]">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  i === index ? 'bg-pink w-3 shadow-[0_0_5px_#ff69b4]' : 'bg-pink/15 hover:bg-pink/40'
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
