import { Heart, Globe, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 sm:py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_100%,rgba(120,78,198,0.15),transparent)]"></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-8 sm:mb-12">
          {/* Logo and description */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-space-purple flex items-center justify-center mr-2 sm:mr-3">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">Planety</span>
            </div>
            <p className="text-sm sm:text-base text-foreground/70 max-w-md">
              A friendly, private space to nurture meaningful relationships through playful interactions and gentle reminders.
            </p>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Product</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#features" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">Features</a></li>
                <li><a href="#how-it-works" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">How It Works</a></li>
                <li><a href="#testimonials" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Legal</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">Privacy</a></li>
                <li><a href="#" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">Terms</a></li>
                <li><a href="#" className="text-sm sm:text-base text-foreground/70 hover:text-space-purple transition-colors duration-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-foreground/10">
          <p className="text-xs sm:text-sm text-foreground/60 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Planety. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="#" className="text-foreground/60 hover:text-space-purple transition-colors duration-300">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-foreground/60 hover:text-space-purple transition-colors duration-300">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-foreground/60 hover:text-space-purple transition-colors duration-300">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
