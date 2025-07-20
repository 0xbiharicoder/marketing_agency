'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import UpwardScroll from '../components/UpwardScroll'

export default function Home() {
  const [counts, setCounts] = useState({
    projects: 0,
    satisfaction: 0,
    support: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            startAnimation()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const startAnimation = () => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    const projectsTarget = 500
    const satisfactionTarget = 98
    const supportTarget = 24

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      
      const progress = currentStep / steps
      
      setCounts({
        projects: Math.floor(projectsTarget * progress),
        satisfaction: Math.floor(satisfactionTarget * progress),
        support: Math.floor(supportTarget * progress)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCounts({
          projects: projectsTarget,
          satisfaction: satisfactionTarget,
          support: supportTarget
        })
      }
    }, stepDuration)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center pt-16 lg:pt-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-royal-200 bg-opacity-30 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gray-50 bg-opacity-30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-royal-100 bg-opacity-30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 bg-gray-50 bg-opacity-20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <UpwardScroll className="text-center text-black px-4 relative z-10" speed={0.8} offset={50}>
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-black">Digital Agency</span>
            <span className="block text-gray-700 text-4xl lg:text-5xl mt-2">We Build Digital Dreams</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Transform your brand with cutting-edge web development, mobile apps, and digital marketing solutions that drive phenomenal results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gray-50 bg-opacity-40 hover:bg-royal-50 hover:bg-opacity-40 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              View Our Work
            </button>
            <button className="bg-royal-200 bg-opacity-40 hover:bg-royal-300 hover:bg-opacity-40 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 border-2 border-royal-300 border-opacity-40 hover:border-royal-400 hover:border-opacity-40 shadow-lg hover:shadow-xl">
              Get Free Quote
            </button>
          </div>
          
          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center transform transition-all duration-500 hover:scale-105 aesthetic-card p-6">
              <div className="text-4xl font-bold text-black mb-2">
                {counts.projects}+
              </div>
              <div className="text-gray-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center transform transition-all duration-500 hover:scale-105 aesthetic-card p-6">
              <div className="text-4xl font-bold text-black mb-2">
                {counts.satisfaction}%
              </div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
            <div className="text-center transform transition-all duration-500 hover:scale-105 aesthetic-card p-6">
              <div className="text-4xl font-bold text-black mb-2">
                {counts.support}/7
              </div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </UpwardScroll>
      </main>
      
      {/* Services Section */}
      <UpwardScroll speed={0.6} offset={100}>
        <Services />
      </UpwardScroll>
      
      {/* Portfolio Section */}
      <UpwardScroll speed={0.7} offset={150}>
        <Portfolio />
      </UpwardScroll>
    </>
  )
} 