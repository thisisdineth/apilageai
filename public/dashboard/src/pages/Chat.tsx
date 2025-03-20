
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Chat Page</h1>
        <p className="text-gray-600 mb-8">Chat functionality would be implemented here.</p>
        <Button asChild>
          <Link to="/profile" className="bg-apilage-500 hover:bg-apilage-600">
            Go to Profile
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Chat;
