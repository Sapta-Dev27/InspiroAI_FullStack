import { Link } from 'react-router-dom';
import { Lock, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-red-600" size={48} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            You don't have permission to access this page. Please login to continue.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login">
            <Button size="lg">
              Login to Continue
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline">
              <Home size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
