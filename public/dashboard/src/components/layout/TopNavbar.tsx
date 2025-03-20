
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface TopNavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ toggleSidebar }) => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 flex items-center px-4 md:px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl bg-gradient-to-r from-apilage-600 to-apilage-500 bg-clip-text text-transparent">
              Apilage AI
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/" className="menu-item">
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link to="/chat" className="menu-item">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">Go to Chat</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
