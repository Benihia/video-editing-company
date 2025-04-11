import React from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import { 
  Video, 
  Film, 
  PlayCircle, 
  ArrowRight, 
  ArrowDown, 
  Check 
} from 'lucide-react';
import { PORTFOLIO_ITEMS, SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-cine-black">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cine-black/70 via-cine-black/60 to-cine-black"></div>
          <img 
            src="https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80" 
            alt="Cinematic background" 
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 animate-fade-in">
          <div className="max-w-5xl text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              <span className="block">Elevate Your Story</span>
              <span className="block text-cine-gold">with CineWave Studios</span>
            </h1>
            <p className="text-xl md:text-2xl text-cine-gray-100 mb-10 max-w-2xl mx-auto">
              Premium video editing services crafted to transform your footage into cinematic masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/service-customizer">
                <a className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-cine-black bg-cine-gold hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cine-gold">
                  Customize Your Video
                  <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                </a>
              </Link>
              <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-cine-white border border-cine-white hover:bg-cine-white hover:bg-opacity-10 transition-all">
                View Our Work
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-cine-gold" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-cine-black to-cine-gray-700">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-xl text-cine-gray-300 max-w-3xl mx-auto">
              Tailored video editing solutions to elevate your visual storytelling
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={index} className="glassmorphism rounded-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-cine-gold mb-4">
                  {service.icon === 'VideoIcon' && <Video className="w-12 h-12" />}
                  {service.icon === 'FilmIcon' && <Film className="w-12 h-12" />}
                  {service.icon === 'PlayCircleIcon' && <PlayCircle className="w-12 h-12" />}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-cine-gray-300 mb-4">
                  {service.description}
                </p>
                <ul className="text-sm text-cine-gray-100 space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-cine-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/service-customizer" className="inline-flex items-center text-cine-gold hover:text-cine-white transition-colors">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/service-customizer">
              <a className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-cine-black bg-cine-gold hover:bg-opacity-90 transition-all transform hover:scale-105">
                Start Your Custom Project
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-cine-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-cine-gray-300 max-w-3xl mx-auto">
              A glimpse of our creative expertise and technical proficiency
            </p>
          </div>
          
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_ITEMS.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cine-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-cine-black bg-opacity-70 p-4 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-cine-gray-100 mb-3">{item.categories}</p>
                    <a href="#" className="inline-flex items-center text-cine-gold hover:text-cine-white text-sm transition-colors">
                      View Project
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-cine-white border border-cine-white hover:bg-cine-white hover:bg-opacity-10 transition-all">
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cine-gray-700 to-cine-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-cine-black"></div>
          <img 
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Film editing equipment" 
            className="object-cover w-full h-full" 
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Story?</h2>
            <p className="text-xl text-cine-gray-100 mb-10">
              Let's create something extraordinary together. Start with our custom video service builder and bring your vision to life.
            </p>
            <Link href="/service-customizer">
              <a className="inline-flex items-center justify-center px-8 py-4 text-xl font-medium rounded-md text-cine-black bg-cine-gold hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cine-gold">
                Start Your Project
                <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
