
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Guides } from '@/components/Guides';
import { Resources } from '@/components/Resources';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for DOM
      }
    }
  }, [location.state]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <Hero />
      <About />
      <Guides />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
