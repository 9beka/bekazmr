import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER } from "./LoginSlicer";
import { BACKEND_HOST_API } from "../config";
export const CHANGE_USER = createAsyncThunk(
  "change/CHANGE_USER",
  async ({ formData, id }, { rejectWithValue, dispatch }) => {
    console.log(formData, "FROM SLICER");
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/authRoutes/change-user/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      console.log(response);

      const finalData = await response.json();
      dispatch(GET_USER());
      return finalData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  UserData: [],
};
const ProfileChangeSlicer = createSlice({
  name: "ProfileChangeSlicer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CHANGE_USER.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);

      state.profileData = action.payload;
    });
    builder.addCase(CHANGE_USER.rejected, (state, action) => {
      console.log("rejected", action);
    });
    builder.addCase(CHANGE_USER.pending, (state, action) => {
      console.log("pending", action);
      state.error = null;
      state.existsUSer = null;
      state.validationErrors = [];
    });
  },
});
export default ProfileChangeSlicer.reducer;
