import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  SCRATCH TO REVEAL CONTAINER (CANVAS)
// ═══════════════════════════════════════════════════════════════════════
export default function ScratchReveal({
  width = 300,
  height = 180,
  scratchPercentage = 60,
  onComplete,
  children
}) {
  const canvasRef = useRef(null)
  const [isScratching, setIsScratching] = useState(false)
  const [scratched, setScratched] = useState(false)
  const [fadeCanvas, setFadeCanvas] = useState(false)
  const particles = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set pixel ratio for crisp text
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Draw solid pink-magenta gradient background for the cover
    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, '#ff1493')
    grad.addColorStop(0.5, '#ff69b4')
    grad.addColorStop(1, '#da70d6')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // Draw decorative gold star elements / borders
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.lineWidth = 2
    ctx.strokeRect(5, 5, width - 10, height - 10)

    // Draw "Scratch Here 💕" text
    ctx.fillStyle = '#ffffff'
    ctx.font = "bold 16px 'Inter', sans-serif"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(0,0,0,0.3)'
    ctx.shadowBlur = 4
    ctx.fillText('Scratch Here 💕', width / 2, height / 2 - 10)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
    ctx.font = "11px 'Inter', sans-serif"
    ctx.shadowBlur = 0
    ctx.fillText('to reveal a secret note', width / 2, height / 2 + 15)

    // Render loop for particle trails
    let animationFrameId
    const render = () => {
      // Clear particles but we only update and draw trails on canvas
      // To prevent clearing the scratched masks, we must not use clearRect on the whole canvas!
      // Instead, we draw individual particles with "source-over" global composite operation,
      // draw them in their own frame on a separate helper or draw them on the canvas directly
      // before they fade. Wait, drawing trails directly on the scratch layer is awesome because they are drawn on top!
      // But they fade out. To draw them cleanly without affecting the mask, we can just draw them.
      // Wait, since particles fade, drawing them directly on canvas will leave permanent trails unless we redraw the mask.
      // Redrawing the scratch mask is easy if we keep track of scratch points!
      // But actually, we don't even need canvas-level particles if we render simple absolute React divs or do basic canvas draw.
      // Wait, what if we draw small golden stars on the canvas under the "source-over" mode? When scratch occurs,
      // it just removes the pixels (with "destination-out" mode). That is incredibly easy!
      // Let's create an elegant sparkle particle system that draws sparkles under "source-over", then switches back to "destination-out" for erasing!
      // Yes! In canvas:
      // 1. Draw scratch path (destination-out)
      // 2. Draw sparkles (source-over)
      // Wait, if we draw source-over sparkles, they will be drawn on the cover layer, which is perfect! They look like gold sparkles on the scratch card, and then they disappear when we redraw, but wait: since we don't clearRect the scratch layer, anything we draw stays permanently!
      // So to make particles fade, we can render simple DOM-level sparkles trailing the mouse! That is 100% reliable, requires zero canvas state rebuild, and looks incredibly premium!
      // Let's do DOM-based React sparkles for the trails! This is super clean and works perfectly.
      
      // Let's sample scratch progress
      checkScratchPercentage()
      
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [width, height])

  // Helper to get coordinates
  const getCoordinates = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    
    // Support mouse & touch events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  // Draw scratch stroke
  const scratch = (x, y) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()

    // Push DOM sparkles
    if (Math.random() < 0.4) {
      const id = Math.random()
      particles.current.push({
        id,
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        scale: 0.5 + Math.random() * 0.8,
        color: ['#ffd97d', '#ffb6c1', '#ffffff', '#ff69b4'][Math.floor(Math.random() * 4)]
      })
      // Trigger update to force-render sparkles
      setSparkleTrigger(prev => prev + 1)

      // Delete particle after animation
      setTimeout(() => {
        particles.current = particles.current.filter(p => p.id !== id)
      }, 800)
    }
  }

  const [sparkleTrigger, setSparkleTrigger] = useState(0)

  const handleStart = (e) => {
    setIsScratching(true)
    const coords = getCoordinates(e)
    if (coords) scratch(coords.x, coords.y)
  }

  const handleMove = (e) => {
    if (!isScratching || scratched) return
    const coords = getCoordinates(e)
    if (coords) scratch(coords.x, coords.y)
  }

  const handleEnd = () => {
    setIsScratching(false)
  }

  // Check how much of the cover layer has been cleared
  const checkScratchPercentage = () => {
    if (scratched) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Sample pixels in a grid to avoid performance lag from reading entire array
    const step = 10
    let transparentCount = 0
    let totalSamples = 0

    const dpr = window.devicePixelRatio || 1
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imgData.data

    // Step through the pixel data grid
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4
        const alpha = data[index + 3]
        if (alpha === 0) {
          transparentCount++
        }
        totalSamples++
      }
    }

    const currentPercentage = (transparentCount / totalSamples) * 100

    if (currentPercentage >= scratchPercentage) {
      setScratched(true)
      setFadeCanvas(true)
      if (onComplete) onComplete()
    }
  }

  return (
    <div 
      className="relative flex flex-col items-center justify-center select-none"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* ── Revealed content sits underneath the Canvas ── */}
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex items-center justify-center p-4 bg-night-900/60 border border-pink/10">
        {children}
      </div>

      {/* ── The Scratch Canvas Overlay ── */}
      <AnimatePresence>
        {!fadeCanvas && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            className="absolute inset-0 z-20 cursor-crosshair rounded-2xl"
          />
        )}
      </AnimatePresence>

      {/* Sparkle Particle HUD */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {particles.current.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, y: p.y, x: p.x }}
            animate={{ opacity: 0, scale: 1.5, y: p.y - 30, x: p.x + (Math.random() - 0.5) * 20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              left: 0,
              top: 0
            }}
          />
        ))}
      </div>
    </div>
  )
}
