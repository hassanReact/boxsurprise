import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // "email" -> "code" -> "success"
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setStep("code"); // Move to next step
      setMessage(response.status === 200 ? "Check your email for the reset code." : "Failed to send reset email.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = (error as { errors?: { message: string }[] }).errors?.[0]?.message || "Failed to send reset email.";
        setMessage(errorMessage);
      } else {
        setMessage("Failed to send reset email.");
      }
    }
  };

  // const handleResetPassword = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/auth/reset-password/${code}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ newPassword }),
  //     });
  //     const result = await response.json();

  //     if (result.status === "complete") {
  //       navigate('/login'); // Redirect to login page after successful reset
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       const errorMessage = (error as { errors?: { message: string }[] }).errors?.[0]?.message || "Failed to reset password.";
  //       setMessage(errorMessage);
  //     } else {
  //       setMessage("Failed to reset password.");
  //     }
  //   }
  // };

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
      </div>
    </div>
  );
};

export default ForgotPassword;
