import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../hooks';
import { setUser } from '../features/auth/authSlice';

const VerifyUser = () => {
  const dispatch = useAppDispatch()
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const handleVerify = async () => {
    try {

      const response: Response = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
        "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: Number(token) }),
        }
      );
      const data = await response.json();
      dispatch(setUser({
        id: data.user.id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        phoneNumber: data.user.phone,
        referral_id: data.user.referralId || null,
        createdAt: data.user.createdAt,
      }));
      setMessage(data.message);
      navigate('/dashboard')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      setMessage("Verification failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          User Verification
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your verification number below. This helps us confirm your identity and keep your account secure.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Verification Code
        </label>
        <input
          type="number"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="e.g. 123456"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Verify Now
        </button>

        {message && (
          <div className="mt-5 text-center text-sm text-green-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyUser;
