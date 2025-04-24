import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({password : newPassword }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${result.message || "Failed to reset password."}`);
      }
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border p-3 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
