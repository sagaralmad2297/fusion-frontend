import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/signupSlice"; // Correct import

const store = configureStore({
  reducer: {
    auth: signupReducer, // Ensure it matches `useSelector((state) => state.auth.darkMode)`
  },
});

export default store;
