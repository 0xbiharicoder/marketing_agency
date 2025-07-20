'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleProjects(prev => Array.from(new Set([...prev, index])))
          }
        })
      },
      { threshold: 0.3 }
    )

    const projects = document.querySelectorAll('.project-card')
    projects.forEach((project, index) => {
      project.setAttribute('data-index', index.toString())
      observer.observe(project)
    })

    return () => observer.disconnect()
  }, [activeFilter])

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "web",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      description: "Modern e-commerce platform with advanced features and seamless user experience.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      description: "Secure and intuitive mobile banking application for iOS and Android.",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"]
    },
    {
      id: 3,
      title: "Corporate Website",
      category: "web",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description: "Professional corporate website with modern design and excellent performance.",
      technologies: ["Next.js", "Tailwind CSS", "Vercel", "Framer Motion"]
    },
    {
      id: 4,
      title: "Fitness Tracking App",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      description: "Comprehensive fitness tracking application with social features.",
      technologies: ["Flutter", "Dart", "Firebase", "Google Fit API"]
    },
    {
      id: 5,
      title: "Digital Marketing Campaign",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&h=400&fit=crop",
      description: "Successful digital marketing campaign that increased conversions by 300%.",
      technologies: ["Google Ads", "Facebook Ads", "Analytics", "A/B Testing"]
    },
    {
      id: 6,
      title: "Brand Identity Design",
      category: "branding",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      description: "Complete brand identity redesign for a tech startup.",
      technologies: ["Adobe Creative Suite", "Brand Guidelines", "Logo Design", "Marketing Materials"]
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'marketing', label: 'Digital Marketing' },
    { id: 'branding', label: 'Branding' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our latest projects and see how we&apos;ve helped businesses achieve their digital goals.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-royal-200 bg-opacity-40 text-black shadow-lg'
                  : 'bg-gray-50 bg-opacity-40 text-black border-2 border-royal-200 border-opacity-40 hover:bg-royal-50 hover:bg-opacity-40'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card aesthetic-card overflow-hidden ${
                visibleProjects.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-royal-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-gray-50 text-black px-4 py-2 rounded-lg font-medium transform hover:scale-105">
                    View Project
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-royal-100 bg-opacity-40 text-black text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-royal-200 bg-opacity-40 hover:bg-royal-300 hover:bg-opacity-40 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-gray-50 bg-opacity-40 hover:bg-royal-50 hover:bg-opacity-40 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 border-2 border-royal-200 border-opacity-40 shadow-lg hover:shadow-xl transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
} 