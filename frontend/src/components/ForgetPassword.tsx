import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // "email" -> "code" -> "success"
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ ${result.message}`);
        console.log(result.message);
        setStep("code");
      } else {
        setMessage(`❌ ${result.message || "Failed to send reset email."}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("❌ An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      {message && (
      <p
        className={`text-center mb-4 ${
          message.startsWith("✅") ? "text-green-600" : "text-red-500"
        }`}
      >
        {message}
      </p>
    )}
        {step === "email" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              Forgot Password?
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Enter your email to receive a reset code.
            </p>
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
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-3 rounded"
              >
                Send Reset Code
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
