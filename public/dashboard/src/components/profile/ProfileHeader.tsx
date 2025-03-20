
import React from 'react';
import { Camera, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileHeader: React.FC = () => {
  return (
    <div className="relative w-full h-64 md:h-80 mb-20 overflow-hidden rounded-b-3xl">
      {/* Cover Photo */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 cover-gradient"></div>
        <img 
          src="https://images.unsplash.com/photo-1655635643568-f30d5abc618a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Profile Picture */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="relative group">
          <img 
            src="https://ui-avatars.com/api/?name=Apilage+User&background=f83a3a&color=fff&size=128" 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <button className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Camera className="text-white h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Edit Cover Button */}
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit Cover
      </Button>
    </div>
  );
};

export default ProfileHeader;
