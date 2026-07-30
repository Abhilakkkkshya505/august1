import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR PLAYLIST ID HERE
// ═══════════════════════════════════════════════════════════════════════
const SPOTIFY_PLAYLIST_ID = '1wDWac2PItlm63XWj5HC4s'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR CASSETTE SONGS HERE
//  - You can link local MP3s placed in your "public/music/" folder:
//      e.g. url: "/music/song1.mp3"
//  - Or use direct links to public audio streams.
//  - Below are 4 classic romantic songs with stable public streams for demo:
// ═══════════════════════════════════════════════════════════════════════
const SONGS = [
  {
    title: "Love Story 🌹",
    artist: "Taylor Swift",
    url: "https://p.scdn.co/mp3-preview/b2c1ed4794591a6266401294b48e2034768d5f73"
  },
  {
    title: "Kalank Title Track 🎵",
    artist: "Arijit Singh",
    url: "https://p.scdn.co/mp3-preview/e6715fc5e5e7d45b090c597db01b6303ca44edcc"
  },
  {
    title: "Vaaroon 🌸",
    artist: "Anand Bhaskar",
    url: "https://p.scdn.co/mp3-preview/43cb8539cd4e8d12165976f7c47d90c19ec74ae3"
  },
  {
    title: "Rang Jo Lagyo 🌟",
    artist: "Atif Aslam, Shreya Ghoshal",
    url: "https://p.scdn.co/mp3-preview/076086123504f29ad0ab8a8f5d44be4882334d3c"
  }
]

