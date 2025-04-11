import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Film, Play, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { PORTFOLIO_ITEMS } from '@/lib/constants';

// Portfolio categories for filtering
const CATEGORIES = [
  "All",
  "Commercial",
  "Documentary",
  "Event",
  "Short Film",
  "Music Video", 
  "Visual Effects",
  "Color Grading"
];

// Portfolio item enhanced from constants with additional details
const ENHANCED_PORTFOLIO = [
  ...PORTFOLIO_ITEMS,
  {
    title: 'Global Tech Summit Highlights',
    categories: 'Event • Motion Graphics • Transitions',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    title: 'Sunrise - Music Video',
    categories: 'Music Video • Visual Effects • Color Grading',
    image: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    title: 'The Journey Within - Short Film',
    categories: 'Short Film • Editing • Sound Design',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    title: 'Urban Fashion Collection',
    categories: 'Commercial • Color Grading • Music Sync',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    title: 'Wilderness Explorer Series',
    categories: 'Documentary • Storytelling • Footage Restoration',
    image: 'https://images.unsplash.com/photo-1547731030-cd970189a7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  }
];

// Testimonials from clients
const TESTIMONIALS = [
  {
    quote: "CineWave transformed our raw footage into a compelling brand story. The color grading and pacing of the final edit exceeded our expectations.",
    author: "Sarah Johnson",
    company: "Lumina Brands",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    quote: "Working with CineWave on our documentary was a game-changer. Their ability to craft a narrative through thoughtful editing brought our vision to life.",
    author: "Michael Chen",
    company: "Horizon Productions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    quote: "The team at CineWave Studios delivered our wedding video with such attention to emotional detail. Every time we watch it, we relive the day perfectly.",
    author: "Emily & David Williams",
    company: "Wedding Clients",
    image: "https://images.unsplash.com/photo-1488116344829-d4c98d266538?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter portfolio items based on selected category
  const filteredPortfolio = activeCategory === "All" 
    ? ENHANCED_PORTFOLIO 
    : ENHANCED_PORTFOLIO.filter(item => 
        item.categories.includes(activeCategory)
      );

  return (
    <Layout>
      <section className="pt-28 pb-20 bg-gradient-to-b from-cine-black to-cine-gray-700 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
            <p className="text-cine-gray-300 text-lg max-w-3xl mx-auto">
              Explore our diverse collection of video editing projects spanning commercials, documentaries, 
              events, short films, and more. Each piece demonstrates our commitment to cinematic excellence.
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="mb-10 overflow-x-auto">
            <div className="flex space-x-2 py-2 min-w-max">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-cine-gold text-cine-black'
                      : 'bg-cine-gray-800 text-cine-gray-300 hover:bg-cine-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPortfolio.map((item, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cine-black via-transparent to-transparent z-10"></div>
                
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-cine-gold flex items-center justify-center">
                    <Play className="w-8 h-8 text-cine-black" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 z-30">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-cine-gold text-sm">{item.categories}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* No results message */}
          {filteredPortfolio.length === 0 && (
            <div className="text-center py-20">
              <Film className="w-16 h-16 text-cine-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-cine-gray-300">
                We don't have any projects in the {activeCategory} category yet.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 px-6 py-2 bg-cine-gold text-cine-black rounded-md font-medium hover:bg-white transition-colors"
              >
                View All Projects
              </button>
            </div>
          )}
          
          {/* Testimonials Section */}
          <div className="my-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
              <div className="w-20 h-1 bg-cine-gold mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="bg-cine-gray-800/50 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-cine-gold text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-cine-gray-300 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="glassmorphism rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Your Next Video Project?</h2>
                <p className="text-cine-gray-300 mb-6 md:mb-0">
                  Let's collaborate to bring your vision to life with our expert editing services.
                </p>
              </div>
              <div>
                <Link href="/service-customizer" className="flex items-center px-6 py-3 bg-cine-gold text-cine-black rounded-md font-medium hover:bg-white transition-colors">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}