export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            We Build
            <span className="block text-cream-200">Digital Dreams</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-royal-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your brand with cutting-edge web development, mobile apps, and digital marketing solutions that drive results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-secondary text-lg px-8 py-4">
              View Our Work
            </button>
            <button className="bg-white text-royal-600 hover:bg-cream-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 text-lg">
              Get Free Quote
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-royal-100">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-royal-100">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-royal-100">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
} 