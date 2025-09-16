import { useState } from 'react';
import { Users, Heart, Star, Compass, Navigation, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: <Compass className="w-10 h-10 text-planety-indigo" />,
    title: "Add Your Friends",
    description: "Import your contacts or manually add friends you want to stay connected with.",
    color: "from-planety-indigo/20 to-planety-navy/20",
    hoverColor: "from-planety-indigo/30 to-planety-navy/30"
  },
  {
    icon: <Navigation className="w-10 h-10 text-planety-amber" />,
    title: "Get Smart Reminders",
    description: "Receive personalized nudges when it's time to reach out to specific friends.",
    color: "from-planety-amber/20 to-planety-orange/20",
    hoverColor: "from-planety-amber/30 to-planety-orange/30"
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-planety-green" />,
    title: "Stay Connected",
    description: "Track your conversations and build stronger friendships over time.",
    color: "from-planety-green/20 to-planety-indigo/20",
    hoverColor: "from-planety-green/30 to-planety-indigo/30"
  }
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="relative py-8 sm:py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-4 sm:mb-6 max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-2 sm:mb-3 text-planety-navy">
            How It Works in 3 Steps
          </h2>
          <p className="text-sm sm:text-base text-planety-gray-600">
            A simple system to help you maintain friendships without the overwhelm.
          </p>
        </div>
        
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row gap-4 justify-center">
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
                <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center rounded-full bg-white/50 mb-4 sm:mb-6 mx-auto group-hover:animate-pulse-soft">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-display font-medium mb-3 sm:mb-4 text-center group-hover:text-planety-indigo transition-colors duration-300 text-planety-navy">{step.title}</h3>
                <p className="text-center text-sm sm:text-base text-planety-gray-600">{step.description}</p>
              </div>
              
              {/* Step number - positioned outside the card */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-planety-indigo text-white flex items-center justify-center text-sm font-bold shadow-md">
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
