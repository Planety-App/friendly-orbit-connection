import { useEffect, useState, useRef } from 'react';
import { Star, Rocket, Users, Heart } from 'lucide-react';
import { useAnalytics, useIntersectionTracking } from '@/hooks/useAnalytics';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { trackButtonClick, trackHeroEngagement } = useAnalytics();
  
  // Track when hero section comes into view
  useIntersectionTracking(heroRef, 'hero_section_viewed', {
    section: 'hero',
    value_proposition: 'Never Lose Touch With Friends Again'
  });
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to CTA section
  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      // Get the navbar height to offset the scroll position
      const navbar = document.querySelector('header');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
      
      // Scroll to the section with smooth behavior and offset
      const offsetTop = ctaSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-[65vh] pt-20 pb-8 sm:pb-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,78,198,0.15),transparent)]"></div>
        </div>
        <div className="absolute top-20 left-10 sm:left-20 w-2 h-2 rounded-full bg-planety-indigo/70 animate-pulse-soft"></div>
        <div className="absolute top-40 right-10 sm:right-1/4 w-3 h-3 rounded-full bg-planety-navy/70 animate-pulse-soft" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 left-10 sm:left-1/3 w-2 h-2 rounded-full bg-planety-amber/70 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-10 sm:right-20 w-2 h-2 rounded-full bg-planety-green/70 animate-pulse-soft" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-20 right-10 sm:right-1/3 w-3 h-3 rounded-full bg-planety-indigo/70 animate-pulse-soft" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="inline-flex items-center px-3 py-1 mb-3 bg-planety-indigo/10 rounded-full">
              <Star className="w-3 h-3 mr-2 text-planety-indigo" />
              <span className="text-xs font-medium text-planety-indigo">Join 10,000+ people staying connected with friends</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-2 sm:mb-3 tracking-tight text-planety-navy">
              Never Lose Touch With
              <span className="block text-planety-indigo">Friends Again</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-planety-gray-600 mb-4 sm:mb-6 max-w-lg mx-auto lg:mx-0">
              Get reminders to check in, track your conversations, and maintain friendships without the overwhelm of social media.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button 
                className="button-primary flex items-center justify-center"
                onClick={() => {
                  trackButtonClick('Try Planety Free', 'hero', '#cta-section');
                  trackHeroEngagement();
                  scrollToCTA();
                }}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Try Planety Free
              </button>
              <button 
                className="button-secondary"
                onClick={() => {
                  trackButtonClick('See How It Works', 'hero', '#how-it-works');
                  const howItWorksSection = document.getElementById('how-it-works');
                  if (howItWorksSection) {
                    // Get the navbar height to offset the scroll position
                    const navbar = document.querySelector('header');
                    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
                    
                    // Scroll to the section with smooth behavior and offset
                    const offsetTop = howItWorksSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                See How It Works
              </button>
            </div>
          </div>
          
          {/* Friendship Constellation Visual */}
          <div className="lg:w-1/2 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Connection lines between planets */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
                {/* Connecting lines */}
                <path d="M200 200 L320 120" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-soft"/>
                <path d="M200 200 L80 280" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-soft" style={{animationDelay: '0.5s'}}/>
                <path d="M200 200 L320 300" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-soft" style={{animationDelay: '1s'}}/>
                <path d="M320 120 L320 300" stroke="url(#connectionGradient)" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.2"/>
                <path d="M80 280 L320 300" stroke="url(#connectionGradient)" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.2"/>
              </svg>
              
              {/* Central planet (You) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-planety-indigo to-planety-navy rounded-full shadow-lg z-10 overflow-hidden animate-float flex items-center justify-center"
                style={{
                  transform: `translate(-50%, -50%) translateY(${scrollY * 0.03}px)`,
                }}
              >
                <Users className="w-8 h-8 text-white" />
                <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
              </div>
              
              {/* Friend planets */}
              <div 
                className="absolute top-[30%] right-[20%] w-14 h-14 bg-gradient-to-br from-planety-amber to-planety-orange rounded-full shadow-md z-10 overflow-hidden animate-float flex items-center justify-center"
                style={{
                  animationDelay: '0.5s',
                  transform: `translateY(${scrollY * 0.05}px)`,
                }}
              >
                <Heart className="w-6 h-6 text-white" />
                <div className="absolute top-1 left-1 w-3 h-3 bg-white/40 rounded-full blur-sm"></div>
              </div>
              
              <div 
                className="absolute bottom-[30%] left-[20%] w-16 h-16 bg-gradient-to-br from-planety-green to-planety-indigo rounded-full shadow-md z-10 overflow-hidden animate-float flex items-center justify-center"
                style={{
                  animationDelay: '1s',
                  transform: `translateY(${scrollY * -0.04}px)`,
                }}
              >
                <Star className="w-7 h-7 text-white" />
                <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
              </div>
              
              <div 
                className="absolute bottom-[25%] right-[20%] w-12 h-12 bg-gradient-to-br from-planety-indigo to-planety-navy rounded-full shadow-md z-10 overflow-hidden animate-float flex items-center justify-center"
                style={{
                  animationDelay: '1.5s',
                  transform: `translateY(${scrollY * 0.06}px)`,
                }}
              >
                <Users className="w-5 h-5 text-white" />
                <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm"></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute top-[15%] left-[15%] w-1 h-1 bg-planety-amber rounded-full animate-pulse-soft"></div>
              <div className="absolute top-[80%] right-[10%] w-1 h-1 bg-planety-indigo rounded-full animate-pulse-soft" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-planety-green rounded-full animate-pulse-soft" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Visual divider - make it taller and more subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent opacity-50"></div>
    </section>
  );
};

export default Hero;
