
import { useState, useEffect } from 'react';
import { Users, Heart, Star, Bell } from 'lucide-react';
const features = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Friend Dashboard",
    description: "See who needs a check‑in at a glance.",
    color: "text-planety-indigo",
    bgColor: "bg-planety-indigo/10",
    borderColor: "border-planety-indigo/20"
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Smart Reminders",
    description: "Gentle nudges based on your rhythm.",
    color: "text-planety-amber",
    bgColor: "bg-planety-amber/10",
    borderColor: "border-planety-amber/20"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Conversation Notes",
    description: "Remember what matters to each person.",
    color: "text-planety-green",
    bgColor: "bg-planety-green/10",
    borderColor: "border-planety-green/20"
  }
];

const Features = () => {

  return (
    <section id="features-section" className="py-10 sm:py-12 lg:py-14 bg-muted/50 scroll-mt-24">
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
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 transition-all duration-300 ease-out border border-planety-gray-200/70 hover:border-planety-indigo/20 hover:shadow-glow-sm"
              >
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 ${feature.color} ${feature.borderColor} border`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-medium mb-2 text-planety-navy">{feature.title}</h3>
                <p className="text-planety-gray-600 mb-3 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Spacer for balance on large screens */}
          <div className="hidden lg:block lg:w-1/3" />
        </div>
      </div>
    </section>
  );
};

export default Features;
