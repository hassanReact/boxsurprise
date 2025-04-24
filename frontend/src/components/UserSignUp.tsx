import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const SignUpForm = () => {
  const navigate = useNavigate();
  const { referralId: token } = useParams<{ referralId: string }>();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [_error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // const env = import.meta.env.VITE_SERVER_URI;


  const signUp = `${import.meta.env.VITE_SERVER_URI}/api/auth/signup`
  const inviteSignUp = token
  ? `${import.meta.env.VITE_SERVER_URI}/api/referral/accept/${token}`
  : signUp;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log('Form Data:', data);

    setIsLoading(true);
    try {
      const response = await fetch( inviteSignUp , {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone,
          referralId: data.referralId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.message || "Something went wrong");
        setIsLoading(false);
        return;
      }

      const responseData = await response.json();
      console.log(responseData.referralId);
      navigate("/verify-user");
      // alert('Sign up successful!');
      reset();
      // navigate("/verify-user");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError("An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch('password');

  // SVG icons for visibility toggle
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-600 to-purple-700">
        <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <div className="text-xl font-semibold text-gray-800">Creating your account...</div>
          <p className="text-gray-500 mt-2">This will only take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01]">
          {/* Header */}
          <div className="relative py-8 px-8 bg-gradient-to-r from-indigo-600 to-purple-700">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
                <path fill="white" d="M37,-65.1C43.3,-55.3,40.6,-36.3,47.2,-22.1C53.8,-7.9,69.8,1.4,70.8,10.2C71.7,19,57.5,27.2,46.1,35.5C34.7,43.8,26,52.3,15.4,57.1C4.8,61.9,-7.8,63,-21.3,61.2C-34.9,59.3,-49.5,54.5,-57.1,44.2C-64.8,33.9,-65.6,18,-64.9,2.9C-64.1,-12.1,-61.9,-26.4,-54.2,-36.8C-46.5,-47.2,-34.2,-53.7,-22.1,-60.6C-10,-67.5,1.9,-74.7,12.9,-72.8C23.9,-70.9,30.7,-74.9,37,-65.1Z" transform="translate(100 100)" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white text-center relative z-10">Join Our Network</h2>
            <p className="text-indigo-100 text-center mt-2 relative z-10">Start your journey to financial freedom today</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="py-8 px-8 space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{`${errors.firstName.message}`}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{`${errors.lastName.message}`}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="john.doe@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{`${errors.email.message}`}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone Number is required' })}
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="123-456-7890"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{`${errors.phone.message}`}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••"
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{`${errors.password.message}`}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register('confirmPassword', {
                      required: 'Confirm password is required',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                    className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••"
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{`${errors.confirmPassword.message}`}</p>
                )}
              </div>
            </div>

            {/* Referral ID */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Referral ID (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  {...register('referralId')}
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter referral code if you have one"
                />
              </div>
            </div> */}

            {/* Error Message */}
            {_error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{_error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-gray-600 pt-2">
              Already have an account? 
              <a href="/login" className="text-indigo-600 hover:text-indigo-800 ml-1 font-medium">
                Sign In
              </a>
            </div>
          </form>
          
          {/* Footer */}
          <div className="bg-gray-50 px-8 py-5 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
        
        {/* Bottom text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-indigo-800">
            Join thousands of successful members in our network
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;