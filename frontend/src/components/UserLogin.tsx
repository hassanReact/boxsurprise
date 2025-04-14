import { useState } from 'react';
import { ArrowRight } from 'lucide-react';



function UserLogin() {
  const [_showPassword, _setShowPassword] = useState(false);

  // const _navigate = useNavigate();

  const handleLogin = async () => {
  };

  const handleRegister = async () => {
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500">Enter your credentials to access your account</p>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 focus:outline-none transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            <span>Sign In</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            <span>Sign Up</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-purple-600 hover:text-purple-500 font-medium">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
