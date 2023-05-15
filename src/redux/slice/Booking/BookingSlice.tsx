import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import BookingApi from "../../service/Booking/Booking";
import { RootState } from "../../store";
import {
  DeleteBookingReq,
  EditBookingReq,
  GetBookingReq,
  BookingRes,
  BookingState,
} from "../../types/Booking/booking";

const initialState: BookingState = {
  listBookings: {
    items: [],
    meta: 0,
  },

  loading: false,
  deleteStatusBooking: false,
  errors: {},
};

export const getBookings = createAsyncThunk(
  "bookingReducer/getBooking",
  async (body: GetBookingReq, thunkAPI) => {
    try {
      const res: any = await BookingApi.getBookings(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addBooking = createAsyncThunk(
  "bookingReducer/addBooking",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await BookingApi.addBooking(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editBooking = createAsyncThunk(
  "bookingReducer/editBooking",
  async (body: EditBookingReq, thunkAPI) => {
    try {
      const res: any = await BookingApi.editBooking(body, body.id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookingReducer/deleteBooking",
  async (body: DeleteBookingReq, thunkAPI) => {
    try {
      const res: any = await BookingApi.deleteBooking(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const bookingSlice = createSlice({
  name: "BookingReducer",
  initialState,
  reducers: {
    resetLoadingAndErrors: (state: any) => {
      state.errors = {};
      state.loading = false;
    },
    resetStatusDeleteBooking: (state, action) => {
      state.deleteStatusBooking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.listBookings = action?.payload.result;
    });
    builder.addCase(getBookings.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(addBooking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBooking.fulfilled, (state, action) => {
      state.loading = false;
      const newObj = action?.payload.result.group;
      state.listBookings.items = [
        newObj,
        ...state.listBookings.items,
      ];
      state.listBookings.meta.total++;
      toast.success("Thêm cuộc hẹn thành công !", {
        position: "top-right",
      });
    });
    builder.addCase(addBooking.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Thêm cuộc hẹn lỗi !", {
        position: "top-right",
      });
    });
    builder.addCase(editBooking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editBooking.fulfilled, (state, action) => {
      state.loading = false;
      const booking = action?.payload.result.booking;
      let newArr = state.listBookings.items.map((item: BookingRes) =>
        item.id === booking.id ? { ...item, ...booking } : item
      );
      state.listBookings.items = [...newArr];
      toast.success("Cập nhật cuộc hẹn thành công!", {
        position: "top-right",
      });
    });
    builder.addCase(editBooking.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
    });
    builder.addCase(deleteBooking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteStatusBooking = true;
      toast.success("Xóa cuộc hẹn thành công!", {
        position: "top-right",
      });
      state.listBookings.meta.total--;
    });
    builder.addCase(deleteBooking.rejected, (state, action) => {
      state.loading = false;
      state.errors = action?.error;
      toast.error("Xóa chi nhánh lỗi !", {
        position: "top-right",
      });
    });
  },
});

export const { resetLoadingAndErrors, resetStatusDeleteBooking } =
  bookingSlice.actions;

export const selectBookingList = (state: RootState) =>
  state.bookingReducer.listBookings.items;
export const selectStatusDeleteBooking = (state: RootState) =>
  state.bookingReducer.deleteStatusBooking;
export const selectTotalBooking = (state: RootState) =>
  state.bookingReducer.listBookings.meta.total;
export const selectLoadingBooking = (state: RootState) =>
  state.bookingReducer.loading;

export default bookingSlice.reducer;
