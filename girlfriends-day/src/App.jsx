import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import DaysCounter from './components/DaysCounter.jsx'
import PhotoGallery from './components/PhotoGallery.jsx'
import UsWhen from './components/UsWhen.jsx'
import LoveLetter from './components/LoveLetter.jsx'
import WhyILoveYou from './components/WhyILoveYou.jsx'
import Memories from './components/Memories.jsx'
import MusicSection from './components/MusicSection.jsx'
import FlipCards from './components/FlipCards.jsx'
import Future from './components/Future.jsx'
import ClosingScreen from './components/ClosingScreen.jsx'
import Footer from './components/Footer.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import HeartBurst from './components/HeartBurst.jsx'
import HeartStarfield from './components/HeartStarfield.jsx'
import LockScreen from './components/LockScreen.jsx'
import ForHerEyesOnly from './components/ForHerEyesOnly.jsx'

// 3D slide + rotate page transitions for Pinterest-moodboard depth
const pageVariants = {
  initial: { 
    opacity: 0, 
    x: 120, 
    rotateY: 15,
    scale: 0.98,
    transformPerspective: 1200 
  },
  animate: { 
    opacity: 1, 
    x: 0, 
    rotateY: 0,
    scale: 1,
    transition: { 
      duration: 0.55, 
      ease: [0.23, 1, 0.32, 1] 
    } 
  },
  exit: { 
    opacity: 0, 
    x: -120, 
    rotateY: -15,
    scale: 0.98,
    transformPerspective: 1200,
    transition: { 
      duration: 0.55, 
      ease: [0.23, 1, 0.32, 1] 
    } 
  }
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen flex flex-col items-center justify-between z-10"
    >
      <div className="w-full flex-grow flex flex-col items-center justify-center relative">
        {children}
      </div>
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const navigate = useNavigate()

  // Linear presentation sequence
  const sequence = [
    '/',
    '/gallery',
    '/us-when',
    '/letter',
    '/why-i-love-you',
    '/memories',
    '/music',
    '/future',
    '/reasons',
    '/closing'
  ]

  const currentIdx = sequence.indexOf(location.pathname)
  const isSecretRoute = location.pathname === '/for-her-eyes-only'
  const isDimmed = ['/gallery', '/us-when', '/letter', '/why-i-love-you', '/memories', '/music', '/future', '/reasons'].includes(location.pathname)

  return (
    <div className="relative w-full min-h-screen">
      
      {/* ── Immersive 3D Space Background (hidden on secret raw letter page) ── */}
      {!isSecretRoute && <HeartStarfield />}

      {/* ── Fine Grain Textured Overlay (hidden on secret raw letter page) ── */}
      {!isSecretRoute && (
        <div className="fixed inset-0 z-[1] bg-grain opacity-[0.02] pointer-events-none w-full h-full" />
      )}

      {/* ── Route-based Background Dim/Blur Overlay ── */}
      {!isSecretRoute && (
        <div 
          className="fixed inset-0 z-0 pointer-events-none transition-all duration-700 ease-in-out"
          style={{
            background: isDimmed ? 'rgba(10, 10, 26, 0.72)' : 'rgba(10, 10, 26, 0.1)',
            backdropFilter: isDimmed ? 'blur(5px)' : 'blur(0px)',
            WebkitBackdropFilter: isDimmed ? 'blur(5px)' : 'blur(0px)'
          }}
        />
      )}

      {/* ── Fixed Page-by-Page Next/Back Overlay Controls ── */}
      {!isSecretRoute && (
        <>
          {currentIdx > 0 && (
            <motion.button
              onClick={() => navigate(sequence[currentIdx - 1])}
              className="fixed bottom-6 left-6 z-40 px-5 py-3 rounded-full flex items-center justify-center gap-2 border-none text-white font-medium select-none shadow-[0_0_20px_rgba(255,20,147,0.4)] cursor-pointer outline-none"
              style={{
                background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.02, 1],
                boxShadow: ['0 0 15px rgba(255,20,147,0.3)', '0 0 25px rgba(255,20,147,0.5)', '0 0 15px rgba(255,20,147,0.3)']
              }}
              transition={{
                scale: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
                boxShadow: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back page"
            >
              <motion.span
                animate={{ x: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="text-lg font-bold"
              >
                ←
              </motion.span>
              <span className="hidden md:inline text-xs tracking-wider uppercase font-semibold">Back</span>
            </motion.button>
          )}

          {currentIdx !== -1 && currentIdx < sequence.length - 1 && (
            <motion.button
              onClick={() => navigate(sequence[currentIdx + 1])}
              className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full flex items-center justify-center gap-2 border-none text-white font-medium select-none shadow-[0_0_20px_rgba(255,20,147,0.4)] cursor-pointer outline-none"
              style={{
                background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.02, 1],
                boxShadow: ['0 0 15px rgba(255,20,147,0.3)', '0 0 25px rgba(255,20,147,0.5)', '0 0 15px rgba(255,20,147,0.3)']
              }}
              transition={{
                scale: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
                boxShadow: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next page"
            >
              <span className="hidden md:inline text-xs tracking-wider uppercase font-semibold">Next</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="text-lg font-bold"
              >
                →
              </motion.span>
            </motion.button>
          )}

          {currentIdx !== -1 && (
            <div className="fixed top-6 right-6 z-40 text-[10px] sm:text-xs font-mono tracking-widest text-pink/80 bg-night-900/60 backdrop-blur px-3.5 py-1.5 rounded-full border border-pink/15 shadow-[0_0_12px_rgba(255,105,180,0.15)] select-none">
              JOURNEY {currentIdx + 1} / {sequence.length}
            </div>
          )}
        </>
      )}

      {/* ── Routes Display with Cross-Fade Transitions ── */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <div className="w-full flex flex-col items-center justify-center py-12">
                  <Hero onScrollClick={() => navigate('/gallery')} />
                  <DaysCounter />
                </div>
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageWrapper>
                <PhotoGallery />
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/us-when"
            element={
              <PageWrapper>
                <UsWhen />
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/letter"
            element={
              <PageWrapper>
                <LoveLetter />
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/why-i-love-you"
            element={
              <PageWrapper>
                <WhyILoveYou />
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/memories"
            element={
              <PageWrapper>
                <Memories />
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/music"
            element={
              <PageWrapper>
                <MusicSection />
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/future"
            element={
              <PageWrapper>
                <Future />
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/reasons"
            element={
              <PageWrapper>
                <FlipCards />
                <Footer />
              </PageWrapper>
            }
          />
          <Route
            path="/closing"
            element={
              <PageWrapper>
                <ClosingScreen />
              </PageWrapper>
            }
          />
          {/* Secret raw page not in normal linear flow */}
          <Route
            path="/for-her-eyes-only"
            element={
              <ForHerEyesOnly />
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Floating Menu, cursor trail, and heart triggers (hidden on secret raw letter page) */}
      {!isSecretRoute && <Navbar />}
      <CursorTrail />
      <HeartBurst />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div 
        className="relative min-h-screen overflow-x-hidden transition-colors duration-500" 
        style={{ background: '#0a0a1a' }}
      >
        <LockScreen>
          <AnimatedRoutes />
        </LockScreen>
      </div>
    </Router>
  )
}
