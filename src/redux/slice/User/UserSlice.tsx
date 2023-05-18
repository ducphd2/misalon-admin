import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ServiceApi from "../../service/Service/Service";
import { RootState } from "../../store";
import {
  DeleteServiceReq,
  EditServiceReq,
  GetServiceReq,
  ServiceRes,
  ServiceState,
} from "../../types/Service/service";

const initialState: ServiceState = {
  listServices: {
    items: [],
    meta: 0,
  },

  loading: false,
  deleteStatusService: false,
  errors: {},
};

export const getUsers = createAsyncThunk(
  "userReducer/getService",
  async (body: GetServiceReq, thunkAPI) => {
    try {
      const res: any = await ServiceApi.getServices(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addUsers = createAsyncThunk(
  "userReducer/addService",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await ServiceApi.addService(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editUsers = createAsyncThunk(
  "userReducer/editService",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await ServiceApi.editService(body, body.id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "userReducer/deleteService",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await ServiceApi.deleteService(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    resetLoadingAndErrors: (state: any) => {
      state.errors = {};
      state.loading = false;
    },
    resetStatusDeleteService: (state, action) => {
      state.deleteStatusService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.listServices = action?.payload.result;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(addUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUsers.fulfilled, (state, action) => {
      state.loading = false;
      const newObj = action?.payload.result.service;
      state.listServices.items = [newObj, ...state.listServices.items];
      state.listServices.meta.total++;
      toast.success("Thêm chi nhánh thành công !", {
        position: "top-right",
      });
    });
    builder.addCase(addUsers.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Thêm chi nhánh lỗi !", {
        position: "top-right",
      });
    });
    builder.addCase(editUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUsers.fulfilled, (state, action) => {
      state.loading = false;
      const service = action?.payload.result.service;
      let newArr = state.listServices.items.map((item: any) =>
        item.id === service.id ? { ...item, ...service } : item
      );
      state.listServices.items = [...newArr];
      toast.success("Cập nhật chi nhánh thành công!", {
        position: "top-right",
      });
    });
    builder.addCase(editUsers.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(deleteUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteStatusService = true;
      toast.success("Xóa chi nhánh thành công!", {
        position: "top-right",
      });
      state.listServices.meta.total--;
    });
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Xóa chi nhánh lỗi !", {
        position: "top-right",
      });
    });
  },
});

export const { resetLoadingAndErrors, resetStatusDeleteService } =
  userSlice.actions;

export const selectServiceList = (state: RootState) =>
  state.serviceReducer.listServices.items;
export const selectStatusDeleteService = (state: RootState) =>
  state.serviceReducer.deleteStatusService;
export const selectTotalService = (state: RootState) =>
  state.serviceReducer.listServices.meta.total;
export const selectLoadingService = (state: RootState) =>
  state.serviceReducer.loading;

export default userSlice.reducer;
