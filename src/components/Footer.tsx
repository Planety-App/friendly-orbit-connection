import { Heart, Globe, Twitter, Instagram, Linkedin, Mail, Star } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 relative overflow-hidden bg-planety-gray-50">
      <div className="container px-4 mx-auto">
        {/* Newsletter signup */}
        <div className="text-center mb-6 pb-6 border-b border-planety-gray-200 px-4">
          <h3 className="text-lg font-display font-medium text-planety-navy mb-2">
            Get friendship tips in your inbox
          </h3>
          <p className="text-sm text-planety-gray-600 mb-4">
            Practical advice for maintaining better friendships
          </p>
          <div className="flex flex-col sm:flex-row w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-3 py-2 text-sm border border-planety-gray-200 rounded-lg focus:outline-none focus:border-planety-indigo"
            />
            <button className="w-full sm:w-auto px-4 py-2 bg-planety-indigo text-white rounded-lg text-sm hover:bg-planety-navy transition-colors">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          {/* Logo and description */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-planety-indigo flex items-center justify-center mr-2">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-display font-semibold text-planety-navy">Planety</span>
            </div>
            <p className="text-sm text-planety-gray-600 max-w-md">
              Never lose touch with friends again. Simple reminders and tracking for better relationships.
            </p>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className="font-display font-medium mb-2 text-sm text-planety-navy">Features</h4>
              <ul className="space-y-1">
                <li><a href="#features-section" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Friend Dashboard</a></li>
                <li><a href="#features-section" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Smart Reminders</a></li>
                <li><a href="#features-section" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Conversation Tracker</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-medium mb-2 text-sm text-planety-navy">Resources</h4>
              <ul className="space-y-1">
                <li><a href="mailto:app.planety@gmail.com?subject=Friendship Guide Request" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Friendship Guide</a></li>
                <li><a href="mailto:app.planety@gmail.com?subject=Community" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Community</a></li>
                <li><a href="mailto:app.planety@gmail.com?subject=Support Request" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-medium mb-2 text-sm text-planety-navy">Trust</h4>
              <ul className="space-y-1">
                <li><a href="/privacy" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Privacy Promise</a></li>
                <li><a href="/terms" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Terms</a></li>
                <li><a href="mailto:app.planety@gmail.com?subject=Security" className="text-xs text-planety-gray-600 hover:text-planety-indigo transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-planety-gray-200">
          <p className="text-xs text-planety-gray-600 mb-2 sm:mb-0">
            © {currentYear} Planety. Made with <Heart className="w-3 h-3 inline text-planety-indigo" /> for meaningful friendships.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs text-planety-gray-600">
              <Star className="w-3 h-3 mr-1 text-planety-amber" />
              10,000+ friends connected
            </div>
            <div className="flex space-x-3">
              <a href="https://twitter.com/Danielislucky" target="_blank" rel="noopener noreferrer" className="text-planety-gray-600 hover:text-planety-indigo transition-colors" aria-label="Follow Daniel on Twitter/X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/upsidedan24" target="_blank" rel="noopener noreferrer" className="text-planety-gray-600 hover:text-planety-indigo transition-colors" aria-label="Follow Daniel on Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/_planety.app" target="_blank" rel="noopener noreferrer" className="text-planety-gray-600 hover:text-planety-indigo transition-colors" aria-label="Follow Planety on Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
