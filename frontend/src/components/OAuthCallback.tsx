import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      console.log("✅ User successfully signed in via Google OAuth!");
      navigate("/dashboard"); // Redirect user to dashboard
    } else {
      console.error("❌ OAuth sign-in failed, redirecting...");
      navigate("/login"); // Redirect back to login page
    }
  }, [isSignedIn, isLoaded, navigate]);

  return <p>Redirecting...</p>;
};

export default OAuthCallback;
