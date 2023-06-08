import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ServiceApi from "../../service/Service/Service";
import { RootState } from "../../store";

import { EmployeeState, GetEmployeeReq } from "../../types/Employee/user";
import { httpService } from "../../service/httpService";

const initialState: EmployeeState = {
  listEmpoyee: {
    items: [],
    meta: 0,
  },

  loading: false,
  deleteStatusEmployee: false,
  errors: {},
};

export const getServices = createAsyncThunk(
  "serviceReducer/getService",
  async (body: GetEmployeeReq, thunkAPI) => {
    try {
      const res: any = await ServiceApi.getServices(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "serviceReducer/addService",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await httpService.POST({
        uri:'',
        request: body
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
