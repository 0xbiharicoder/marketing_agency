'use client'

import { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Campaigns() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCampaigns, setVisibleCampaigns] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCampaigns(prev => Array.from(new Set([...prev, index])))
          }
        })
      },
      { threshold: 0.3 }
    )

    const campaigns = document.querySelectorAll('.campaign-card')
    campaigns.forEach((campaign, index) => {
      campaign.setAttribute('data-index', index.toString())
      observer.observe(campaign)
    })

    return () => observer.disconnect()
  }, [activeFilter])

  const campaigns = [
    {
      id: 1,
      title: "Summer Sale Campaign",
      category: "ecommerce",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      description: "A comprehensive digital marketing campaign that increased sales by 250% during the summer season.",
      results: {
        reach: "2.5M",
        engagement: "15.2%",
        conversions: "8.7%",
        revenue: "$450K"
      },
      platforms: ["Facebook", "Instagram", "Google Ads", "Email"]
    },
    {
      id: 2,
      title: "Brand Awareness Launch",
      category: "branding",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      description: "Strategic brand launch campaign that established market presence and increased brand recognition by 300%.",
      results: {
        reach: "5.2M",
        engagement: "22.8%",
        conversions: "12.3%",
        revenue: "$780K"
      },
      platforms: ["LinkedIn", "Twitter", "YouTube", "PR"]
    },
    {
      id: 3,
      title: "Mobile App Launch",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      description: "Successful mobile app launch campaign that achieved 100K downloads in the first month.",
      results: {
        reach: "3.8M",
        engagement: "18.5%",
        conversions: "14.2%",
        revenue: "$320K"
      },
      platforms: ["App Store", "Google Play", "Social Media", "Influencers"]
    },
    {
      id: 4,
      title: "Holiday Shopping Campaign",
      category: "ecommerce",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
      description: "Multi-channel holiday campaign that drove record-breaking sales during the festive season.",
      results: {
        reach: "4.1M",
        engagement: "19.7%",
        conversions: "11.8%",
        revenue: "$890K"
      },
      platforms: ["Facebook", "Instagram", "TikTok", "Email", "SMS"]
    },
    {
      id: 5,
      title: "B2B Lead Generation",
      category: "b2b",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
      description: "Targeted B2B campaign that generated 500+ qualified leads for enterprise software solutions.",
      results: {
        reach: "1.2M",
        engagement: "8.9%",
        conversions: "6.4%",
        revenue: "$1.2M"
      },
      platforms: ["LinkedIn", "Google Ads", "Email", "Webinars"]
    },
    {
      id: 6,
      title: "Social Media Influencer Campaign",
      category: "social",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop",
      description: "Collaborative influencer campaign that boosted brand engagement and reached new audiences.",
      results: {
        reach: "6.7M",
        engagement: "28.3%",
        conversions: "9.1%",
        revenue: "$540K"
      },
      platforms: ["Instagram", "TikTok", "YouTube", "Twitter"]
    }
  ]

  const filters = [
    { id: 'all', label: 'All Campaigns' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'branding', label: 'Branding' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'b2b', label: 'B2B' },
    { id: 'social', label: 'Social Media' }
  ]

  const filteredCampaigns = activeFilter === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.category === activeFilter)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
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

          <div className="container-custom relative z-10">
            <div className="text-center">
              <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
                Our Campaigns
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Discover our successful digital marketing campaigns that have delivered exceptional results for our clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-royal-200 bg-opacity-40 hover:bg-royal-300 hover:bg-opacity-40 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Your Campaign
                </button>
                <button className="bg-gray-50 bg-opacity-40 hover:bg-royal-50 hover:bg-opacity-40 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 border-2 border-royal-200 border-opacity-40 shadow-lg hover:shadow-xl">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Campaigns Section */}
        <section className="section-padding">
          <div className="container-custom">
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

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCampaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className={`campaign-card aesthetic-card overflow-hidden ${
                    visibleCampaigns.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {/* Campaign Image */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-royal-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-gray-50 text-black px-4 py-2 rounded-lg font-medium transform hover:scale-105">
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Campaign Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-black mb-3">{campaign.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{campaign.description}</p>
                    
                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-royal-50 bg-opacity-40 rounded-lg">
                        <div className="text-2xl font-bold text-black">{campaign.results.reach}</div>
                        <div className="text-sm text-gray-600">Reach</div>
                      </div>
                      <div className="text-center p-4 bg-royal-50 bg-opacity-40 rounded-lg">
                        <div className="text-2xl font-bold text-black">{campaign.results.engagement}</div>
                        <div className="text-sm text-gray-600">Engagement</div>
                      </div>
                      <div className="text-center p-4 bg-royal-50 bg-opacity-40 rounded-lg">
                        <div className="text-2xl font-bold text-black">{campaign.results.conversions}</div>
                        <div className="text-sm text-gray-600">Conversions</div>
                      </div>
                      <div className="text-center p-4 bg-royal-50 bg-opacity-40 rounded-lg">
                        <div className="text-2xl font-bold text-black">{campaign.results.revenue}</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                    </div>

                    {/* Platforms */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-black mb-3">Platforms Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {campaign.platforms.map((platform, platformIndex) => (
                          <span
                            key={platformIndex}
                            className="px-3 py-1 bg-royal-100 bg-opacity-40 text-black text-sm rounded-full font-medium"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-royal-200 bg-opacity-40 hover:bg-royal-300 hover:bg-opacity-40 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      View Case Study
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <button className="bg-gray-50 bg-opacity-40 hover:bg-royal-50 hover:bg-opacity-40 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 border-2 border-royal-200 border-opacity-40 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Your Campaign
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 