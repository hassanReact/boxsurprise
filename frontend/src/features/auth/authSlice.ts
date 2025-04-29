import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  id: string,
  name: string,
  email: string,
  createdAt:string ,
  phoneNumber: string |null,
  referral_id: string | null;
  role?: string;
  isVerified?: boolean;
  imageUrl?: string | null;
  directReferrals?: {
    referralId: string;
  }[];
  partOfReferral: boolean 
} 

const initialState: {
  user: UserType | null,
  isAuthenticated: boolean,
  loader: boolean,
  isAdmin: boolean,
} = {
  user: null,
  isAuthenticated: false,
  loader: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      console.log("User Role", action.payload.role)
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
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setDirectReferrals: (state, action: PayloadAction<UserType['directReferrals']>) => {
      if (state.user) {
        state.user.directReferrals = action.payload;
      }
    },
  },
});

export const { setUser, logout, setLoading, setAdmin, setDirectReferrals } = authSlice.actions;
export default authSlice.reducer;