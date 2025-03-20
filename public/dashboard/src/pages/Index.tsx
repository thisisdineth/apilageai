
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to Apilage AI",
      description: "Your AI-powered chat application dashboard.",
      duration: 5000,
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-lg">
        <div className="mb-6 animate-float">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-16 h-16 mx-auto text-apilage-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-apilage-700 to-apilage-500 bg-clip-text text-transparent">
          Apilage AI
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Your intelligent AI chat assistant
        </p>
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full md:w-auto bg-apilage-500 hover:bg-apilage-600">
            <Link to="/chat">
              Start Chatting
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
            <Link to="/profile">
              View Profile
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
