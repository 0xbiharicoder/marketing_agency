'use client'

import { useState, useEffect } from 'react'

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards(prev => Array.from(new Set([...prev, index])))
          }
        })
      },
      { threshold: 0.3 }
    )

    const cards = document.querySelectorAll('.service-card')
    cards.forEach((card, index) => {
      card.setAttribute('data-index', index.toString())
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      icon: (
        <svg className="w-12 h-12 text-royal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"]
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      icon: (
        <svg className="w-12 h-12 text-royal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: ["Native Development", "Cross-Platform", "App Store Optimization", "Push Notifications"]
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence.",
      icon: (
        <svg className="w-12 h-12 text-royal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      features: ["SEO & SEM", "Social Media", "Content Marketing", "Analytics"]
    },
    {
      title: "Branding",
      description: "Complete brand identity design including logos, guidelines, and marketing materials.",
      icon: (
        <svg className="w-12 h-12 text-royal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Visual Identity"]
    },
    {
      title: "E-commerce",
      description: "Full-featured online stores with secure payment processing and inventory management.",
      icon: (
        <svg className="w-12 h-12 text-royal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      features: ["Payment Integration", "Inventory Management", "Order Processing", "Customer Support"]
    },
    {
      title: "Consulting",
      description: "Strategic digital consulting to help you make informed technology decisions.",
      icon: (
        <svg className="w-12 h-12 text-royal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: ["Technology Audit", "Strategy Planning", "Performance Optimization", "Security Review"]
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive digital solutions to help your business thrive in the modern digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card aesthetic-card p-8 ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-royal-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full bg-royal-200 bg-opacity-40 hover:bg-royal-300 hover:bg-opacity-40 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gray-50 bg-opacity-40 hover:bg-royal-50 hover:bg-opacity-40 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 border-2 border-royal-200 border-opacity-40 shadow-lg hover:shadow-xl transform hover:scale-105">
            View All Services
          </button>
        </div>
      </div>
    </section>
  )
} 