import React, { useState } from 'react';
import { useSignIn } from "@clerk/clerk-react";
import { Eye, EyeOff, UserCircle2, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';

interface Props{ onLogin: (role: string) => void; }

function UserLogin({onLogin}:Props) {

  const responseGoogle = async  (authResult) => {
    try {
      if(authResult['code']){
        
      }
      console.log(authResult);
    } catch (error) {
      console.log(error);
    }
  }

  const GoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // const {signOut} = useClerk();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
  
    try {
      const result = await signIn.create({
        identifier: formData.email, // Using email as identifier
        password: formData.password,
      });
  
      console.log("SignIn Result:", result);
  
      if (result.status === "complete") {
        console.log("Session ID:", result.createdSessionId);
  
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          navigate("/dashboard");
          onLogin("user");
        } else {
          setError("Session creation failed. Please try again.");
        }
      } else {
        console.log("Sign-in incomplete, result:", result);
        setError("Login could not be completed. Try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Login Error:", err);
  
      if (err.errors) {
        if (err.errors[0]?.code === "not_found") {
          setError("User not found. Please sign up first.");
        } else if (err.errors[0]?.code === "incorrect_password") {
          setError("Incorrect password. Please try again.");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      } else {
        setError("An unexpected error occurred. Try again later.");
      }
    }
  };
  
  const googleLogin = () =>{

  }

//   const handleGoogleSignIn = async () => {
//   if (!isLoaded || !signIn) return;

//   try {
//     await signIn.authenticateWithRedirect({
//       strategy: "oauth_google",
//       redirectUrl: "/oauth-callback",
//       redirectUrlComplete: "/dashboard",
//     });
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     console.error("Google Sign-In Error:", err);

//     if (err.errors && err.errors[0]?.code === "not_found") {
//       setError("No account found. Please sign up first.");
//     } else {
//       setError("Google Sign-In failed. Try again.");
//     }
//   }
// };
  

  const handleFacebookSignIn = async () => {
    if (!isLoaded || !signIn) return; // Agar Clerk load nahi hua ya signIn unavailable hai, toh return kar do
  
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_facebook",
        redirectUrl: "/oauth-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("Facebook Sign-In Error:", err);
      setError("Facebook Sign-In failed. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500">Enter your credentials to access your account</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700 block">
              Username
            </label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 focus:outline-none transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            <span>Sign In</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Google Login Button */}
        <div className="">
          <button
            onClick={googleLogin}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Continue with Google
          </button>
        </div>

        {/* Google Login Button */}
        <div className="">
          <button
            onClick={handleFacebookSignIn}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Continue with Facebook
          </button>
        </div>

        <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-pink-600 hover:underline text-sm font-medium">
              Forgot your password?
            </Link>
          </div>
        </form>

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