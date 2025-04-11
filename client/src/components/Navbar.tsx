import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out glassmorphism",
      isScrolled ? "py-2" : "py-4"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-cine-white hover:text-cine-gold transition-colors">
            <div className="flex items-center">
              <Logo className="mr-2 text-cine-gold" />
              <div className="text-xl font-semibold">CineWave Studios</div>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className={cn(
              "text-sm font-medium tracking-widest hover:text-cine-gold transition-colors",
              location === "/" && "text-cine-gold"
            )}>
              HOME
            </Link>
            <Link href="/#services" className="text-sm font-medium tracking-widest hover:text-cine-gold transition-colors">
              SERVICES
            </Link>
            <Link href="/#portfolio" className="text-sm font-medium tracking-widest hover:text-cine-gold transition-colors">
              PORTFOLIO
            </Link>
            <Link href="/#about" className="text-sm font-medium tracking-widest hover:text-cine-gold transition-colors">
              ABOUT
            </Link>
            <Link href="/#contact" className="text-sm font-medium tracking-widest hover:text-cine-gold transition-colors">
              CONTACT
            </Link>
          </div>
          
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-cine-black bg-opacity-80 backdrop-blur-lg">
          <Link href="/" className="block px-4 py-2 text-base font-medium text-cine-white hover:bg-cine-gray-700 rounded-md">
            HOME
          </Link>
          <Link href="/#services" className="block px-4 py-2 text-base font-medium text-cine-white hover:bg-cine-gray-700 rounded-md">
            SERVICES
          </Link>
          <Link href="/#portfolio" className="block px-4 py-2 text-base font-medium text-cine-white hover:bg-cine-gray-700 rounded-md">
            PORTFOLIO
          </Link>
          <Link href="/#about" className="block px-4 py-2 text-base font-medium text-cine-white hover:bg-cine-gray-700 rounded-md">
            ABOUT
          </Link>
          <Link href="/#contact" className="block px-4 py-2 text-base font-medium text-cine-white hover:bg-cine-gray-700 rounded-md">
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}
