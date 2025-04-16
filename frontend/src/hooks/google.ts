export const googleAuth = async (code: string) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/auth/google?code=${code}`, {
      method: 'GET',
      credentials: 'include', // important for cookies
    });
  
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Something went wrong');
    }
  
    return response.json(); // same as result.data
  };
  