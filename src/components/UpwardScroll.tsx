'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'

interface UpwardScrollProps {
  children: ReactNode
  className?: string
  speed?: number
  offset?: number
}

export default function UpwardScroll({ 
  children, 
  className = "", 
  speed = 0.5,
  offset = 100
}: UpwardScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState(`translateY(${offset}px)`)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how much the element has moved into view
      const elementTop = rect.top
      const elementHeight = rect.height
      
      // If element is above viewport, apply full offset
      if (elementTop > windowHeight) {
        setTransform(`translateY(${offset}px)`)
        return
      }
      
      // If element is below viewport, no offset
      if (elementTop + elementHeight < 0) {
        setTransform('translateY(0px)')
        return
      }
      
      // Calculate progress based on how much of the element is visible
      const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
      const translateY = offset * (1 - progress * speed)
      
      setTransform(`translateY(${translateY}px)`)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset, speed])

  return (
    <div 
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{ 
        transform: transform
      }}
    >
      {children}
    </div>
  )
} 