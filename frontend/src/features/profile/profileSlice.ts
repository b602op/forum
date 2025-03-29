import { createSlice } from '@reduxjs/toolkit';

export interface ProfileState {
  name: string;
  email: string;
  avatarUrl: string;
}

const initialState: ProfileState = {
  name: '',
  email: '',
  avatarUrl: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      return action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
