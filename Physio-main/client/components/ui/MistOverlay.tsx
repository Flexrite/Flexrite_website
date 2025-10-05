"use client"

import type React from "react"

export default function MistOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `
        }}
      />
    </div>
  )
}