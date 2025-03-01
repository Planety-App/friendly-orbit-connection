
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

  return (
    <section className="relative min-h-[90vh] pt-24 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-space-purple/70 animate-pulse-soft"></div>
        <div className="absolute top-40 right-1/4 w-3 h-3 rounded-full bg-space-blue/70 animate-pulse-soft" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-space-orange/70 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 rounded-full bg-space-purple-light/70 animate-pulse-soft" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 rounded-full bg-space-blue/70 animate-pulse-soft" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-space-purple/10 dark:bg-space-purple/20 rounded-full">
              <Star className="w-4 h-4 mr-2 text-space-purple" />
              <span className="text-sm font-medium text-space-purple">Introducing Planety</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Stay close to the friends who matter
              <span className="block text-space-purple">—without the noise of social media.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              A friendly, private space to nurture meaningful relationships through playful interactions and gentle reminders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="button-primary flex items-center justify-center">
                <Rocket className="w-5 h-5 mr-2" />
                Join the Waitlist
              </button>
              <button className="button-secondary">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Illustration */}
          <div className="lg:w-1/2 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Orbits */}
              <div className="orbit w-[85%] h-[85%] top-[7.5%] left-[7.5%] animate-rotate-slow"></div>
              <div className="orbit w-[65%] h-[65%] top-[17.5%] left-[17.5%] animate-rotate-slow" style={{animationDuration: '25s'}}></div>
              <div className="orbit w-[45%] h-[45%] top-[27.5%] left-[27.5%] animate-rotate-slow" style={{animationDuration: '15s'}}></div>
              
              {/* Main planet */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-space-purple to-space-purple-dark rounded-full shadow-glow-md z-10 overflow-hidden planet-shadow animate-float"
                style={{
                  transform: `translate(-50%, -50%) translateY(${scrollY * 0.05}px)`,
                }}
              >
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/20 rounded-full blur-sm"></div>
              </div>
              
              {/* Friend planets */}
              <div 
                className="absolute top-[15%] right-[30%] w-16 h-16 bg-gradient-to-br from-space-blue-light to-space-blue rounded-full shadow-md z-10 overflow-hidden planet-shadow animate-float"
                style={{
                  animationDelay: '0.5s',
                  transform: `translateY(${scrollY * 0.08}px)`,
                }}
              >
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/30 rounded-full blur-sm"></div>
              </div>
              
              <div 
                className="absolute bottom-[20%] left-[25%] w-20 h-20 bg-gradient-to-br from-space-orange-light to-space-orange rounded-full shadow-md z-10 overflow-hidden planet-shadow animate-float"
                style={{
                  animationDelay: '1s',
                  transform: `translateY(${scrollY * -0.06}px)`,
                }}
              >
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/30 rounded-full blur-sm"></div>
              </div>
              
              <div 
                className="absolute bottom-[10%] right-[15%] w-12 h-12 bg-gradient-to-br from-space-purple-light to-space-purple rounded-full shadow-md z-10 overflow-hidden planet-shadow animate-float"
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
      </div>
    </section>
  );
};

export default Hero;
