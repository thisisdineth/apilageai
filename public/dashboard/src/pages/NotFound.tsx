
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-apilage-500 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for cannot be found.</p>
        <div className="space-x-4">
          <Button asChild>
            <Link to="/" className="bg-apilage-500 hover:bg-apilage-600">
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/profile">
              Go to Profile
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
