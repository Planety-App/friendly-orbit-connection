
import { useState, useEffect } from 'react';
import { 
  Users, Heart, Star, Bell, Camera, TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Visual Friend Dashboard",
    description: "See all your friendships in one place and track when you last connected.",
    benefit: "Know exactly who needs your attention",
    color: "text-planety-indigo",
    bgColor: "bg-planety-indigo/10",
    borderColor: "border-planety-indigo/20"
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Smart Reminders",
    description: "Get personalized nudges to reach out based on your friendship patterns.",
    benefit: "Never forget to check in with friends again",
    color: "text-planety-amber",
    bgColor: "bg-planety-amber/10",
    borderColor: "border-planety-amber/20"
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Conversation Tracker",
    description: "Keep notes about your conversations and important moments with each friend.",
    benefit: "Remember what matters to each person",
    color: "text-planety-green",
    bgColor: "bg-planety-green/10",
    borderColor: "border-planety-green/20"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Relationship Insights",
    description: "Get suggestions on how to strengthen different types of friendships.",
    benefit: "Improve your friendships with actionable advice",
    color: "text-planety-orange",
    bgColor: "bg-planety-orange/10",
    borderColor: "border-planety-orange/20"
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
    <section id="features-section" className="py-10 lg:py-14 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-planety-navy">
            How Planety Helps You <span className="text-planety-indigo">Stay Connected</span>
          </h2>
          <p className="text-base text-planety-gray-600">
            Simple tools to help you remember, track, and maintain your most important friendships.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Feature cards - Left side on desktop, top on mobile */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`glass-card p-6 transition-all duration-500 cursor-pointer ${activeIndex === index ? 'scale-105 shadow-glow-sm border-2 border-planety-indigo/30' : 'hover:scale-105 border border-planety-gray-200'}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 ${feature.color} ${feature.borderColor} border`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-medium mb-2 text-planety-navy">{feature.title}</h3>
                <p className="text-planety-gray-600 mb-3 text-sm">{feature.description}</p>
                <div className="text-xs text-planety-indigo font-medium">
                  ✨ {feature.benefit}
                </div>
              </div>
            ))}
          </div>
          
          {/* App preview - Right side on desktop, bottom on mobile */}
          <div className="lg:w-1/2">
            <div className="relative mx-auto max-w-sm">
              {/* Phone frame */}
              <div className="rounded-[3rem] border-8 border-planety-navy bg-planety-gray-50 p-4 shadow-glow-md overflow-hidden aspect-[9/19]">
                {/* App screen based on the active feature */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white">
                  {/* App header */}
                  <div className="absolute top-0 left-0 right-0 px-6 py-4 bg-gradient-to-r from-planety-indigo to-planety-navy backdrop-blur-md z-10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-display font-semibold text-white">Planety</h4>
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
                          <h5 className="text-lg font-display font-medium text-planety-navy">Friendship Constellation</h5>
                          <p className="text-sm text-planety-gray-600">Your friendship galaxy at a glance</p>
                        </div>
                        <div className="relative flex-1 flex items-center justify-center">
                          {/* Constellation visualization */}
                          <div className="relative w-48 h-48">
                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
                              <path d="M96 96 L144 64" stroke="#6366F1" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3,3"/>
                              <path d="M96 96 L48 128" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3,3"/>
                              <path d="M96 96 L144 128" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3,3"/>
                            </svg>
                            
                            {/* Center planet (You) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-planety-indigo to-planety-navy rounded-full flex items-center justify-center animate-float">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            
                            {/* Friend planets */}
                            <div className="absolute top-8 right-6 w-8 h-8 bg-planety-amber rounded-full flex items-center justify-center animate-float" style={{animationDelay: '0.5s'}}>
                              <Heart className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute bottom-8 left-6 w-10 h-10 bg-planety-green rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1s'}}>
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute bottom-8 right-6 w-7 h-7 bg-planety-orange rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1.5s'}}>
                              <Users className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="text-center text-xs text-planety-gray-600 mt-4">
                          Visual health tracking for all your relationships
                        </div>
                      </div>
                    )}
                    
                    {activeIndex === 1 && (
                      <div className="animate-scale-in h-full flex flex-col">
                        <div className="text-center mb-6">
                          <h5 className="text-lg font-display font-medium text-planety-navy">Cosmic Reminders</h5>
                          <p className="text-sm text-planety-gray-600">Gentle nudges for meaningful connections</p>
                        </div>
                        <div className="space-y-4">
                          {[
                            { title: "Coffee with Sarah", type: "Close Friend • 2 weeks since last contact", color: "border-planety-amber", bgColor: "bg-planety-amber/5" },
                            { title: "Share a memory with Alex", type: "Activity Buddy • Perfect timing", color: "border-planety-green", bgColor: "bg-planety-green/5" },
                            { title: "Check in with Jordan", type: "Work Network • Birthday coming up", color: "border-planety-indigo", bgColor: "bg-planety-indigo/5" },
                          ].map((reminder, i) => (
                            <div key={i} className={`rounded-xl p-4 border ${reminder.color} ${reminder.bgColor} flex justify-between items-center animate-slide-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                              <div>
                                <h6 className="font-medium text-planety-navy text-sm">{reminder.title}</h6>
                                <span className="text-xs text-planety-gray-600">{reminder.type}</span>
                              </div>
                              <button className="w-8 h-8 rounded-full bg-planety-amber/20 flex items-center justify-center">
                                <Bell className="w-4 h-4 text-planety-amber" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="text-center text-xs text-planety-gray-600 mt-6">
                          Smart timing based on your friendship patterns
                        </div>
                      </div>
                    )}
                    
                    {activeIndex === 2 && (
                      <div className="animate-scale-in h-full flex flex-col">
                        <div className="text-center mb-6">
                          <h5 className="text-lg font-display font-medium text-planety-navy">Memory Galaxy</h5>
                          <p className="text-sm text-planety-gray-600">Capture and reflect on meaningful moments</p>
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-xl p-4 bg-gradient-to-br from-planety-green/10 to-planety-indigo/10 border border-planety-green/20">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-8 h-8 rounded-full bg-planety-green flex items-center justify-center">
                                <Camera className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <h6 className="font-medium text-planety-navy text-sm">Coffee date with Sarah</h6>
                                <p className="text-xs text-planety-gray-600">Great conversation about her new job</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="w-12 h-12 bg-planety-amber/20 rounded-lg flex items-center justify-center">
                                <Camera className="w-5 h-5 text-planety-amber" />
                              </div>
                              <div className="w-12 h-12 bg-planety-indigo/20 rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-planety-indigo" />
                              </div>
                              <div className="w-12 h-12 bg-planety-green/20 rounded-lg flex items-center justify-center text-xs font-medium text-planety-green">
                                +3
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-xl p-4 border border-planety-indigo/20 bg-planety-indigo/5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-planety-indigo flex items-center justify-center">
                                <Star className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <h6 className="font-medium text-planety-navy text-sm">Alex's birthday celebration</h6>
                                <p className="text-xs text-planety-gray-600">3 shared memories • 2 weeks ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center text-xs text-planety-gray-600 mt-6">
                          Build deeper connections through shared experiences
                        </div>
                      </div>
                    )}
                    
                    {activeIndex === 3 && (
                      <div className="animate-scale-in h-full flex flex-col">
                        <div className="text-center mb-6">
                          <h5 className="text-lg font-display font-medium text-planety-navy">Growth Guidance</h5>
                          <p className="text-sm text-planety-gray-600">Gentle suggestions to nurture relationships</p>
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-xl p-4 bg-gradient-to-br from-planety-orange/10 to-planety-amber/10 border border-planety-orange/20">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-planety-orange flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <h6 className="font-medium text-planety-navy text-sm mb-1">Deepen connection with Sarah</h6>
                                <p className="text-xs text-planety-gray-600 mb-2">Try asking about her weekend hiking plans</p>
                                <div className="text-xs text-planety-orange font-medium">💡 Conversation starter</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-xl p-4 border border-planety-indigo/20 bg-planety-indigo/5">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-planety-indigo flex items-center justify-center">
                                <Heart className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <h6 className="font-medium text-planety-navy text-sm mb-1">Social planning tip</h6>
                                <p className="text-xs text-planety-gray-600 mb-2">Suggest a low-key coffee instead of big group events</p>
                                <div className="text-xs text-planety-indigo font-medium">🌱 Growth suggestion</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-xl p-4 border border-planety-green/20 bg-planety-green/5">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-planety-green flex items-center justify-center">
                                <Star className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <h6 className="font-medium text-planety-navy text-sm mb-1">Celebrate milestone</h6>
                                <p className="text-xs text-planety-gray-600 mb-2">Jordan's work anniversary is next week</p>
                                <div className="text-xs text-planety-green font-medium">🎉 Opportunity</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center text-xs text-planety-gray-600 mt-4">
                          Personalized guidance to strengthen bonds
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
