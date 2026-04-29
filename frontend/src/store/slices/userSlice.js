import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  vitals: null,
  records: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserVitals: (state, action) => {
      state.vitals = action.payload;
    },
    setRecords: (state, action) => {
      state.records = action.payload;
    },
    clearUserData: (state) => {
      state.profile = null;
      state.vitals = null;
      state.records = [];
    },
  },
});

export const { setUserProfile, setUserVitals, setRecords, clearUserData } = userSlice.actions;
export default userSlice.reducer;
