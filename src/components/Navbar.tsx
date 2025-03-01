
import { useState, useEffect } from 'react';
import { Heart, Menu, X, Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') as Theme || 'system';
    setTheme(savedTheme);
    
    // Apply the theme
    const applyTheme = (newTheme: Theme) => {
      const htmlElement = document.documentElement;
      
      if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    };
    
    applyTheme(savedTheme);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);
  
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply the theme
    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-lg shadow-sm' : 'py-5'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full bg-space-purple flex items-center justify-center transition-all duration-300 ${isScrolled ? 'scale-90' : ''}`}>
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Planety</h1>
          </a>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="font-medium hover:text-space-purple transition-colors">Features</a>
            <a href="#" className="font-medium hover:text-space-purple transition-colors">How It Works</a>
            <a href="#" className="font-medium hover:text-space-purple transition-colors">About</a>
            <a href="#" className="font-medium hover:text-space-purple transition-colors">FAQ</a>
          </nav>
          
          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-muted/70 flex items-center justify-center transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5" />
              ) : theme === 'dark' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <div className="relative">
                  <Sun className="w-5 h-5 absolute opacity-0 animate-pulse" />
                  <Moon className="w-5 h-5" />
                </div>
              )}
            </button>
            
            <button className="button-primary">
              Join Waitlist
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-muted/70 flex items-center justify-center transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5" />
              ) : theme === 'dark' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <div className="relative">
                  <Sun className="w-5 h-5 absolute opacity-0 animate-pulse" />
                  <Moon className="w-5 h-5" />
                </div>
              )}
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-full bg-muted/70 flex items-center justify-center transition-colors hover:bg-muted"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen py-4 shadow-md' : 'max-h-0 py-0'
        }`}
      >
        <div className="container px-4 mx-auto">
          <nav className="flex flex-col gap-4">
            <a 
              href="#" 
              className="font-medium py-2 hover:text-space-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#" 
              className="font-medium py-2 hover:text-space-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#" 
              className="font-medium py-2 hover:text-space-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#" 
              className="font-medium py-2 hover:text-space-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            
            <div className="pt-4 mt-4 border-t border-border">
              <button 
                className="button-primary w-full flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Waitlist
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
