import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../hooks/google';

function UserLogin() {
  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (authResult) => {
      try {
        const response = await googleAuth(authResult.code);
        console.log('Login success:', response);
        // redirect or store token
      } catch (error) {
        console.error('Google login error:', error);
      }
    },
    onError: (err) => {
      console.error('Google login failed:', err);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => handleGoogleLogin()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default UserLogin;
