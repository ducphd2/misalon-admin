import { type } from "os";

export interface ServiceState {
  listServices: { items: any; meta: any };
  loading: boolean;
  deleteStatusService: boolean;
  errors: object;
}

export interface ServiceRes {
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
  type?: EServiceType;
  showType?: EServiceShowType;
  canPrintableInvoice?: boolean;
}

export interface ServiceReq {
  // pageSize: number;
}

export interface AddServiceReq {
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
  type?: EServiceType;
  showType?: EServiceShowType;
  canPrintableInvoice?: boolean;
}

export interface AddServiceRes {
  message: string;
}

export interface EditServiceRes {
  message: string;
}

export interface EditServiceReq {
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
  type?: EServiceType;
  showType?: EServiceShowType;
  canPrintableInvoice?: boolean;
}
export interface EditServiceName {
  name: string;
}

export interface DeleteServiceRes {
  message: string;
}

export interface DeleteServiceReq {
  id: string;
}

export interface GetServiceReq {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export enum EServiceShowType {
  BOTH = 0,
  CASHIER = 1,
  BOOKING = 2,
  NONE = 3,
}
export enum EServiceType {
  SERVICE = 0,
  PRODUCT = 1,
}

