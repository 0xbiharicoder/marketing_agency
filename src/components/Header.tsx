'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-50 bg-opacity-40 backdrop-blur-md shadow-lg border-b border-royal-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl lg:text-3xl font-bold text-black hover:text-gray-700 transition-colors duration-200">
              DigitalAgency
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Our Work Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('work')}
                className="text-black hover:text-gray-700 font-medium transition-colors duration-200 flex items-center"
              >
                Our Work
                <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'work' ? 'rotate-180' : ''
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'work' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-50 bg-opacity-40 rounded-lg shadow-xl border border-royal-200 py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black">Web Development</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black">Mobile Apps</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black">Branding</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black">Digital Marketing</a>
                </div>
              )}
            </div>

            {/* Our Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('services')}
                className="text-black hover:text-gray-700 font-medium transition-colors duration-200 flex items-center"
              >
                Our Services
                <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'services' ? 'rotate-180' : ''
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-50 bg-opacity-40 rounded-lg shadow-xl border border-royal-200 py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black">Website Design</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black">E-commerce</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black">SEO & Analytics</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black">Social Media</a>
                </div>
              )}
            </div>
            
            <a href="/campaigns" className="text-black hover:text-gray-700 font-medium transition-colors duration-200">
              Our Campaigns
            </a>
            <a href="#" className="text-black hover:text-gray-700 font-medium transition-colors duration-200">
              About Us
            </a>
            <a href="#" className="text-black hover:text-gray-700 font-medium transition-colors duration-200">
              Get In Touch
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button className="bg-royal-200 bg-opacity-40 hover:bg-royal-300 hover:bg-opacity-40 text-black px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black hover:text-gray-700 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-50 bg-opacity-40 border-t border-royal-200 py-4">
            <div className="space-y-2">
              <div className="px-4 py-2">
                <button
                  onClick={() => toggleDropdown('mobile-work')}
                  className="flex items-center justify-between w-full text-left text-black hover:text-gray-700 font-medium"
                >
                  Our Work
                  <svg className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'mobile-work' ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'mobile-work' && (
                  <div className="mt-2 ml-4 space-y-1">
                    <a href="#" className="block py-1 text-sm text-gray-700 hover:text-black">Web Development</a>
                    <a href="#" className="block py-1 text-sm text-gray-700 hover:text-black">Mobile Apps</a>
                    <a href="#" className="block py-1 text-sm text-gray-700 hover:text-black">Branding</a>
                    <a href="#" className="block py-1 text-sm text-gray-700 hover:text-black">Digital Marketing</a>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-2">
                <button
                  onClick={() => toggleDropdown('mobile-services')}
                  className="flex items-center justify-between w-full text-left text-black hover:text-gray-700 font-medium"
                >
                  Our Services
                  <svg className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'mobile-services' ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'mobile-services' && (
                  <div className="mt-2 ml-4 space-y-1">
                    <a href="#" className="block py-1 text-sm text-gray-700 hover:text-black">Website Design</a>
                    <a href="#" className="block py-1 text-sm text-gray-700 hover:text-black">E-commerce</a>
                    <a href="#" className="block py-1 text-sm text-gray-700 hover:text-black">SEO & Analytics</a>
                    <a href="#" className="block py-1 text-sm text-gray-700 hover:text-black">Social Media</a>
                  </div>
                )}
              </div>
              
              <div className="pt-2 border-t border-royal-200">
                <a href="/campaigns" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black rounded">Our Campaigns</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-100 hover:text-black rounded">About Us</a>
                <button className="w-full mt-3 bg-royal-200 bg-opacity-40 hover:bg-royal-300 hover:bg-opacity-40 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Get Free Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 