import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/logo';
import { Menu, X, Film, PlayCircle, Plus, User, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update active item based on current location
    if (location === '/') setActiveItem('/');
    else if (location.includes('service-customizer')) setActiveItem('/service-customizer');
    else if (location.includes('checkout')) setActiveItem('/checkout');
    else if (location.includes('admin')) setActiveItem('/admin');
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
      isScrolled 
        ? "py-2 bg-cine-black/80 backdrop-blur-md shadow-lg" 
        : "py-4 bg-transparent"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center">
            <div className="relative overflow-hidden mr-3">
              <Logo 
                className="text-cine-gold transform transition-all duration-500 group-hover:scale-110" 
                size={36}
              />
              <div className="absolute inset-0 bg-cine-gold/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cine-gold">CineWave</div>
              <div className="text-xs tracking-widest text-cine-gold/80 uppercase">Studios</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center">
            <div className="relative px-1 py-1 mr-4 bg-cine-gray-700/50 rounded-full backdrop-blur-sm">
              <div className="flex relative z-10">
                <Link href="/" className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  activeItem === '/' ? "text-cine-black" : "text-white hover:text-cine-gold"
                )}>
                  Home
                </Link>
                <Link href="/service-customizer" className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  activeItem === '/service-customizer' ? "text-cine-black" : "text-white hover:text-cine-gold"
                )}>
                  Services
                </Link>
                <Link href="/portfolio" className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  activeItem === '/portfolio' ? "text-cine-black" : "text-white hover:text-cine-gold"
                )}>
                  Portfolio
                </Link>
                <Link href="/about" className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  activeItem === '/about' ? "text-cine-black" : "text-white hover:text-cine-gold"
                )}>
                  About
                </Link>
              </div>
              
              {/* Animated background for active item */}
              <div className={cn(
                "absolute top-1 h-8 rounded-full bg-cine-gold transition-all duration-300 ease-out",
                activeItem === '/' ? "left-1 w-20" : 
                activeItem === '/service-customizer' ? "left-[5.25rem] w-24" : 
                activeItem === '/portfolio' ? "left-[10.25rem] w-24" : 
                activeItem === '/about' ? "left-[15.25rem] w-20" : ""
              )}></div>
            </div>
            
            <Link href="/service-customizer" className="flex items-center gap-1.5 px-5 py-2.5 text-cine-black bg-cine-gold rounded-full font-medium transition-all hover:bg-white hover:shadow-glow">
              <Plus size={16} />
              <span>Start a Project</span>
            </Link>
          </div>
          
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-cine-gray-700/50 backdrop-blur-sm transition-colors hover:bg-cine-gray-700"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute w-full transform transition-all duration-300 ease-in-out backdrop-blur-md",
        mobileMenuOpen 
          ? "translate-y-0 opacity-100 visible" 
          : "-translate-y-10 opacity-0 invisible"
      )}>
        <div className="p-4 space-y-1 bg-cine-black/90 border-t border-cine-gray-700/50">
          <Link href="/" className="flex items-center px-4 py-3 text-base font-medium text-white hover:text-cine-gold rounded-md">
            <PlayCircle className="w-5 h-5 mr-3 text-cine-gold" />
            <span>Home</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
          <Link href="/service-customizer" className="flex items-center px-4 py-3 text-base font-medium text-white hover:text-cine-gold rounded-md">
            <Film className="w-5 h-5 mr-3 text-cine-gold" />
            <span>Services</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
          <Link href="/portfolio" className="flex items-center px-4 py-3 text-base font-medium text-white hover:text-cine-gold rounded-md">
            <PlayCircle className="w-5 h-5 mr-3 text-cine-gold" />
            <span>Portfolio</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
          <Link href="/about" className="flex items-center px-4 py-3 text-base font-medium text-white hover:text-cine-gold rounded-md">
            <User className="w-5 h-5 mr-3 text-cine-gold" />
            <span>About</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
          <div className="pt-3 mt-3 border-t border-cine-gray-700/50">
            <Link href="/service-customizer" className="flex items-center justify-center gap-1.5 py-3 text-cine-black bg-cine-gold rounded-md font-medium">
              <Plus size={16} />
              <span>Start a Project</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
