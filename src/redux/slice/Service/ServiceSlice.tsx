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

export const getServices = createAsyncThunk(
  "serviceReducer/getService",
  async (body: GetServiceReq, thunkAPI) => {
    try {
      const res: any = await ServiceApi.getServices(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addService = createAsyncThunk(
  "serviceReducer/addService",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await ServiceApi.addService(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editService = createAsyncThunk(
  "serviceReducer/editService",
  async (body: EditServiceReq, thunkAPI) => {
    try {
      const res: any = await ServiceApi.editService(body, body.id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteService = createAsyncThunk(
  "serviceReducer/deleteService",
  async (body: DeleteServiceReq, thunkAPI) => {
    try {
      const res: any = await ServiceApi.deleteService(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const serviceSlice = createSlice({
  name: "ServiceReducer",
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
    builder.addCase(getServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.loading = false;
      state.listServices = action?.payload.result;
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(addService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addService.fulfilled, (state, action) => {
      state.loading = false;
      const newObj = action?.payload.result.service;
      state.listServices.items = [
        newObj,
        ...state.listServices.items,
      ];
      state.listServices.meta.total++;
      toast.success("Thêm chi nhánh thành công !", {
        position: "top-right",
      });
    });
    builder.addCase(addService.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Thêm chi nhánh lỗi !", {
        position: "top-right",
      });
    });
    builder.addCase(editService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editService.fulfilled, (state, action) => {
      state.loading = false;
      const service = action?.payload.result.service;
      let newArr = state.listServices.items.map((item: ServiceRes) =>
        item.id === service.id ? { ...item, ...service } : item
      );
      state.listServices.items = [...newArr];
      toast.success("Cập nhật chi nhánh thành công!", {
        position: "top-right",
      });
    });
    builder.addCase(editService.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(deleteService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteStatusService = true;
      toast.success("Xóa chi nhánh thành công!", {
        position: "top-right",
      });
      state.listServices.meta.total--;
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Xóa chi nhánh lỗi !", {
        position: "top-right",
      });
    });
  },
});

export const { resetLoadingAndErrors, resetStatusDeleteService } =
  serviceSlice.actions;

export const selectServiceList = (state: RootState) =>
  state.serviceReducer.listServices.items;
export const selectStatusDeleteService = (state: RootState) =>
  state.serviceReducer.deleteStatusService;
export const selectTotalService = (state: RootState) =>
  state.serviceReducer.listServices.meta.total;
export const selectLoadingService = (state: RootState) =>
  state.serviceReducer.loading;

export default serviceSlice.reducer;
