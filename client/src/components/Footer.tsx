import React from 'react';
import { Link } from 'wouter';
import Logo from '@/components/ui/logo';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cine-black border-t border-cine-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-10 md:mb-0">
            <div className="flex items-center mb-6">
              <Logo className="mr-2 text-cine-gold" size={28} />
              <div className="text-xl font-semibold">CineWave Studios</div>
            </div>
            
            <p className="text-cine-gray-300 max-w-xs mb-6">
              Premium video editing services crafted to transform your footage into cinematic masterpieces.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/service-customizer" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Commercial Editing</Link></li>
                <li><Link href="/service-customizer" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Content Creation</Link></li>
                <li><Link href="/service-customizer" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Event Videos</Link></li>
                <li><Link href="/service-customizer" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Short Films</Link></li>
                <li><Link href="/service-customizer" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Visual Effects</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/#about" className="text-cine-gray-300 hover:text-cine-gold transition-colors">About Us</Link></li>
                <li><Link href="/#portfolio" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Portfolio</Link></li>
                <li><Link href="/#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Careers</Link></li>
                <li><Link href="/#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Blog</Link></li>
                <li><Link href="/#contact" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Privacy Policy</Link></li>
                <li><Link href="/#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Terms of Service</Link></li>
                <li><Link href="/#" className="text-cine-gray-300 hover:text-cine-gold transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-cine-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cine-gray-300 text-sm">&copy; {new Date().getFullYear()} CineWave Studios. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/#" className="text-cine-gray-300 hover:text-cine-white transition-colors text-sm">Privacy Policy</Link>
            <span className="mx-2 text-cine-gray-500">|</span>
            <Link href="/#" className="text-cine-gray-300 hover:text-cine-white transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
