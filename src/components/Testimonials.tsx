import { useState, useEffect } from 'react';
import { Heart, Star, Circle } from 'lucide-react';

const testimonials = [
  {
    quote: "Planety has completely changed how I keep up with friends. The missions make reaching out feel natural instead of awkward.",
    name: "Alex Kim",
    role: "Busy Professional",
    avatar: "/placeholder.svg",
    color: "from-space-purple/20 to-space-purple-light/20"
  },
  {
    quote: "As someone with social anxiety, I love how Planety helps me maintain friendships without the pressure of social media.",
    name: "Jamie Taylor",
    role: "Introvert & Artist",
    avatar: "/placeholder.svg",
    color: "from-space-blue/20 to-space-blue-light/20"
  },
  {
    quote: "Moving to a new city was tough, but Planety helped me stay connected to old friends while making space for new ones.",
    name: "Morgan Lee",
    role: "Recent Graduate",
    avatar: "/placeholder.svg",
    color: "from-space-orange/20 to-space-orange-light/20"
  }
];

type FriendshipType = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const friendshipTypes: FriendshipType[] = [
  {
    title: "Close Friends",
    description: "Your inner circle who know you best",
    icon: <Heart className="w-6 h-6 text-white" />,
    color: "bg-space-purple"
  },
  {
    title: "Activity Buddies",
    description: "Friends you share hobbies with",
    icon: <Star className="w-6 h-6 text-white" />,
    color: "bg-space-blue"
  },
  {
    title: "Growing Connections",
    description: "Newer friendships with potential",
    icon: <Circle className="w-6 h-6 text-white" />,
    color: "bg-space-orange"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 relative">
      {/* Background decoration */}
      <div className="absolute -z-10 top-1/3 left-0 w-64 h-64 rounded-full bg-space-orange/5 blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/3 right-0 w-64 h-64 rounded-full bg-space-purple/5 blur-3xl"></div>
      
      <div className="container px-4 mx-auto">
        <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            What Our Early Users Say
          </h2>
          <p className="text-base sm:text-lg text-foreground/80">
            Real stories from people who've transformed how they maintain friendships.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 items-center">
          {/* Testimonial slider */}
          <div className="lg:w-1/2 order-2 lg:order-1 w-full">
            <div className="relative h-[250px] sm:h-[300px] w-full max-w-sm sm:max-w-lg mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 glass-card p-6 sm:p-8 bg-gradient-to-br ${testimonial.color}
                    ${index === activeIndex 
                      ? 'opacity-100 transform translate-x-0 scale-100 z-10 shadow-glow-sm' 
                      : index < activeIndex 
                        ? 'opacity-0 transform -translate-x-full scale-95 z-0' 
                        : 'opacity-0 transform translate-x-full scale-95 z-0'
                    }`}
                >
                  <div className="mb-4 sm:mb-6">
                    {/* Quote icon */}
                    <svg className="w-8 sm:w-10 h-8 sm:h-10 text-space-purple/30" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.7,15.8L2,7.8C1.7,7.5,1.7,7,2,6.7s0.8-0.3,1.1,0l8.8,8.1c0.3,0.3,0.3,0.8,0,1.1L3.1,23.8c-0.3,0.3-0.8,0.3-1.1,0 s-0.3-0.8,0-1.1L10.7,15.8z M21.9,15.8l-8.8-8.1c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l8.8,8.1c0.3,0.3,0.3,0.8,0,1.1l-8.8,8.1 c-0.3,0.3-0.8,0.3-1.1,0s-0.3-0.8,0-1.1L21.9,15.8z"></path>
                    </svg>
                  </div>
                  
                  <p className="text-base sm:text-lg font-medium italic mb-4 sm:mb-6">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4 ring-2 ring-white/20">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/70">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial navigation dots */}
            <div className="flex justify-center mt-4 sm:mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-space-purple scale-125' : 'bg-foreground/20 hover:bg-foreground/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Friendship types */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              {friendshipTypes.map((type, index) => (
                <div 
                  key={index}
                  className="glass-card p-4 sm:p-6 flex items-start gap-3 sm:gap-4 transition-all duration-300 hover:shadow-glow-sm transform hover:translate-x-1"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${type.color} flex-shrink-0 flex items-center justify-center shadow-md`}>
                    {type.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-1">{type.title}</h4>
                    <p className="text-sm sm:text-base text-foreground/80">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 glass-card bg-gradient-to-br from-space-purple/10 to-space-blue/10 text-center hover:shadow-glow-sm transition-all duration-300">
              <p className="text-sm sm:text-base text-foreground/80 mb-3 sm:mb-4">
                Planety adapts to your unique friendship patterns, helping you nurture each relationship in the way it needs.
              </p>
              <div className="inline-flex items-center text-space-purple font-medium text-sm sm:text-base">
                <Circle className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-2 fill-current animate-pulse-soft" />
                <span>Coming soon: Friendship Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual connector */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/50 to-transparent"></div>
    </section>
  );
};

export default Testimonials;
