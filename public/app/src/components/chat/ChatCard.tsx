
import React from 'react';

interface ChatCardProps {
  icon: React.ReactNode;
  title: string;
  iconBgColor?: string;
  iconColor?: string;
}

const ChatCard = ({ icon, title, iconBgColor = "bg-blue-50", iconColor = "text-blue-500" }: ChatCardProps) => {
  return (
    <div className="chat-card animate-fade-in">
      <div className={`${iconBgColor} ${iconColor} p-3 rounded-full`}>
        {icon}
      </div>
      <p className="text-center mt-1 text-sm font-medium text-gray-600">{title}</p>
    </div>
  );
};

export default ChatCard;
