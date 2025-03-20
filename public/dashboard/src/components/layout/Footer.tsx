
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-100 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Apilage AI. All rights reserved.
          </div>
          
          <nav className="flex items-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <Link 
              to="/privacy" 
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/docs" 
              className="hover:text-foreground transition-colors duration-200"
            >
              Documentation
            </Link>
            <Link 
              to="/cookies" 
              className="hover:text-foreground transition-colors duration-200"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
