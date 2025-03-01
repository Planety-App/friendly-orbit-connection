
import { useState } from 'react';
import { Rocket, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Please enter your email",
        description: "We need your email to add you to the waitlist.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "You're on the waitlist!",
        description: "We'll notify you when Planety launches. Thank you for your interest!",
        variant: "default",
      });
      
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-space-purple/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 rounded-full bg-space-blue/10 blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 lg:p-16 bg-gradient-to-br from-space-purple/20 to-space-blue/20 relative overflow-hidden">
          {/* Decorative floating stars */}
          <div className="absolute top-8 left-8 text-space-purple/30 animate-float" style={{animationDelay: '0.5s'}}>
            <Star className="w-6 h-6" />
          </div>
          <div className="absolute bottom-8 right-12 text-space-blue/30 animate-float" style={{animationDelay: '1.2s'}}>
            <Star className="w-8 h-8" />
          </div>
          <div className="absolute top-1/2 right-8 text-space-orange/30 animate-float" style={{animationDelay: '0.8s'}}>
            <Star className="w-5 h-5" />
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Friendships?
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Join the Planety waitlist today and be the first to experience a new way of nurturing meaningful connections.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-space-purple/50 text-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="button-primary flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Rocket className="w-5 h-5 mr-2" />
                )}
                Join Waitlist
              </button>
            </div>
          </form>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center space-x-2 text-space-purple">
              <div className="w-10 h-10 rounded-full bg-space-purple/20 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <span>100% Private</span>
            </div>
            <div className="w-px h-6 bg-border hidden md:block"></div>
            <div className="flex items-center space-x-2 text-space-blue">
              <div className="w-10 h-10 rounded-full bg-space-blue/20 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <span>No Social Media</span>
            </div>
            <div className="w-px h-6 bg-border hidden md:block"></div>
            <div className="flex items-center space-x-2 text-space-orange">
              <div className="w-10 h-10 rounded-full bg-space-orange/20 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <span>Free Beta Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
