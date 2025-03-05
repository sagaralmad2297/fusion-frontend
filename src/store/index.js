import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/signupSlice"; // Correct import
import productReducer from "./slices/productSlice";
import loginReducer from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    auth: signupReducer,
    login: loginReducer, // Ensure it matches `useSelector((state) => state.auth.darkMode)`
    products: productReducer,
  },
});

export default store;
