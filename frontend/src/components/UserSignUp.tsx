import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [_error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const env = import.meta.env.VITE_SERVER_URI;

  const onSubmit = async (data: any) => {
    console.log('Form Data:', data);

    setIsLoading(true);
    try {
      const response = await fetch(`${env}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone,
          referralId: "", // optional
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.message || "Something went wrong");
        setIsLoading(false);
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
      alert('Sign up successful!');
      reset();
      navigate("/verify-user");
    } catch (err: any) {
      console.error(err);
      setError("An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch('password');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 border rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      {/* FIRST NAME */}
      <div className="mb-4">
        <label className="block mb-1">First Name</label>
        <input
          type="text"
          {...register('firstName', { required: 'First name is required' })}
          className="w-full border p-2 rounded"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{`${errors.firstName.message}`}</p>}
      </div>

      {/* LAST NAME */}
      <div className="mb-4">
        <label className="block mb-1">Last Name</label>
        <input
          type="text"
          {...register('lastName', { required: 'Last name is required' })}
          className="w-full border p-2 rounded"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{`${errors.lastName.message}`}</p>}
      </div>

      {/* PHONE */}
      <div className="mb-4">
        <label className="block mb-1">Phone</label>
        <input
          type="number"
          {...register('phone', { required: 'Phone Number is required' })}
          className="w-full border p-2 rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{`${errors.phone.message}`}</p>}
      </div>

      {/* EMAIL */}
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>}
      </div>

      {/* PASSWORD */}
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="mb-4">
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Confirm password is required',
            validate: (value) =>
              value === password || 'Passwords do not match',
          })}
          className="w-full border p-2 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{`${errors.confirmPassword.message}`}</p>
        )}
      </div>

      {/* SHOW BACKEND ERROR */}
      {_error && (
        <div className="text-red-500 text-sm mb-4">
          {_error}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
