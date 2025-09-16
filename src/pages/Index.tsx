
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemStatement from '@/components/ProblemStatement';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import TrustPrivacy from '@/components/TrustPrivacy';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/utils/devTools'; // Initialize development tools

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
      <PerformanceMonitor />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-planety-amber focus:text-planety-navy focus:px-3 focus:py-2 focus:rounded-md">Skip to content</a>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main" className="flex-1" role="main">
          <Hero />
          <ProblemStatement />
          <HowItWorks />
          <Features />
          <Testimonials />
          <TrustPrivacy />
          <FAQ />
          <CTASection />
        </main>
        {/* Sticky mobile CTA */}
        <div className="fixed bottom-4 inset-x-0 px-4 md:hidden z-40">
          <a
            href="#cta-section"
            className="block text-center button-primary shadow-glow-lg"
            aria-label="Join the waitlist"
          >
            Join the Waitlist
          </a>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
