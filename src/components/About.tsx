export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient">Our Agency</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We are a passionate team of digital experts dedicated to helping businesses succeed in the digital age. 
              With years of experience in web development, mobile apps, and digital marketing, we deliver solutions 
              that not only look great but also drive real business results.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our approach combines cutting-edge technology with creative design, ensuring that every project we 
              undertake is both innovative and effective. We believe in building long-term partnerships with our 
              clients, understanding their unique needs and goals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-royal-50 rounded-lg">
                <div className="text-3xl font-bold text-royal-600 mb-2">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-cream-50 rounded-lg">
                <div className="text-3xl font-bold text-royal-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
            </div>

            <button className="btn-primary">
              Learn More About Us
            </button>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-royal-400 to-royal-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-cream-200 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Proven track record with 500+ successful projects</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-cream-200 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Expert team with diverse skill sets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-cream-200 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Modern technology stack and best practices</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-cream-200 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Dedicated support and maintenance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 