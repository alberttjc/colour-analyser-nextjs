"use client"

import { useEffect, useState } from "react"

export default function Confetti() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      color: string
      size: number
      speedX: number
      speedY: number
      rotation: number
    }>
  >([])

  useEffect(() => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"]
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 4,
      speedY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
    }))

    setParticles(newParticles)

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            rotation: particle.rotation + 5,
          }))
          .filter((particle) => particle.y < window.innerHeight + 20),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}
