import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  const [location] = useLocation();
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  
  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
      setIsChangingPage(true);
    }
  }, [location, displayLocation]);
  
  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
    } else if (isChangingPage && transitionStage === "fadeIn") {
      setIsChangingPage(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col bg-cine-black text-white">
      <Navbar />
      <main 
        className={cn(
          "flex-1 transition-opacity duration-300 ease-in-out",
          transitionStage === "fadeOut" ? "opacity-0" : "opacity-100"
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
