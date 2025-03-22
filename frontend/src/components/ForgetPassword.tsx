import { useState } from "react";
import { useSignIn, useClerk } from "@clerk/clerk-react"; // Import useClerk
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { isLoaded, signIn } = useSignIn();
  const { signOut } = useClerk(); // Get signOut function
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("email"); // "email" -> "code" -> "success"
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setStep("code"); // Move to next step
      setMessage("A verification code has been sent to your email.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = (error as { errors?: { message: string }[] }).errors?.[0]?.message || "Failed to send reset email.";
        setMessage(errorMessage);
      } else {
        setMessage("Failed to send reset email.");
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        // Sign out the user before redirecting
        signOut(() => {
          setMessage("Password reset successful! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = (error as { errors?: { message: string }[] }).errors?.[0]?.message || "Failed to reset password.";
        setMessage(errorMessage);
      } else {
        setMessage("Failed to reset password.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {step === "email" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Forgot Password?</h2>
            <p className="text-center text-gray-600 mb-4">Enter your email to receive a reset code.</p>
            {message && <p className="text-green-500 text-center">{message}</p>}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border p-3 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-pink-600 text-white p-3 rounded">
                Send Reset Code
              </button>
            </form>
          </>
        )}

        {step === "code" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Enter Verification Code</h2>
            <p className="text-center text-gray-600 mb-4">Check your email for the code.</p>
            {message && <p className="text-red-500 text-center">{message}</p>}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="text"
                name="code"
                placeholder="Enter the code"
                className="w-full border p-3 rounded"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                className="w-full border p-3 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-pink-600 text-white p-3 rounded">
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
