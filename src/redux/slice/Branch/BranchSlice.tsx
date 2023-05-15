import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import BranchApi from "../../service/Branch/Branch";
import { RootState } from "../../store";
import {
  DeleteBranchReq,
  EditBranchReq,
  GetBranchReq,
  BranchRes,
  BranchState,
} from "../../types/Branch/branch";

const initialState: BranchState = {
  listBranchs: {
    items: [],
    meta: 0,
  },

  loading: false,
  deleteStatusBranch: false,
  errors: {},
};

export const getBranchs = createAsyncThunk(
  "branchReducer/getBranch",
  async (body: GetBranchReq, thunkAPI) => {
    try {
      const res: any = await BranchApi.getBranchs(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addBranch = createAsyncThunk(
  "branchReducer/addBranch",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await BranchApi.addBranch(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editBranch = createAsyncThunk(
  "branchReducer/editBranch",
  async (body: EditBranchReq, thunkAPI) => {
    try {
      const res: any = await BranchApi.editBranch(body, body.id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "branchReducer/deleteBranch",
  async (body: DeleteBranchReq, thunkAPI) => {
    try {
      const res: any = await BranchApi.deleteBranch(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const branchSlice = createSlice({
  name: "BranchReducer",
  initialState,
  reducers: {
    resetLoadingAndErrors: (state: any) => {
      state.errors = {};
      state.loading = false;
    },
    resetStatusDeleteBranch: (state, action) => {
      state.deleteStatusBranch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBranchs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBranchs.fulfilled, (state, action) => {
      state.loading = false;
      state.listBranchs = action?.payload.result;
    });
    builder.addCase(getBranchs.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(addBranch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBranch.fulfilled, (state, action) => {
      state.loading = false;
      const type = action.meta.arg.typeBranch;
      const newObj = action?.payload.result.branch;
      newObj.type = [type];
      state.listBranchs.items = [newObj, ...state.listBranchs.items];
      state.listBranchs.meta.total++;
      toast.success("Thêm chi nhánh thành công !", {
        position: "top-right",
      });
    });
    builder.addCase(addBranch.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Thêm chi nhánh lỗi !", {
        position: "top-right",
      });
    });
    builder.addCase(editBranch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editBranch.fulfilled, (state, action) => {
      state.loading = false;
      const branch = action?.payload.result.branch;
      let newArr = state.listBranchs.items.map((item: BranchRes) =>
        item.id === branch.id ? { ...item, ...branch } : item
      );
      state.listBranchs.items = [...newArr];
      toast.success("Cập nhật chi nhánh thành công!", {
        position: "top-right",
      });
    });
    builder.addCase(editBranch.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(deleteBranch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBranch.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteStatusBranch = true;
      toast.success("Xóa chi nhánh thành công!", {
        position: "top-right",
      });
      state.listBranchs.meta.total--;
    });
    builder.addCase(deleteBranch.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Xóa chi nhánh lỗi !", {
        position: "top-right",
      });
    });
  },
});

export const { resetLoadingAndErrors, resetStatusDeleteBranch } =
  branchSlice.actions;

export const selectBranchList = (state: RootState) =>
  state.branchReducer.listBranchs.items;
export const selectStatusDeleteBranch = (state: RootState) =>
  state.branchReducer.deleteStatusBranch;
export const selectTotalBranch = (state: RootState) =>
  state.branchReducer.listBranchs.meta.total;
export const selectLoadingBranch = (state: RootState) =>
  state.branchReducer.loading;

export default branchSlice.reducer;
