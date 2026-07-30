import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const containerRef = useRef(null)
  const lastSpawn = useRef(0)

  useEffect(() => {
    // Disable on touch devices (mobile)
    if ('ontouchstart' in window) return

    const handleMove = (e) => {
      const now = Date.now()
      if (now - lastSpawn.current < 140) return
      lastSpawn.current = now

      const heart = document.createElement('div')
      heart.className = 'heart-cursor'
      heart.textContent = Math.random() > 0.35 ? '❤️' : '✨'
      heart.style.left = e.clientX + 'px'
      heart.style.top = e.clientY + 'px'
      heart.style.fontSize = (0.7 + Math.random() * 0.6) + 'rem'
      if (containerRef.current) {
        containerRef.current.appendChild(heart)
        setTimeout(() => heart.remove(), 1200)
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />
}