// Reusable 3D Tilt Wrapper
function TiltWrapper({ children, className, style, ...props }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / (rect.height / 2)) * 6
    const rotateY = (x / (rect.width / 2)) * 6
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIdx, setCurrentSongIdx] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [dialRotation, setDialRotation] = useState(0)
  const audioRef = useRef(null)

  // Initialize HTML5 Audio Element
  useEffect(() => {
    audioRef.current = new Audio(SONGS[currentSongIdx].url)
    audioRef.current.volume = volume

    const handleEnded = () => {
      handleNextSong()
    }
    
    audioRef.current.addEventListener('ended', handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  // Sync Song Track Changes
  useEffect(() => {
    if (!audioRef.current) return

    const wasPlaying = isPlaying
    audioRef.current.pause()
    
    audioRef.current.src = SONGS[currentSongIdx].url
    audioRef.current.volume = volume
    audioRef.current.load()

    if (wasPlaying) {
      audioRef.current.play().catch(err => console.log("Playback interrupted: ", err))
    }
  }, [currentSongIdx])

  // Sync Volume Levels
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(err => console.log("Playback failed: ", err))
      setIsPlaying(true)
    }
  }

  const handleNextSong = () => {
    setDialRotation(prev => prev + 90)
    setCurrentSongIdx((prev) => (prev + 1) % SONGS.length)
  }

  const handlePrevSong = () => {
    setDialRotation(prev => prev - 90)
    setCurrentSongIdx((prev) => (prev - 1 + SONGS.length) % SONGS.length)
  }

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
  }

  const currentSong = SONGS[currentSongIdx]

  return (
    <section id="music" className="relative min-h-screen py-24 flex flex-col items-center justify-center w-full">
      {/* Title Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span
          className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-3"
          style={{
            background: 'rgba(255,105,180,0.1)',
            border: '1px solid rgba(255,105,180,0.2)',
            color: '#ffb6c1',
          }}
        >
          ✦ Radio & Soundwaves ✦
        </span>
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4 text-white text-shadow-glow">
          Our <span className="text-pink">Soundtrack</span>
        </h2>
        <p className="text-blush/60 text-lg font-light">The songs that remind me of you</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-12 max-w-5xl mx-auto px-4 relative z-10 w-full">
        
        {/* ── Interactive Retro Cassette Player Deck (Left side) ── */}
        <div className="flex flex-col items-center w-full lg:w-auto">
          <TiltWrapper
            className="flex-shrink-0 relative overflow-visible flex flex-col items-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Antenna Details */}
            <div className="absolute top-[-35px] left-1/2 -translate-x-1/2 w-[3px] h-[35px] bg-gradient-to-t from-pink via-pink/40 to-transparent z-0" />
            <motion.div 
              className="absolute top-[-48px] left-1/2 -translate-x-1/2 text-lg z-0 pointer-events-none"
              animate={isPlaying ? { scale: [1, 1.2, 1], y: [0, -2, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              ⭐
            </motion.div>

            {/* Player Body Container */}
            <div 
              className="w-[280px] h-[360px] p-6 rounded-3xl flex flex-col items-center justify-between relative select-none"
              style={{
                background: 'linear-gradient(145deg, #251446, #16082d)',
                border: '1px solid rgba(255, 105, 180, 0.28)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 25px rgba(0,0,0,0.4)',
              }}
            >
              {/* LCD Screen Display */}
              <div
                className="w-full h-14 rounded-xl flex flex-col justify-between p-2 overflow-hidden border"
                style={{
                  background: 'rgba(10, 10, 26, 0.92)',
                  borderColor: 'rgba(255, 105, 180, 0.25)',
                  boxShadow: 'inset 0 0 10px rgba(255, 20, 147, 0.2)'
                }}
              >
                <div className="flex items-center justify-between w-full text-[9px] font-mono text-pink/60 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
                    {isPlaying ? 'PLAYING' : 'PAUSED'}
                  </span>
                  <span>Track {currentSongIdx + 1}/{SONGS.length}</span>
                </div>

                {/* Scrolling title marquee */}
                <div className="w-full overflow-hidden relative h-5 my-0.5">
                  <motion.div
                    className="whitespace-nowrap text-xs font-mono text-gold font-bold absolute"
                    animate={{ x: [260, -280] }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: 'linear'
                    }}
                    key={currentSongIdx}
                  >
                    {currentSong.title} — {currentSong.artist}
                  </motion.div>
                </div>

                {/* Glowing audio visualizer bars */}
                <div className="flex items-end justify-between h-3 px-1 w-full overflow-hidden">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[5px] bg-pink/80 rounded-t-[1px]"
                      animate={isPlaying ? {
                        height: [3, 11, 4, 10, 6, 12, 3][(i + currentSongIdx) % 7]
                      } : {
                        height: 2
                      }}
                      transition={isPlaying ? {
                        repeat: Infinity,
                        duration: 0.65 + (i * 0.04),
                        ease: 'easeInOut'
                      } : {
                        duration: 0.3
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Rotating Cassette Window */}
              <div className="w-full h-[110px] bg-night-900/90 rounded-2xl border border-pink/15 p-3.5 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                <div className="w-full h-8 bg-gradient-to-r from-pink/20 via-magenta/10 to-orchid/20 rounded-lg border border-pink/15 flex items-center justify-between px-3 text-[9px] font-mono text-blush/60">
                  <span>MEMOREX</span>
                  <span className="flex items-center gap-1 text-[8px]">
                    <span className={`w-1 h-1 rounded-full bg-pink ${isPlaying ? 'animate-pulse' : ''}`} />
                    90 MIN
                  </span>
                  <span>STEREO</span>
                </div>
                
                {/* Reels */}
                <div className="flex items-center justify-center gap-12 mt-1 relative z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full border-2 border-dashed border-pink/40 flex items-center justify-center bg-night-800 shadow-md"
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-night-900 border border-pink/25 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="w-10 h-10 rounded-full border-2 border-dashed border-pink/40 flex items-center justify-center bg-night-800 shadow-md"
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-night-900 border border-pink/25 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2.5 w-full mt-1.5 z-10 px-1">
                <span className="text-[10px] font-mono text-pink/60 font-semibold">VOL</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-pink/20 rounded-full appearance-none cursor-pointer accent-pink hover:accent-magenta transition-all duration-300"
                  style={{
                    outline: 'none',
                  }}
                />
                <span className="text-[10px] font-mono text-blush/60 w-8 text-right">{Math.round(volume * 100)}%</span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between w-full px-1 gap-4">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handlePrevSong}
                    className="w-8 h-8 rounded-full border border-pink/25 bg-night-900/60 text-blush hover:text-white hover:border-pink/60 cursor-pointer flex items-center justify-center transition-all duration-300 shadow-sm text-sm"
                    title="Previous Song"
                  >
                    ⏮
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-11 h-11 rounded-full border border-pink/40 text-white cursor-pointer flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(255,20,147,0.25)] text-lg"
                    style={{
                      background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
                    }}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <button
                    onClick={handleNextSong}
                    className="w-8 h-8 rounded-full border border-pink/25 bg-night-900/60 text-blush hover:text-white hover:border-pink/60 cursor-pointer flex items-center justify-center transition-all duration-300 shadow-sm text-sm"
                    title="Next Song"
                  >
                    ⏭
                  </button>
                </div>

                {/* Dial Notch */}
                <div className="flex flex-col items-center">
                  <motion.div
                    onClick={handleNextSong}
                    animate={{ rotate: dialRotation }}
                    transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-2 border-white/10 shadow-[0_0_15px_rgba(255,20,147,0.2)] hover:shadow-[0_0_25px_rgba(255,20,147,0.5)] transition-shadow duration-300 relative"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #ff69b4, #ff1493)'
                    }}
                    title="Click to tune channels!"
                  >
                    <div className="w-1.5 h-3 bg-white/80 rounded-full absolute top-1.5 left-1/2 -translate-x-1/2" />
                    <div className="w-2.5 h-2.5 rounded-full bg-night-900/50" />
                  </motion.div>
                  <span className="text-[8px] font-mono text-pink/40 mt-1.5 uppercase tracking-widest">TUNE</span>
                </div>
              </div>
            </div>
          </TiltWrapper>

          {/* ── Interactive Track Selection List ── */}
          <motion.div
            className="glass w-[280px] p-4 mt-6 border border-pink/20 relative z-10"
            style={{ background: 'rgba(20, 10, 36, 0.65)' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[10px] font-mono tracking-widest text-pink uppercase mb-3 text-center font-bold">
              ✦ Insert Custom Cassette ✦
            </p>
            <div className="space-y-2">
              {SONGS.map((song, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSongIdx(i)
                    setIsPlaying(true)
                    if (audioRef.current) {
                      setTimeout(() => {
                        audioRef.current.play().catch(e => console.log(e))
                      }, 50)
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all duration-300 border cursor-pointer ${
                    currentSongIdx === i 
                      ? 'bg-pink/15 border-pink/45 text-white shadow-[0_0_12px_rgba(255,105,180,0.18)]' 
                      : 'bg-night-900/50 border-transparent text-blush/70 hover:bg-night-900/80 hover:text-white'
                  }`}
                >
                  <div className="overflow-hidden pr-2">
                    <p className="text-[11px] font-semibold truncate leading-tight">{song.title}</p>
                    <p className="text-[9px] font-mono text-blush/40 leading-none mt-1">{song.artist}</p>
                  </div>
                  <span className="text-xs flex-shrink-0 text-pink">
                    {currentSongIdx === i && isPlaying ? '⏸' : '▶'}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Spotify Playlist Embed (Right Side Card with blurred background) ── */}
        <TiltWrapper
          className="w-full max-w-md lg:mt-0 mt-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="glass p-5 relative overflow-hidden flex flex-col"
            style={{
              border: '1px solid rgba(255,105,180,0.35)',
              boxShadow: '0 20px 45px rgba(255, 20, 147, 0.22), inset 0 0 20px rgba(255, 105, 180, 0.15)',
              borderRadius: '24px'
            }}
          >
            {/* Blurred Cover Image background with fallback */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
              <img 
                src="/photos/playlist-cover.jpg" 
                alt="Playlist Cover" 
                className="w-full h-full object-cover filter blur-2xl opacity-60 scale-110"
                onError={(e) => {
                  e.target.style.display = 'none'
                  const bg = e.target.nextSibling
                  if (bg) bg.style.display = 'block'
                }}
              />
              <div 
                style={{ 
                  display: 'none', 
                  background: 'linear-gradient(135deg, rgba(255, 20, 147, 0.18), rgba(255, 105, 180, 0.12))',
                  position: 'absolute',
                  inset: 0
                }} 
              />
              <div className="absolute inset-0 bg-night-900/30 backdrop-blur-md z-0" />
            </div>

            {/* Playlist Iframe embed */}
            <div className="relative z-10 w-full">
              <iframe
                style={{ borderRadius: '18px', border: '1px solid rgba(255,105,180,0.15)', boxShadow: '0 20px 45px rgba(0,0,0,0.4)', background: 'transparent' }}
                src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?theme=0`}
                width="100%"
                height="360"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Our Spotify Playlist"
              />
            </div>
            
            <p className="text-[9px] font-mono text-blush/40 text-center mt-4 uppercase tracking-widest leading-normal relative z-10">
              Note: Playlist matches your Spotify tracks. Tune the cassette tape deck on the left to play matching audio tracks directly!
            </p>
          </div>
        </TiltWrapper>
      </div>
    </section>
  )
}
