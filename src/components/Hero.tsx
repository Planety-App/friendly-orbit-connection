import { useEffect, useState } from 'react';
import { Star, Rocket } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  
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
    <section className="relative min-h-[75vh] pt-28 pb-16 sm:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,78,198,0.15),transparent)]"></div>
        </div>
        <div className="absolute top-20 left-10 sm:left-20 w-2 h-2 rounded-full bg-space-purple/70 animate-pulse-soft"></div>
        <div className="absolute top-40 right-10 sm:right-1/4 w-3 h-3 rounded-full bg-space-blue/70 animate-pulse-soft" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 left-10 sm:left-1/3 w-2 h-2 rounded-full bg-space-orange/70 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-10 sm:right-20 w-2 h-2 rounded-full bg-space-purple-light/70 animate-pulse-soft" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-20 right-10 sm:right-1/3 w-3 h-3 rounded-full bg-space-blue/70 animate-pulse-soft" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="inline-flex items-center px-4 py-2 mb-4 sm:mb-6 bg-space-purple/10 dark:bg-space-purple/20 rounded-full">
              <Star className="w-4 h-4 mr-2 text-space-purple" />
              <span className="text-sm font-medium text-space-purple">Introducing Planety</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">
              Stay close to the friends who matter
              <span className="block text-space-purple">—without the noise of social media.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              A friendly, private space to nurture meaningful relationships through playful interactions and gentle reminders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                className="button-primary flex items-center justify-center"
                onClick={scrollToCTA}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Join the Waitlist
              </button>
              <button 
                className="button-secondary"
                onClick={() => {
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
                Learn More
              </button>
            </div>
          </div>
          
          {/* YouTube Video Embed */}
          <div className="lg:w-1/2 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-glow-md">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Planety Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Illustration - Moved below */}
        <div className="mt-16 sm:mt-24 animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="relative w-full max-w-lg mx-auto aspect-[4/3]">
            {/* Orbits with glow effect */}
            <div className="orbit w-[85%] h-[85%] top-[7.5%] left-[7.5%] animate-rotate-slow shadow-[0_0_15px_rgba(120,78,198,0.1)]"></div>
            <div className="orbit w-[65%] h-[65%] top-[17.5%] left-[17.5%] animate-rotate-slow shadow-[0_0_10px_rgba(120,78,198,0.1)]" style={{animationDuration: '25s'}}></div>
            <div className="orbit w-[45%] h-[45%] top-[27.5%] left-[27.5%] animate-rotate-slow shadow-[0_0_5px_rgba(120,78,198,0.1)]" style={{animationDuration: '15s'}}></div>
            
            {/* Main planet */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gradient-to-br from-space-purple to-space-purple-dark rounded-full shadow-glow-md z-10 overflow-hidden planet-shadow animate-float"
              style={{
                transform: `translate(-50%, -50%) translateY(${scrollY * 0.05}px)`,
              }}
            >
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/20 rounded-full blur-sm"></div>
            </div>
            
            {/* Friend planets */}
            <div 
              className="absolute top-[15%] right-[30%] w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-space-blue-light to-space-blue rounded-full shadow-md z-10 overflow-hidden planet-shadow animate-float"
              style={{
                animationDelay: '0.5s',
                transform: `translateY(${scrollY * 0.08}px)`,
              }}
            >
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/30 rounded-full blur-sm"></div>
            </div>
            
            <div 
              className="absolute bottom-[20%] left-[25%] w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 bg-gradient-to-br from-space-orange-light to-space-orange rounded-full shadow-md z-10 overflow-hidden planet-shadow animate-float"
              style={{
                animationDelay: '1s',
                transform: `translateY(${scrollY * -0.06}px)`,
              }}
            >
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/30 rounded-full blur-sm"></div>
            </div>
            
            <div 
              className="absolute bottom-[10%] right-[15%] w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-gradient-to-br from-space-purple-light to-space-purple rounded-full shadow-md z-10 overflow-hidden planet-shadow animate-float"
              style={{
                animationDelay: '1.5s',
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/30 rounded-full blur-sm"></div>
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
