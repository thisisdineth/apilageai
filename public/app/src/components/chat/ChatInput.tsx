
import { useState } from 'react';
import { SendHorizontal, Plus } from 'lucide-react';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };
  
  return (
    <div className="sticky bottom-0 py-4 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Teach me with an @Video..."
            className="chat-input"
            autoComplete="off"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
              <Plus size={20} />
            </button>
            <button type="button" className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm">
              DeepTutor
            </button>
            <button 
              type="submit" 
              disabled={!message.trim()} 
              className={`p-1 transition-colors ${message.trim() ? 'text-gray-600 hover:text-gray-800' : 'text-gray-300'}`}
            >
              <SendHorizontal size={20} />
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-400 mt-3 text-right">
          Feynman may make mistakes. Check important info and please report any bugs.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
