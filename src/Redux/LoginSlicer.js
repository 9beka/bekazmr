import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_HOST_API } from "../config";

export const REGISTR_USER = createAsyncThunk(
  "register/REGISTR_USER_ASYNC",
  async (formData, { rejectWithValue, dispatch }) => {
    console.log(formData, "FROM SLICER");
    const { name, email, password } = formData;
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/authRoutes/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const finalData = await response.json();
      dispatch(GET_USER());
      if (!response.ok) {
        dispatch(setValidationErrors(finalData.errors));
      }
      if (finalData.token) localStorage.setItem("token", finalData.token);
      return finalData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const LOGIN_USER = createAsyncThunk(
  "register/LOGIN_USER_ASYNC",
  async (formData, { rejectWithValue, dispatch }) => {
    const { email, password } = formData;
    console.log(formData, "FROM SLICER");
    try {
      const response = await fetch(`${BACKEND_HOST_API}/authRoutes/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      const finalData = await response.json();
      if (!response.ok) {
        console.log(finalData.errors);
        dispatch(setValidationErrors(finalData.errors));
      }
      if (finalData.token) localStorage.setItem("token", finalData.token);
      dispatch(GET_USER());
      return finalData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const GET_USER = createAsyncThunk(
  "api/user/GET_USER",
  async (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await fetch(
      `${BACKEND_HOST_API}/authRoutes/get/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  token: localStorage.getItem("token") || null,
  error: null,
  validation: [],
  validationErrors: [],
  existsUSer: "",
  UserData: [],
};
const RegistrationSlicer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setValidationErrors(state, action) {
      state.validationErrors = action.payload;
    },
    cleaerValidationErrors(state, action) {
      state.validationErrors = [];
    },
    clearUser(state, action) {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REGISTR_USER.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);
      state.existsUSer = action.payload.message;

      state.validation = action.payload;
      state.data = action.payload;
      state.token = action.payload.token;
    });
    builder.addCase(REGISTR_USER.rejected, (state, action) => {
      console.log("rejected", action);
      console.log(action.payload);
      state.error = action.payload;
    });
    builder.addCase(REGISTR_USER.pending, (state, action) => {
      console.log("pending", action);
      state.error = null;
      state.existsUSer = null;
      state.validationErrors = [];
      state.token = null;
    });
    builder.addCase(GET_USER.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);
      state.UserData = action.payload;
    });
    builder.addCase(GET_USER.rejected, (state, action) => {
      console.log("rejected", action);
    });
    builder.addCase(GET_USER.pending, (state, action) => {
      console.log("pending", action);
      state.error = null;
    });

    builder.addCase(LOGIN_USER.fulfilled, (state, action) => {
      console.log("FULLFILLED", action);
      state.error = null;
      state.existsUSer = action.payload.message;
      state.validation = action.payload;
      state.data = action.payload;
      state.token = action.payload.token;
    });
    builder.addCase(LOGIN_USER.rejected, (state, action) => {
      console.log("rejected", action);
      state.error = action;
    });
    builder.addCase(LOGIN_USER.pending, (state, action) => {
      console.log("rejected", action);
      state.existsUSer = null;
      state.validationErrors = [];
    });
  },
});
export const { setValidationErrors, cleaerValidationErrors, clearUser } =
  RegistrationSlicer.actions;
export default RegistrationSlicer.reducer;
