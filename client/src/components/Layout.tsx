import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
