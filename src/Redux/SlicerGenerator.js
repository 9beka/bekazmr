import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_HOST_API } from "../config";
export const GENERATE_IMG_ASYNC = createAsyncThunk(
  "generate/GENERATE_IMG_ASYNC",
  async (formData, { rejectWithValue, dispatch }) => {
    console.log(formData, "FROM SLICER");
    const {Field ,Size,Quantity} =formData
    try {
      const response = await fetch(`${BACKEND_HOST_API}/generatorRoutes/generator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const finalData = await response.json();
      return finalData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  IMGdata: [],
};
const GenerateSlicer = createSlice({
  name: "generate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GENERATE_IMG_ASYNC.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);
      state.IMGdata = action.payload;
    });
    builder.addCase(GENERATE_IMG_ASYNC.rejected, (state, action) => {
      console.log("rejected", action);
    });
    builder.addCase(GENERATE_IMG_ASYNC.pending, (state, action) => {
      console.log("pending", action);
      state.IMGdata = null;
    });
  },
});
export default GenerateSlicer.reducer;
