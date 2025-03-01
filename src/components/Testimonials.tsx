
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
    <section className="py-20 lg:py-28">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Early Users Say
          </h2>
          <p className="text-lg text-foreground/80">
            Real stories from people who've transformed how they maintain friendships.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Testimonial slider */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="relative h-[300px] w-full max-w-lg mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 glass-card p-8 bg-gradient-to-br ${testimonial.color}
                    ${index === activeIndex 
                      ? 'opacity-100 transform translate-x-0 scale-100 z-10 shadow-glow-sm' 
                      : index < activeIndex 
                        ? 'opacity-0 transform -translate-x-full scale-95 z-0' 
                        : 'opacity-0 transform translate-x-full scale-95 z-0'
                    }`}
                >
                  <div className="mb-6">
                    {/* Quote icon */}
                    <svg className="w-10 h-10 text-space-purple/30" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.7,15.8L2,7.8C1.7,7.5,1.7,7,2,6.7s0.8-0.3,1.1,0l8.8,8.1c0.3,0.3,0.3,0.8,0,1.1L3.1,23.8c-0.3,0.3-0.8,0.3-1.1,0 s-0.3-0.8,0-1.1L10.7,15.8z M21.9,15.8l-8.8-8.1c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l8.8,8.1c0.3,0.3,0.3,0.8,0,1.1l-8.8,8.1 c-0.3,0.3-0.8,0.3-1.1,0s-0.3-0.8,0-1.1L21.9,15.8z"></path>
                    </svg>
                  </div>
                  
                  <p className="text-lg font-medium italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-space-purple/30 dark:bg-space-purple/50 flex items-center justify-center overflow-hidden mr-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/70">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Navigation dots */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-space-purple scale-125' 
                        : 'bg-space-purple/30 hover:bg-space-purple/50'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Friendship types */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">Different Friendships, Different Needs</h3>
            
            <div className="space-y-6">
              {friendshipTypes.map((type, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-glow-sm transform hover:translate-x-1"
                >
                  <div className={`w-12 h-12 rounded-full ${type.color} flex-shrink-0 flex items-center justify-center shadow-md`}>
                    {type.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{type.title}</h4>
                    <p className="text-foreground/80">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 glass-card bg-gradient-to-br from-space-purple/10 to-space-blue/10 text-center">
              <p className="text-foreground/80 mb-4">
                Planety adapts to your unique friendship patterns, helping you nurture each relationship in the way it needs.
              </p>
              <div className="inline-flex items-center text-space-purple font-medium">
                <Circle className="w-4 h-4 mr-2 fill-current" />
                <span>Coming soon: Friendship Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
