import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_HOST_API } from "../config";
const url = `${BACKEND_HOST_API}/crmRoutes/get-fakeshop`;
export const GET_FAKESHOP = createAsyncThunk(
  "get-fakeshop/GET_FAKESHOP",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const finalData = await response.json();
      return finalData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const GET_DETAILS_SHOP = createAsyncThunk(
  "get-fakeshop/GET_DETAILS_SHOP",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/crmRoutes/fakeshop/detail/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const finalData = await response.json();
      return finalData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const DELETE_PRODUCT = createAsyncThunk(
  "fakeshop/DELETE_PRODUCT",
  async (id, { rejectWithValue, dispatch, getState }) => {
    console.log(id);
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/crmRoutes/fakeshop/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      dispatch(GET_FAKESHOP());
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const EDIT_PRODUCT = createAsyncThunk(
  "fakeshop/EDIT_PRODUCT",
  async ({ _id, formData }, { rejectWithValue, dispatch, getState }) => {
    console.log(_id, formData, "from SlicerCrm");
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/crmRoutes/edit/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);

      dispatch(GET_FAKESHOP());
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const POST_PHOTO = createAsyncThunk(
  "photo/POST_PHOTO",
  async ({ formData, _id }, { rejectWithValue, dispatch, getState }) => {
    console.log(formData, _id);
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/crmRoutes/items/${_id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      console.log(response);
      const data = await response.json();
      dispatch(GET_FAKESHOP());
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const NEW_PRODUCT = createAsyncThunk(
  "product/NEW_PRODUCT",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    console.log(formData, "NEW_PRODUCT formDATA");
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/crmRoutes/post/new-product`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
      const data = await response.json();
      dispatch(GET_FAKESHOP());
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
const initialState = {
  fakeData: [],
  fakeDetail: [],
  fakeError: null,
  getCurrentID: null,
};

const CrmSlicer = createSlice({
  name: "CRM",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GET_FAKESHOP.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);
      state.fakeData = action.payload;
    });
    builder.addCase(GET_FAKESHOP.rejected, (state, action) => {
      console.log("rejected", action);
      state.fakeError = action.payload;
    });
    builder.addCase(GET_FAKESHOP.pending, (state, action) => {
      console.log("pending", action);
      state.fakeError = null;
    });
    builder.addCase(NEW_PRODUCT.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);
      state.fakeData.push(action.payload);
    });
    builder.addCase(NEW_PRODUCT.rejected, (state, action) => {
      console.log("rejected", action);
      state.fakeError = action.payload;
    });
    builder.addCase(NEW_PRODUCT.pending, (state, action) => {
      console.log("pending", action);
      state.fakeError = null;
    });
    builder.addCase(GET_DETAILS_SHOP.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);
      state.fakeDetail = action.payload;
    });
    builder.addCase(GET_DETAILS_SHOP.rejected, (state, action) => {
      console.log("rejected", action);
      state.fakeError = action.payload;
    });
    builder.addCase(GET_DETAILS_SHOP.pending, (state, action) => {
      console.log("pending", action);
      state.fakeError = null;
    });
    builder.addCase(POST_PHOTO.fulfilled, (state, action) => {
      console.log("FULLFILLED", action);
      state.error = null;
      state.fakeData = action.payload;
    });
  },
});
export default CrmSlicer.reducer;
