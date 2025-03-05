import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL; // Load from .env


export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    console.log("reeeeeeeeeeeeeeeeeeee",response)
    return response.data;
  } catch (error) {
    console.log("ererrrrr",error)
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
