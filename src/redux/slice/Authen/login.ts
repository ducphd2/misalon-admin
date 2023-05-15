import { useNavigate } from "react-router-dom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from "../../service/Authen/login";
import { RootState } from "../../store";
import { LoginReq, LoginRes, LoginState } from "../../types/Login/login";
import { toast } from "react-toastify";

// Define the initial state using that type
const initialState: LoginState = {
  authUser: {
    createdAt: "",
    email: "",
    employee: null,
    resetPasswordToken: "",
    role: "",
    updatedAt: "",
    username: "",
    __v: 0,
    _id: "",
  },
  accessToken: "",
  loading: false,
  errors: {},
};

export const getLoginUser = createAsyncThunk(
  "loginReducer/handleLogin",
  async (body: LoginReq, thunkAPI) => {
    try {
      const res: LoginRes = await loginApi.login(body);
      return { ...res };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "loginReducer",

  initialState,
  reducers: {
    resetLoginState: (state: LoginState) => {
      state.errors = {};
      state.loading = false;
    },
    resetAuthUserState: (state: LoginState, action) => {
      state.authUser = action.payload;
    },
    logout: (state: LoginState) => {
      state.accessToken = "";
      state.authUser = {
        createdAt: "",
        email: "",
        employee: null,
        resetPasswordToken: "",
        role: "",
        updatedAt: "",
        username: "",
        __v: 0,
        _id: "",
      };
      localStorage.removeItem("authUser");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    //LOGIN
    builder.addCase(getLoginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLoginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action?.payload.result.accessToken;
      state.authUser = action?.payload.result.user;
      localStorage.setItem(
        "authUser",
        JSON.stringify(action?.payload.result.user)
      );
      if (action?.payload.result.merchant) {
        localStorage.setItem(
          "merchant",
          JSON.stringify(action?.payload.result.merchant)
        );
      }
      localStorage.setItem(
        "authUser",
        JSON.stringify(action?.payload.result.user)
      );
      localStorage.setItem("accessToken", action?.payload.result.accessToken);
      localStorage.setItem("refreshToken", action?.payload.result.refreshToken);
    });
    builder.addCase(getLoginUser.rejected, (state, action) => {
      state.loading = false;
      toast.error("Something went wrong !", {
        position: "top-right",
      });
    });
  },
});

export const { resetLoginState, resetAuthUserState, logout } =
  loginSlice.actions;

export const selectAuthUser = (state: RootState) => state.loginReducer.authUser;
export const selectAccessToken = (state: RootState) => {
  const accessToken =
    state.loginReducer.accessToken || localStorage.getItem("accessToken");
  return accessToken;
};

export default loginSlice.reducer;
