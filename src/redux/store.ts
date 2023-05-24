import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slice/Authen/login";
import branchReducer from "../redux/slice/Branch/BranchSlice";
import serviceGroupReducer from "../redux/slice/ServiceGroup/ServiceGroupSlice";
import serviceReducer from "../redux/slice/Service/ServiceSlice";
import userReducer from "../redux/slice/User/UserSlice";
import bookingReducer from "../redux/slice/Booking/BookingSlice";
import conversation from "../redux/slice/Conversation/Conversation";
import resetRecentlyMessages from "../redux/slice/RecentlyMessages/RecentlyMessages"
export const store = configureStore({
  reducer: {
    loginReducer,
    branchReducer,
    serviceGroupReducer,
    serviceReducer,
    bookingReducer,
    userReducer,
    conversation,
    resetRecentlyMessages
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
