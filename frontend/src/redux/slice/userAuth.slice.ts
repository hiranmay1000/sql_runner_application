import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserInitialState } from "../types/types.userAuth";
import { SignupPayloadType } from "../../types.global/type.signup";
import { LoginPayloadType } from "../../types.global/type.login";
import { userLoginAPI, userRegisterAPI } from "../../api/auth.api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: LoginPayloadType, thunkAPI: any) => {
    try {
      const res = await userLoginAPI({ email, password });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    { firstname, lastname, email, password }: SignupPayloadType,
    thunkAPI: any
  ) => {
    try {
      const res = await userRegisterAPI({
        firstname,
        lastname,
        email,
        password,
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState: UserInitialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userAuthSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state: UserInitialState) => {
      state.user = null;
      state.token = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { error?: string })?.error || "Login failed";
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { error?: string })?.error ||
          "Unable to create user";
      });
  },
});

export const { logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
