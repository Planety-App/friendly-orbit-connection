import { CheckCircle, Star, Heart, Users } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const EmailValidation = () => {
  const { trackButtonClick } = useAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-planety-indigo/5 to-planety-amber/5 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Success animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Central success icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-planety-green rounded-full flex items-center justify-center shadow-lg animate-scale-in">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          
          {/* Orbiting planets */}
          <div className="absolute top-4 right-8 w-6 h-6 bg-planety-amber rounded-full flex items-center justify-center animate-float" style={{animationDelay: '0.5s'}}>
            <Star className="w-3 h-3 text-white" />
          </div>
          <div className="absolute bottom-4 left-8 w-8 h-8 bg-planety-indigo rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1s'}}>
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div className="absolute bottom-4 right-4 w-5 h-5 bg-planety-green rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1.5s'}}>
            <Users className="w-3 h-3 text-white" />
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-planety-amber rounded-full animate-pulse-soft"></div>
          <div className="absolute top-8 left-0 w-1 h-1 bg-planety-indigo rounded-full animate-pulse-soft" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-planety-green rounded-full animate-pulse-soft" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Success content */}
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-planety-navy mb-4">
          Email Validated!
        </h1>
        <h2 className="text-xl font-display font-medium text-planety-indigo mb-4">
          Welcome to Your Friendship Galaxy
        </h2>
        <p className="text-planety-gray-600 mb-8 leading-relaxed">
          Your email has been confirmed. You're ready to start your friendship journey and transform how you maintain meaningful relationships.
        </p>

        {/* Action button */}
        <div className="flex justify-center mb-8">
          <a
            href="/"
            className="button-secondary flex items-center justify-center"
            onClick={() => trackButtonClick('Learn More', 'email_validation', '/')}
          >
            Learn More
          </a>
        </div>

        {/* Trust indicator */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-planety-indigo/10">
          <p className="text-sm text-planety-gray-600">
            Your friendship data is secure and private. Ready to explore your cosmic connections?
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailValidation;
