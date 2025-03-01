
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const Index = () => {
  // Smooth scroll effect for the page
  useEffect(() => {
    // Initialize smooth scrolling behavior
    const smoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.length > 0 && link.origin + link.pathname === window.location.origin + window.location.pathname) {
        e.preventDefault();
        
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', smoothScroll);
    
    return () => {
      document.removeEventListener('click', smoothScroll);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <HowItWorks />
          <Features />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
