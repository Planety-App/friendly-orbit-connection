import { Star, Rocket } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="cta-section" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/6 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-space-purple/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/6 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-space-blue/10 blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto glass-card p-6 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-br from-space-purple/20 to-space-blue/20 relative overflow-hidden shadow-glow-sm hover:shadow-glow-md transition-all duration-500">
          {/* Decorative floating stars */}
          <div className="absolute top-6 sm:top-8 left-6 sm:left-8 text-space-purple/30 animate-float" style={{animationDelay: '0.5s'}}>
            <Star className="w-4 sm:w-6 h-4 sm:h-6" />
          </div>
          <div className="absolute bottom-6 sm:bottom-8 right-8 sm:right-12 text-space-blue/30 animate-float" style={{animationDelay: '1.2s'}}>
            <Star className="w-6 sm:w-8 h-6 sm:h-8" />
          </div>
          <div className="absolute top-1/2 right-6 sm:right-8 text-space-orange/30 animate-float" style={{animationDelay: '0.8s'}}>
            <Star className="w-4 sm:w-5 h-4 sm:h-5" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Ready to Transform Your <span className="text-space-purple">Friendships</span>?
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto">
              Join our waitlist to be among the first to experience Planety when we launch. We'll send you updates and early access opportunities.
            </p>
          </div>
          
          <div className="flex justify-center">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLScTYSPGHT0jR7_wQ0VCFRNo3_tig9spiIAPeFFQ9kpQdBGPwQ/viewform?embedded=true" 
              width="640" 
              height="720" 
              className="border-0 w-full max-w-2xl mx-auto bg-transparent"
              title="Join Waitlist Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
      
      {/* Visual connector */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/50 to-transparent"></div>
    </section>
  );
};

export default CTASection;
