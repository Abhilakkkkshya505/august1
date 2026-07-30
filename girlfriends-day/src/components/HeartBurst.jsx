import { useCallback } from 'react'

// ═══════════════════════════════════════════════════════════════════════
//  Heart Burst — click anywhere that calls burst() to trigger a
//  confetti-style explosion of hearts and sparkles.
// ═══════════════════════════════════════════════════════════════════════

export default function HeartBurst() {
  // Just registers the CSS — actual bursting is done via the hook
  return null
}

export function useHeartBurst() {
  return useCallback((e) => {
    const emojis = ['❤️', '✨', '🌟', '💕', '🩷', '⭐', '💖', '🌸']
    const count = 28
    const clientX = e?.clientX ?? window.innerWidth / 2
    const clientY = e?.clientY ?? window.innerHeight / 2

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.className = 'burst-particle'
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      el.style.left = clientX + 'px'
      el.style.top = clientY + 'px'
      el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem'

      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5
      const dist = 80 + Math.random() * 140
      el.style.setProperty('--x', Math.cos(angle) * dist + 'px')
      el.style.setProperty('--y', Math.sin(angle) * dist + 'px')
      el.style.animation = `burst ${1 + Math.random() * 0.6}s ease-out forwards`

      document.body.appendChild(el)
      setTimeout(() => el.remove(), 2000)
    }
  }, [])
}
