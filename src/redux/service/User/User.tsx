import {
  AddServiceReq,
  AddServiceRes,
  DeleteServiceReq,
  DeleteServiceRes,
  EditServiceName,
  EditServiceReq,
  EditServiceRes,
  GetServiceReq,
  ServiceRes,
} from "../../types/Service/service";
import { httpService } from "../httpService";
import url from "./url";

const UserApi = {
  getUser: (params: any) => {
    const merchant = JSON.parse(localStorage.getItem("merchant") as any);
    const uri = url.serviceList(merchant.id);
    return httpService.GET<any, any[]>({ uri, params });
  },

  addUser: (request: any) => {
    const uri = url.servicePatch;
    return httpService.POST<any, any>({ uri, request });
  },

  editUser: (request: any, id: string) => {
    const uri = url.servicePatch + `/${id}/`;
    return httpService.PATCH<any, any>({
      uri,
      request,
    });
  },

  deleteUser: ({ id }: any) => {
    const uri = url.servicePatch + `/${id}/`;
    return httpService.DELETE<any, any>({
      uri,
    });
  },
};

export default UserApi;
