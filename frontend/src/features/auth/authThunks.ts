import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './authTypes';

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  User,            // ✅ return type
  LoginData,       // ✅ arg type
  { rejectValue: string }
>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      return data.user as User;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);