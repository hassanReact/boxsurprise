import React, { useState } from 'react';
import { useSignUp } from "@clerk/clerk-react";
import { UserCircle2, Mail, Lock, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { useSignIn } from '@clerk/clerk-react';


interface SignUpResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
  };
}

function UserSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {isLoaded, signUp} = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralId: '',
  });

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords don't match");
    }
    if (formData.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    // Add more validation as needed
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data:", formData); // Debugging step

    try {

      // Validate form before submission
      validateForm();
      if (!isLoaded) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    console.log("Sending firstName:", formData.firstName);
    console.log("Sending lastName:", formData.lastName);

    // 1️⃣ Clerk pe user create karo
    await signUp.create({
      emailAddress: formData.email,
      password: formData.password,
      // first_name: formData.firstName,
      // last_name: formData.lastName,  
    });

    // 2️⃣ OTP send karo
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

    setPendingVerification(true);
    setSuccess("OTP sent to your email. Please enter the code.");

      // API call
      const response = await fetch(`${process.env.BASE_URL}/api/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,

        }),
      });

      const data: SignUpResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Handle successful signup
      setSuccess('Account created successfully! Please check your email for verification.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        referralId: '',
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!isLoaded) return;
    await signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/oauth-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  const handleFacebookSignup = async () => {
    if (!isLoaded) return;
    try {
        await signUp.authenticateWithRedirect({
            strategy: "oauth_facebook",
            redirectUrl: "/oauth-callback",
            redirectUrlComplete: "/dashboard",
        });
    } catch (error) {
        console.error("Facebook Signup Error:", error);
    }
};

  const handleVerifyOTP = async () => {
    try {
      if (!isLoaded) return;
  
      setIsLoading(true);
      setError(null);
      setSuccess(null);
  
      // 3️⃣ OTP verify karo
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });
  
      if (completeSignUp.status === "complete") {
        setSuccess("Account created successfully! You can now log in.");

      // ✅ 2 second delay ke baad redirect karein
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
        setPendingVerification(false);
        setFormData({ ...formData, email: "", password: "", confirmPassword: "" });
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid verification code.");
    } finally {
      setIsLoading(false);
    }
  };

//   const handleOAuthLogin = async (provider: "oauth_google" | "oauth_facebook") => {
//     try {
//         setIsLoading(true);
//         setError(null);
//         setSuccess(null);

//         if (!signIn) {
//             throw new Error("Sign-in resource is not initialized. Please try again.");
//         }

//         await signIn.authenticateWithRedirect({
//           strategy: provider,
//           redirectUrl: "/dashboard",
//           redirectUrlComplete: '/dashboard'
//         });

//         setSuccess("Redirecting to OAuth provider...");
//     } catch (err) {
//         setError(err instanceof Error ? err.message : "OAuth login error. Please try again.");
//     } finally {
//         setIsLoading(false);
//     }
// };


  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error and success messages when user starts typing
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 my-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Join Our Network</h1>
          <p className="text-gray-500">Create your account and start your journey to success</p>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600">{success}</p>
          </div>
        )}

        {/* Form */}
        {!pendingVerification ? (
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 block">
                First Name
              </label>
              <div className="relative">
                <UserCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Enter your first name"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 block">
                Last Name
              </label>
              <div className="relative">
                <UserCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Enter your last name"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Enter your phone number"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
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
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              required
              disabled={isLoading}
              className="mt-1 h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500">
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 focus:outline-none transition-colors duration-200 flex items-center justify-center space-x-2 font-medium ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Social Login Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleSignup}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-medium"
            // disabled={isLoading}
          >
            <span>Sign Up with Google</span>
          </button>
          <button
            onClick={handleFacebookSignup}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
            // disabled={isLoading}
          >
            <span>Sign Up with Facebook</span>
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
            Sign in here
          </a>
        </p>
        </form>
        )
        : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="text"
              placeholder="Verification Code"
              className="w-full border p-3 rounded"
              onChange={(e) => setOtpCode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded"
            >
              Verify Email
            </button>
          </form>
        )}
        
      </div>
    </div>
  );
}

export default UserSignUp;
