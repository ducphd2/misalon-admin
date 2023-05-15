import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ServiceGroupApi from "../../service/ServiceGroup/ServiceGroup";
import { RootState } from "../../store";
import {
  DeleteServiceGroupReq,
  EditServiceGroupReq,
  GetServiceGroupReq,
  ServiceGroupRes,
  ServiceGroupState,
} from "../../types/ServiceGroup/serviceGroup";

const initialState: ServiceGroupState = {
  listServiceGroups: {
    items: [],
    meta: 0,
  },

  loading: false,
  deleteStatusServiceGroup: false,
  errors: {},
};

export const getServiceGroups = createAsyncThunk(
  "serviceGroupReducer/getServiceGroup",
  async (body: GetServiceGroupReq, thunkAPI) => {
    try {
      const res: any = await ServiceGroupApi.getServiceGroups(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addServiceGroup = createAsyncThunk(
  "serviceGroupReducer/addServiceGroup",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await ServiceGroupApi.addServiceGroup(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editServiceGroup = createAsyncThunk(
  "serviceGroupReducer/editServiceGroup",
  async (body: EditServiceGroupReq, thunkAPI) => {
    try {
      const res: any = await ServiceGroupApi.editServiceGroup(body, body.id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteServiceGroup = createAsyncThunk(
  "serviceGroupReducer/deleteServiceGroup",
  async (body: DeleteServiceGroupReq, thunkAPI) => {
    try {
      const res: any = await ServiceGroupApi.deleteServiceGroup(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const serviceGroupSlice = createSlice({
  name: "ServiceGroupReducer",
  initialState,
  reducers: {
    resetLoadingAndErrors: (state: any) => {
      state.errors = {};
      state.loading = false;
    },
    resetStatusDeleteServiceGroup: (state, action) => {
      state.deleteStatusServiceGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getServiceGroups.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getServiceGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.listServiceGroups = action?.payload.result;
    });
    builder.addCase(getServiceGroups.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(addServiceGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addServiceGroup.fulfilled, (state, action) => {
      state.loading = false;
      const newObj = action?.payload.result.group;
      state.listServiceGroups.items = [
        newObj,
        ...state.listServiceGroups.items,
      ];
      state.listServiceGroups.meta.total++;
      toast.success("Thêm chi nhánh thành công !", {
        position: "top-right",
      });
    });
    builder.addCase(addServiceGroup.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Thêm chi nhánh lỗi !", {
        position: "top-right",
      });
    });
    builder.addCase(editServiceGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editServiceGroup.fulfilled, (state, action) => {
      state.loading = false;
      const serviceGroup = action?.payload.result.group;
      let newArr = state.listServiceGroups.items.map((item: ServiceGroupRes) =>
        item.id === serviceGroup.id ? { ...item, ...serviceGroup } : item
      );
      state.listServiceGroups.items = [...newArr];
      toast.success("Cập nhật chi nhánh thành công!", {
        position: "top-right",
      });
    });
    builder.addCase(editServiceGroup.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(deleteServiceGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteServiceGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteStatusServiceGroup = true;
      toast.success("Xóa chi nhánh thành công!", {
        position: "top-right",
      });
      state.listServiceGroups.meta.total--;
    });
    builder.addCase(deleteServiceGroup.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Xóa chi nhánh lỗi !", {
        position: "top-right",
      });
    });
  },
});

export const { resetLoadingAndErrors, resetStatusDeleteServiceGroup } =
  serviceGroupSlice.actions;

export const selectServiceGroupList = (state: RootState) =>
  state.serviceGroupReducer.listServiceGroups.items;
export const selectStatusDeleteServiceGroup = (state: RootState) =>
  state.serviceGroupReducer.deleteStatusServiceGroup;
export const selectTotalServiceGroup = (state: RootState) =>
  state.serviceGroupReducer.listServiceGroups.meta.total;
export const selectLoadingServiceGroup = (state: RootState) =>
  state.serviceGroupReducer.loading;

export default serviceGroupSlice.reducer;
