
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Wallet, 
  CreditCard, 
  BarChart3, 
  LogOut, 
  Trash2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const isMobile = useIsMobile();
  
  const sidebarClasses = isMobile
    ? `fixed top-0 left-0 bottom-0 z-50 w-72 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`
    : `${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`;
    
  return (
    <aside 
      className={`bg-white border-r border-gray-100 flex flex-col h-screen ${sidebarClasses}`}
    >
      <div className="flex items-center justify-between p-4 h-16">
        {(!isMobile || isOpen) && (
          <span className="font-semibold text-lg">
            My Profile
          </span>
        )}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto" 
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img 
              src="https://ui-avatars.com/api/?name=Apilage+User&background=f83a3a&color=fff" 
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
          </div>
          {(!isMobile || isOpen) && (
            <div className="mt-3 text-center">
              <h3 className="font-medium">Apilage User</h3>
              <p className="text-sm text-muted-foreground">user@example.com</p>
            </div>
          )}
        </div>
      </div>
      
      <Separator />
      
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          <li>
            <Link 
              to="/profile/edit" 
              className="menu-item active"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <User className="h-5 w-5" />
              {(!isMobile || isOpen) && <span>Edit Profile</span>}
            </Link>
          </li>
          <li>
            <Link 
              to="/profile/balance" 
              className="menu-item"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <Wallet className="h-5 w-5" />
              {(!isMobile || isOpen) && <span>My Balance</span>}
            </Link>
          </li>
          <li>
            <Link 
              to="/profile/credits" 
              className="menu-item"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <CreditCard className="h-5 w-5" />
              {(!isMobile || isOpen) && <span>Buy Credits</span>}
            </Link>
          </li>
          <li>
            <Link 
              to="/profile/usage" 
              className="menu-item"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <BarChart3 className="h-5 w-5" />
              {(!isMobile || isOpen) && <span>Usage</span>}
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-2 mt-auto">
        <Separator className="my-2" />
        <ul className="space-y-1">
          <li>
            <button 
              className="menu-item w-full text-left"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <LogOut className="h-5 w-5" />
              {(!isMobile || isOpen) && <span>Sign Out</span>}
            </button>
          </li>
          <li>
            <button 
              className="menu-item w-full text-left text-apilage-500"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <Trash2 className="h-5 w-5" />
              {(!isMobile || isOpen) && <span>Delete Profile</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
