import LinkButton from "@/components/app-ui/LinkButton";
import { FaExclamationTriangle } from "react-icons/fa";
import { useLocation} from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center space-y-3 px-6 py-10">
      <FaExclamationTriangle className="text-red-500 text-5xl sm:text-6xl md:text-7xl mb-4" />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
        {location.pathname} - Page Not Found
      </h1>
      <p className="text-gray-600 mt-2 max-w-md sm:max-w-lg md:max-w-xl">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <LinkButton className="text-sm mt-5">Go back to Home</LinkButton>
    </div>
  );
}
