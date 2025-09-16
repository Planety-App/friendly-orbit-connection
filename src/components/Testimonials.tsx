import { useState, useEffect } from 'react';
import { Heart, Star, Circle } from 'lucide-react';

const testimonials = [
  {
    quote: "I finally have a system to stay in touch with friends despite my busy work schedule. The reminders actually work.",
    name: "Sophia Chen",
    role: "Marketing Director",
    avatar: "/earth-P.svg",
    color: "from-planety-indigo/20 to-planety-navy/20",
    persona: "Social Sophia"
  },
  {
    quote: "Keeping up with college friends is so much easier now. I don't have to worry about forgetting to reach out anymore.",
    name: "Tom Rodriguez",
    role: "Software Developer", 
    avatar: "/mars-P.svg",
    color: "from-planety-amber/20 to-planety-orange/20",
    persona: "Thoughtful Tom"
  },
  {
    quote: "Planety helps me remember to check in with all my friends, not just the ones who text me first. It's been a game-changer.",
    name: "Carla Williams",
    role: "Event Coordinator",
    avatar: "/venus-P.svg",
    color: "from-planety-green/20 to-planety-indigo/20",
    persona: "Connected Carla"
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
    description: "Your inner circle who know you best and support you through everything",
    icon: <Heart className="w-6 h-6 text-white" />,
    color: "bg-planety-indigo"
  },
  {
    title: "Activity Buddies", 
    description: "Friends you share hobbies, interests, and adventures with",
    icon: <Star className="w-6 h-6 text-white" />,
    color: "bg-planety-amber"
  },
  {
    title: "Growing Connections",
    description: "Newer friendships with potential for deeper bonds",
    icon: <Circle className="w-6 h-6 text-white" />,
    color: "bg-planety-green"
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
    <section id="testimonials" className="py-8 sm:py-10 lg:py-12 relative">
      {/* Background decoration */}
      <div className="absolute -z-10 top-1/3 left-0 w-64 h-64 rounded-full bg-planety-amber/5 blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/3 right-0 w-64 h-64 rounded-full bg-planety-indigo/5 blur-3xl"></div>
      
      <div className="container px-4 mx-auto">
        <div className="text-center mb-4 sm:mb-6 max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-2 sm:mb-3 text-planety-navy">
            What People Say About Planety
          </h2>
          <p className="text-sm sm:text-base text-planety-gray-600">
            Real stories from people who've improved their friendships using Planety.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center">
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
                    <svg className="w-8 sm:w-10 h-8 sm:h-10 text-planety-indigo/30" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.352,4C4.456,4,0.496,8.016,0.496,12.912c0,4.904,3.96,8.912,8.856,8.912c0.328,0,0.664-0.024,0.992-0.072V24c0,0.336,0.136,0.664,0.368,0.896c0.472,0.472,1.232,0.472,1.704,0c0.232-0.232,0.368-0.56,0.368-0.896v-2.24c0.768-0.32,1.464-0.816,2.024-1.456c1.136-1.296,1.656-2.984,1.432-4.64c-0.216-1.552-1.016-2.928-2.216-3.824c-0.568-0.424-1.24-0.656-1.936-0.656c-0.592,0-1.184,0.184-1.688,0.536c-0.12,0.088-0.224,0.192-0.312,0.312c-0.416,0.568-0.64,1.256-0.64,1.968c0,0.896,0.32,1.744,0.896,2.384c0.264,0.296,0.664,0.472,1.072,0.472c0.336,0,0.664-0.136,0.896-0.368c0.232-0.232,0.368-0.56,0.368-0.896s-0.136-0.664-0.368-0.896C8.984,15.904,8.648,15.768,8.312,15.768c-0.184,0-0.368,0.032-0.536,0.096c0.024-0.184,0.088-0.368,0.184-0.528c0.424-0.712,1.304-0.936,2.016-0.512c0.712,0.424,0.936,1.304,0.512,2.016c-0.424,0.712-1.304,0.936-2.016,0.512c-0.712-0.424-0.936-1.304-0.512-2.016C8.384,14.624,8.832,14.4,9.352,14.4z M22.048,4c-4.896,0-8.856,4.016-8.856,8.912c0,4.904,3.96,8.912,8.856,8.912c0.328,0,0.664-0.024,0.992-0.072V24c0,0.336,0.136,0.664,0.368,0.896c0.472,0.472,1.232,0.472,1.704,0c0.232-0.232,0.368-0.56,0.368-0.896v-2.24c0.768-0.32,1.464-0.816,2.024-1.456c1.136-1.296,1.656-2.984,1.432-4.64c-0.216-1.552-1.016-2.928-2.216-3.824c-0.568-0.424-1.24-0.656-1.936-0.656c-0.592,0-1.184,0.184-1.688,0.536c-0.12,0.088-0.224,0.192-0.312,0.312c-0.416,0.568-0.64,1.256-0.64,1.968c0,0.896,0.32,1.744,0.896,2.384c0.264,0.296,0.664,0.472,1.072,0.472c0.336,0,0.664-0.136,0.896-0.368c0.232-0.232,0.368-0.56,0.368-0.896s-0.136-0.664-0.368-0.896c-0.232-0.232-0.568-0.368-0.904-0.368c-0.184,0-0.368,0.032-0.536,0.096c0.024-0.184,0.088-0.368,0.184-0.528c0.424-0.712,1.304-0.936,2.016-0.512c0.712,0.424,0.936,1.304,0.512,2.016c-0.424,0.712-1.304,0.936-2.016,0.512c-0.712-0.424-0.936-1.304-0.512-2.016C21.08,14.624,21.528,14.4,22.048,14.4z"></path>
                    </svg>
                  </div>
                  
                  <p className="text-base sm:text-lg font-medium italic mb-4 sm:mb-6 text-planety-navy">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4 ring-2 ring-planety-indigo/20">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-base sm:text-lg text-planety-navy">{testimonial.name}</h4>
                      <p className="text-sm text-planety-gray-600">{testimonial.role}</p>
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
                    index === activeIndex ? 'bg-planety-indigo scale-125' : 'bg-planety-gray-400 hover:bg-planety-gray-600'
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
                    <h4 className="font-display font-medium text-base sm:text-lg mb-1 text-planety-navy">{type.title}</h4>
                    <p className="text-sm sm:text-base text-planety-gray-600">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 glass-card bg-gradient-to-br from-planety-indigo/10 to-planety-amber/10 text-center hover:shadow-glow-sm transition-all duration-300 border border-planety-indigo/20">
              <p className="text-sm sm:text-base text-planety-gray-600 mb-3 sm:mb-4">
                Planety learns your friendship patterns and helps you maintain better relationships with less effort.
              </p>
              <div className="inline-flex items-center text-planety-indigo font-medium text-sm sm:text-base">
                <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-2 fill-current animate-pulse-soft" />
                <span>Join 10,000+ people staying better connected</span>
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
