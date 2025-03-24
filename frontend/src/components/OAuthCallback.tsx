import { useEffect, useState } from "react";
import { useClerk, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const { handleRedirectCallback } = useClerk();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        await handleRedirectCallback(); // Handle OAuth redirect
        if (user) {
          console.log("User Info:", user);

          // Check if user is actually registered
          if (user.createdAt) {
            console.log("✅ User already registered. Redirecting to dashboard...");
            navigate("/dashboard");
          } else {
            console.log("🆕 New user detected. Redirecting to register...");
            navigate("/register");
          }
        } else {
          console.log("❌ No user data found. Redirecting to login...");
          navigate("/login");
        }
      } catch (err) {
        console.error("OAuth Error:", err);
        setError("Authentication failed. Please try again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    handleOAuth();
  }, [handleRedirectCallback, user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {loading ? (
        <p className="text-lg font-semibold text-gray-700">Signing you in...</p>
      ) : (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
};

export default OAuthCallback;
