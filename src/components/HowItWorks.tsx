import { useState } from 'react';
import { Users, Heart, Star } from 'lucide-react';

const steps = [
  {
    icon: <Users className="w-10 h-10 text-space-purple" />,
    title: "Categorize Your Friends",
    description: "Take a fun quiz to see which 'friend planet' they belong to!",
    color: "from-space-purple/20 to-space-purple-light/20",
    hoverColor: "from-space-purple/30 to-space-purple-light/30"
  },
  {
    icon: <Heart className="w-10 h-10 text-space-blue" />,
    title: "Stay in Touch Easily",
    description: "Get friendly nudges and missions to keep connections alive.",
    color: "from-space-blue/20 to-space-blue-light/20",
    hoverColor: "from-space-blue/30 to-space-blue-light/30"
  },
  {
    icon: <Star className="w-10 h-10 text-space-orange" />,
    title: "Celebrate Your Friendships",
    description: "Track memories, milestones, and meaningful moments.",
    color: "from-space-orange/20 to-space-orange-light/20",
    hoverColor: "from-space-orange/30 to-space-orange-light/30"
  }
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="relative py-16 sm:py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">How Planety Works</h2>
          <p className="text-base sm:text-lg text-foreground/80">
            A simple, playful approach to friendship management that helps you nurture connections that matter.
          </p>
        </div>
        
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row gap-8 justify-center">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative md:w-1/3 group"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div 
                className={`glass-card p-6 sm:p-8 h-full bg-gradient-to-br ${step.color} hover:${step.hoverColor} transition-all duration-500 transform hover:scale-105 hover:shadow-glow-sm ${activeIndex === index ? 'scale-105 shadow-glow-sm' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/10 mb-4 sm:mb-6 mx-auto group-hover:animate-pulse-soft">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center group-hover:text-space-purple transition-colors duration-300">{step.title}</h3>
                <p className="text-center text-sm sm:text-base text-foreground/80">{step.description}</p>
              </div>
              
              {/* Step number - positioned outside the card */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-space-purple text-white flex items-center justify-center text-sm font-bold shadow-md">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual connector */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/50 to-transparent"></div>
    </section>
  );
};

export default HowItWorks;
