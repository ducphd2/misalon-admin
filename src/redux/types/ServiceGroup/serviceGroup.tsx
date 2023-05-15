import { type } from "os";

export interface ServiceGroupState {
  listServiceGroups: { items: any; meta: any };
  loading: boolean;
  deleteStatusServiceGroup: boolean;
  errors: object;
}

export interface ServiceGroupRes {
  id: string;
  merchantId?: number;
  sku?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
}

export interface ServiceGroupReq {
  // pageSize: number;
}

export interface AddServiceGroupReq {
  merchantId?: number;
  sku?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
}

export interface AddServiceGroupRes {
  message: string;
}

export interface EditServiceGroupRes {
  message: string;
}

export interface EditServiceGroupReq {
  id: string;
  merchantId?: number;
  sku?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
}
export interface EditServiceGroupName {
  name: string;
}

export interface DeleteServiceGroupRes {
  message: string;
}

export interface DeleteServiceGroupReq {
  id: string;
}

export interface GetServiceGroupReq {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}
