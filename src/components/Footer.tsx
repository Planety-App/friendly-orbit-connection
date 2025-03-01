
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-space-purple flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">Planety</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Nurturing friendships in a digital age
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">About</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">Blog</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">Privacy</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">Terms</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">Cookies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">Contact</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">Twitter</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-space-purple transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/50 text-center text-sm text-foreground/60">
          <p>© {currentYear} Planety. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
