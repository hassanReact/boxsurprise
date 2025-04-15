import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  createdAt:string ,
  phoneNumber: string |null,
  referral_id: string | null;
  role?: string;
  isVerified?: boolean;
}

const initialState: {
  user: UserType | null,
  isAuthenticated: boolean,
  loader: boolean,
} = {
  user: null,
  isAuthenticated: false,
  loader: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;