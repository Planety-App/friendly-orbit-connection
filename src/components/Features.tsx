
import { useState, useEffect } from 'react';
import { 
  Users, Heart, Star, Circle, Rocket
} from 'lucide-react';

const features = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Friendship Quiz & Categorization",
    description: "Discover which 'friend planets' your connections belong to based on your interaction patterns.",
    color: "text-space-purple",
    bgColor: "bg-space-purple/10 dark:bg-space-purple/20",
    borderColor: "border-space-purple/20 dark:border-space-purple/30"
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Mission System",
    description: "Receive gentle nudges and fun mission suggestions to help maintain meaningful relationships.",
    color: "text-space-blue",
    bgColor: "bg-space-blue/10 dark:bg-space-blue/20",
    borderColor: "border-space-blue/20 dark:border-space-blue/30"
  },
  {
    icon: <Circle className="w-8 h-8" />,
    title: "Event Coordination",
    description: "Plan hangouts without stress using our intuitive event planning and reminder system.",
    color: "text-space-orange",
    bgColor: "bg-space-orange/10 dark:bg-space-orange/20",
    borderColor: "border-space-orange/20 dark:border-space-orange/30"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Private & Non-Social Media",
    description: "Enjoy a distraction-free space with no ads, no influencers, just meaningful connections.",
    color: "text-space-purple-light",
    bgColor: "bg-space-purple-light/10 dark:bg-space-purple-light/20",
    borderColor: "border-space-purple-light/20 dark:border-space-purple-light/30"
  }
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('features-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section id="features-section" className="py-20 lg:py-28 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Features That Make <span className="text-space-purple">Friendship</span> Fun
          </h2>
          <p className="text-lg text-foreground/80">
            Planety combines playful gamification with practical tools to help you maintain your most valued relationships.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Feature cards - Left side on desktop, top on mobile */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`glass-card p-6 transition-all duration-500 cursor-pointer ${activeIndex === index ? 'scale-105 shadow-glow-sm' : 'hover:scale-105'}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 ${feature.color} ${feature.borderColor} border`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* App preview - Right side on desktop, bottom on mobile */}
          <div className="lg:w-1/2">
            <div className="relative mx-auto max-w-sm">
              {/* Phone frame */}
              <div className="rounded-[3rem] border-8 border-space-purple-dark dark:border-space-purple bg-foreground/5 backdrop-blur-sm p-4 shadow-glow-md overflow-hidden aspect-[9/19]">
                {/* App screen based on the active feature */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-background">
                  {/* App header */}
                  <div className="absolute top-0 left-0 right-0 px-6 py-4 bg-gradient-to-r from-space-purple/90 to-space-blue/90 backdrop-blur-md z-10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-white">Planety</h4>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Feature preview content - different for each feature */}
                  <div className="absolute inset-0 pt-16 pb-4 px-4 overflow-y-auto scrollbar-hide">
                    {activeIndex === 0 && (
                      <div className="animate-scale-in h-full flex flex-col">
                        <div className="text-center mb-6">
                          <h5 className="text-lg font-bold">Friend Planets</h5>
                          <p className="text-sm text-foreground/70">Discover where your friends orbit</p>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          {[
                            { name: "Close Friends", color: "bg-space-purple", icon: <Heart className="w-5 h-5 text-white" /> },
                            { name: "Activity Buddies", color: "bg-space-blue", icon: <Star className="w-5 h-5 text-white" /> },
                            { name: "Work Network", color: "bg-space-orange", icon: <Users className="w-5 h-5 text-white" /> },
                            { name: "Reconnect", color: "bg-space-purple-light", icon: <Circle className="w-5 h-5 text-white" /> },
                          ].map((planet, i) => (
                            <div key={i} className={`rounded-xl ${planet.color} p-4 flex flex-col items-center justify-center shadow-md animate-float`} style={{ animationDelay: `${i * 0.2}s` }}>
                              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                                {planet.icon}
                              </div>
                              <span className="text-white text-sm font-medium">{planet.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeIndex === 1 && (
                      <div className="animate-scale-in h-full flex flex-col">
                        <div className="text-center mb-6">
                          <h5 className="text-lg font-bold">Today's Missions</h5>
                          <p className="text-sm text-foreground/70">Simple ways to connect</p>
                        </div>
                        <div className="space-y-4">
                          {[
                            { title: "Coffee with Sarah", type: "Meet Up", color: "border-space-purple" },
                            { title: "Share a memory with Alex", type: "Message", color: "border-space-blue" },
                            { title: "Check in with Jordan", type: "Call", color: "border-space-orange" },
                          ].map((mission, i) => (
                            <div key={i} className={`rounded-xl p-4 border ${mission.color} bg-white/5 backdrop-blur-sm flex justify-between items-center animate-slide-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                              <div>
                                <h6 className="font-medium">{mission.title}</h6>
                                <span className="text-xs text-foreground/70">{mission.type}</span>
                              </div>
                              <button className="w-8 h-8 rounded-full bg-space-purple/20 flex items-center justify-center">
                                <Rocket className="w-4 h-4 text-space-purple" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeIndex === 2 && (
                      <div className="animate-scale-in h-full flex flex-col">
                        <div className="text-center mb-6">
                          <h5 className="text-lg font-bold">Event Planning</h5>
                          <p className="text-sm text-foreground/70">Organize hangouts seamlessly</p>
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-xl p-5 bg-gradient-to-br from-space-purple/20 to-space-blue/20 backdrop-blur-sm">
                            <h6 className="font-medium text-lg mb-2">Game Night</h6>
                            <div className="flex items-center text-sm text-foreground/70 mb-3">
                              <Circle className="w-4 h-4 mr-1" />
                              <span>Friday, 8:00 PM</span>
                            </div>
                            <div className="flex space-x-2 mb-4">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-space-purple/30 flex items-center justify-center text-xs font-medium">
                                  {i}
                                </div>
                              ))}
                              <div className="w-8 h-8 rounded-full bg-space-blue/30 flex items-center justify-center text-xs">
                                +2
                              </div>
                            </div>
                            <button className="w-full py-2 rounded-lg bg-space-purple text-white">
                              Send Reminders
                            </button>
                          </div>
                          
                          <div className="rounded-xl p-4 border border-space-blue/20 bg-white/5 backdrop-blur-sm">
                            <h6 className="font-medium">Beach Trip Planning</h6>
                            <div className="flex items-center text-xs text-foreground/70">
                              <Circle className="w-3 h-3 mr-1" />
                              <span>In progress</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeIndex === 3 && (
                      <div className="animate-scale-in h-full flex flex-col">
                        <div className="text-center mb-6">
                          <h5 className="text-lg font-bold">Private Space</h5>
                          <p className="text-sm text-foreground/70">No ads, no noise, just friends</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-space-purple to-space-blue flex items-center justify-center shadow-glow-md">
                            <Heart className="w-10 h-10 text-white" />
                          </div>
                          <h6 className="font-bold text-lg">Your Private Sanctuary</h6>
                          <p className="text-sm text-foreground/70 max-w-xs">
                            Planety is a distraction-free space to focus on relationships that truly matter.
                          </p>
                          <div className="flex space-x-3 mt-4">
                            <div className="flex items-center text-space-purple">
                              <Circle className="w-4 h-4 mr-1 fill-current" />
                              <span className="text-sm">No ads</span>
                            </div>
                            <div className="flex items-center text-space-purple">
                              <Circle className="w-4 h-4 mr-1 fill-current" />
                              <span className="text-sm">No feeds</span>
                            </div>
                            <div className="flex items-center text-space-purple">
                              <Circle className="w-4 h-4 mr-1 fill-current" />
                              <span className="text-sm">No metrics</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
