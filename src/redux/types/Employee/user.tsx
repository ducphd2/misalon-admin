export interface EmployeeState {
  listEmpoyee: { items: any; meta: any };
  loading: boolean;
  deleteStatusEmployee: boolean;
  errors: object;
}

export interface UserRes {
  id: string;
  merchantId?: string;
  groupId?: number;
  sku?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  initialPrice?: number;
  durationHour?: number;
  durationMinute?: number;
  canPrintableInvoice?: boolean;
}

export interface UserReq {
  // pageSize: number;
}

export enum EUserGender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}
export interface AddUserReq {
  email: string,
  password: string,
  fullName:string,
  role: number,
  branchId: string,
  phoneNumber: string,
  address: string,
  status: number,
  gender: EUserGender
}

export interface AddUserRes {
  message: string;
}

export interface EditUserRes {
  message: string;
}

export interface EditUserReq {
  email: string,
  password: string,
  fullName:string,
  role: number,
  branchId: string,
  phoneNumber: string,
  address: string,
  status: number
}
export interface EditUserName {
  name: string;
}

export interface DeleteUserRes {
  message: string;
}

export interface DeleteUserReq {
  id: string;
}

export interface GetEmployeeReq {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}


