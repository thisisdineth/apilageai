
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Send, Bot, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';

const Hero = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'ai', message: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll chat to bottom when new messages arrive
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = orbitRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (clientX - centerX) / 25;
      const moveY = (clientY - centerY) / 25;
      
      orbitRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, {type: 'user', message: chatInput}]);
    setIsLoading(true);
    
    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'ai', 
        message: "I'm your Sri Lankan AI assistant. I can help you with information about local contexts, languages, and cultural nuances. What would you like to know?"
      }]);
      setIsLoading(false);
    }, 1000);
    
    setChatInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Search query:', searchQuery);
    // You can add more logic for search handling
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-spin-slow"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="container-section relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="chip mb-4">
                <Sparkles size={12} className="mr-1" />
                Introducing Sri Lanka's First Advanced AI Model
              </div>
            </motion.div>
            
            <motion.h1 
              className="heading-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Discover the Future of <span className="text-primary">AI</span> for Sri Lanka
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A cutting-edge AI solution designed specifically for Sri Lankan users, 
              understanding local context, languages, and cultural nuances.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href="#features" className="btn-primary">
                Explore Features
                <ArrowRight size={16} className="ml-2" />
              </a>
              
              <form onSubmit={handleSearch} className="flex-1">
                <div className="glass flex items-center px-4 py-2 w-full">
                  <Search size={18} className="text-primary/70 mr-2 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder="Ask me anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-none shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
                  />
                  <Button type="submit" size="sm" variant="ghost" className="hover:bg-primary/10">
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </form>
              
              <a href="#about" className="btn-outline">
                Learn More
              </a>
            </motion.div>
            
            <motion.div 
              className="pt-8 text-muted-foreground flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-foreground">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm">Trusted by 1000+ organizations across Sri Lanka</p>
            </motion.div>
          </motion.div>
          
          {/* Right side with floating AI visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div ref={orbitRef} className="relative mx-auto w-full max-w-md transition-transform duration-200 ease-out">
              {/* Main circle with AI model representation */}
              <div className="aspect-square rounded-full bg-white shadow-xl flex items-center justify-center relative overflow-hidden border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    {/* AI brain visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border-4 border-primary/30 animate-pulse-slow"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 rounded-full border-4 border-primary/20 animate-spin-slow"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1/2 h-1/2 rounded-full bg-primary/10 animate-pulse-slow"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1/4 h-1/4 rounded-full bg-primary animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat box floating element that opens dialog when clicked */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer animate-float-fast hover:shadow-xl"
                onClick={() => setChatOpen(true)}
              >
                <Bot size={28} className="text-primary mb-2" />
                <div className="text-sm font-medium text-center">Ask Me Anything</div>
              </motion.div>
              
              {/* Orbiting elements */}
              <div className="absolute top-10 -right-6 w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float">
                <div className="text-primary font-bold">සිංහල</div>
              </div>
              
              <div className="absolute bottom-10 -left-6 w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-primary font-bold">தமிழ்</div>
              </div>
              
              <div className="absolute top-1/2 -left-14 transform -translate-y-1/2 w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="font-bold">ML</div>
              </div>
              
              <div className="absolute top-1/3 -right-14 w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="font-bold">NLP</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden max-h-[80vh]">
          <div className="flex flex-col h-[550px]">
            <div className="p-4 bg-primary/5 border-b">
              <h3 className="font-semibold text-lg flex items-center">
                <Bot size={18} className="mr-2 text-primary" />
                SriAI Assistant
              </h3>
              <p className="text-sm text-muted-foreground">
                Ask me anything about Sri Lankan AI solutions
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Bot size={30} className="mx-auto mb-2 text-primary/60" />
                  <p>How can I assist you today?</p>
                </div>
              )}
              
              {chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted max-w-[80%] rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="min-h-[50px] resize-none"
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon" 
                  disabled={isLoading || !chatInput.trim()}
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
