
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar/Sidebar";
import ChatCards from '@/components/chat/ChatCards';
import ChatInput from '@/components/chat/ChatInput';
import { Paperplane } from '@/components/icons/Paperplane';

const Index = () => {
  const [greeting, setGreeting] = useState('Good morning');
  const username = 'Dineth';
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <div className="flex h-full w-full">
      <Sidebar username={username} />
      
      <main className="flex-1 flex flex-col bg-white h-full relative overflow-auto">
        <div className="flex-1 p-4">
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white overflow-hidden">
              <span className="text-xs font-medium">D</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center animate-fade-in animate-slide-up pt-20 pb-6">
            <Paperplane className="w-16 h-16 mb-4" />
            <h1 className="text-2xl font-medium text-gray-800 tracking-tight">
              {greeting}, {username}
            </h1>
          </div>
          
          <ChatCards />
          
          <div className="h-32"></div> {/* Spacer */}
        </div>
        
        <ChatInput />
      </main>
    </div>
  );
};

export default Index;
