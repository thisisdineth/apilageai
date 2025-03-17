
import { Square, Calculator, Leaf } from 'lucide-react';
import ChatCard from './ChatCard';

const ChatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
      <ChatCard 
        icon={<Calculator size={24} />} 
        title="Teach me about the Quadratic Formula" 
        iconBgColor="bg-blue-50"
        iconColor="text-blue-500"
      />
      
      <ChatCard 
        icon={<Square size={24} />} 
        title="Graph the Derivative of f(x) = x^2"
        iconBgColor="bg-red-50"
        iconColor="text-red-500"
      />
      
      <ChatCard 
        icon={<Leaf size={24} />} 
        title="Explain the structure of a plant cell"
        iconBgColor="bg-green-50"
        iconColor="text-green-500"
      />
    </div>
  );
};

export default ChatCards;
