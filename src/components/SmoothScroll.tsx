'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export default function SmoothScroll({ 
  children, 
  className = "", 
  delay = 0, 
  threshold = 0.1,
  direction = 'up',
  distance = 100
}: SmoothScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal')
          }
        })
      },
      { 
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`
      case 'down':
        return `translateY(-${distance}px)`
      case 'left':
        return `translateX(${distance}px)`
      case 'right':
        return `translateX(-${distance}px)`
      default:
        return `translateY(${distance}px)`
    }
  }

  return (
    <div 
      ref={elementRef}
      className={`opacity-0 transition-all duration-1000 ease-out ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: getTransform()
      }}
    >
      {children}
    </div>
  )
}

// Add custom CSS for the animation
if (typeof document !== 'undefined') {
  const styleId = 'smooth-scroll-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      .animate-reveal {
        opacity: 1 !important;
        transform: translateY(0) translateX(0) !important;
      }
      
      /* Smooth scrolling for the entire page */
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar for better UX */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `
    document.head.appendChild(style)
  }
} 