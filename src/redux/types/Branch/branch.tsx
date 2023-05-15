import { type } from "os";

export interface BranchState {
  listBranchs: { items: any; meta: any };
  loading: boolean;
  deleteStatusBranch: boolean;
  errors: object;
}

export interface BranchRes {
  id: string;
  name?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  merchantId?: number | undefined;
  cityCode?: number | undefined;
  districtCode?: number | undefined;
  wardCode?: number | undefined;
  city?: string | undefined;
  district?: string | undefined;
  ward?: string | undefined;
}

export interface BranchReq {
  // pageSize: number;
}

export interface AddBranchReq {
  name?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  merchantId?: number | undefined;
  cityCode?: number | undefined;
  districtCode?: number | undefined;
  wardCode?: number | undefined;
  city?: string | undefined;
  district?: string | undefined;
  ward?: string | undefined;
}

export interface AddBranchRes {
  message: string;
}

export interface EditBranchRes {
  message: string;
}

export interface EditBranchReq {
  id: string;
  name?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  merchantId?: number | undefined;
  cityCode?: number | undefined;
  districtCode?: number | undefined;
  wardCode?: number | undefined;
  city?: string | undefined;
  district?: string | undefined;
  ward?: string | undefined;
}
export interface EditBranchName {
  name: string;
}

export interface DeleteBranchRes {
  message: string;
}

export interface DeleteBranchReq {
  id: string;
}

export interface GetBranchReq {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}
