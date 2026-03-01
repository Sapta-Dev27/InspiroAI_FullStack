import { Link } from "react-router-dom";
import { Hammer } from "lucide-react";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-xl">

        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-6 rounded-full">
            <Hammer size={48} className="text-blue-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚧 Feature Under Construction
        </h1>

        <p className="text-gray-600 mb-8">
          This feature is currently being built.
          We're working hard to bring it to you soon.
          Stay tuned for updates!
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UnderConstruction;