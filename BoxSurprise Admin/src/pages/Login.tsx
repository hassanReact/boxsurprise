import React, { useState } from 'react';
import { Facebook } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";

interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate and send credentials to an API
    onLogin('user'); // or 'admin' based on response
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">MLM Network</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="space-y-4 mb-6">
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors">
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Facebook className="w-5 h-5 mr-2" />
            Sign in with Facebook
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Keep me signed in
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </a>
          </p>
        </div>

        {/* For demo purposes only */}
        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">Demo quick access:</p>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => onLogin('user')}
              className="py-1 px-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              Login as User
            </button>
            <button 
              onClick={() => onLogin('admin')}
              className="py-1 px-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;