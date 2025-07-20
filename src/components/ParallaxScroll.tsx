'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'

interface ParallaxScrollProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
  offset?: number
}

export default function ParallaxScroll({ 
  children, 
  className = "", 
  speed = 0.5,
  direction = 'up',
  offset = 0
}: ParallaxScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setScrollY(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getTransform = () => {
    if (!elementRef.current) return `translateY(0px)`
    
    const rect = elementRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    // Calculate how much the element has moved into view
    const elementTop = rect.top
    const elementHeight = rect.height
    
    // If element is above viewport, apply full offset
    if (elementTop > windowHeight) {
      return `translateY(${100 + offset}px)`
    }
    
    // If element is below viewport, no offset
    if (elementTop + elementHeight < 0) {
      return `translateY(0px)`
    }
    
    // Calculate progress based on how much of the element is visible
    const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
    
    const translateY = direction === 'up' 
      ? (100 + offset) * (1 - progress * speed)
      : -(100 + offset) * progress * speed
    
    return `translateY(${translateY}px)`
  }

  return (
    <div 
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{ 
        transform: getTransform()
      }}
    >
      {children}
    </div>
  )
} 