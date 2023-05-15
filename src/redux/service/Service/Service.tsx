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

const ServiceApi = {
  getServices: (params: GetServiceReq) => {
    const merchant = JSON.parse(localStorage.getItem("merchant") as any);
    const uri = url.serviceList(merchant.id);
    return httpService.GET<GetServiceReq, ServiceRes[]>({ uri, params });
  },

  addService: (request: AddServiceReq) => {
    const uri = url.servicePatch;
    return httpService.POST<AddServiceReq, AddServiceRes>({ uri, request });
  },

  editService: (request: EditServiceReq, id: string) => {
    const uri = url.servicePatch + `/${id}/`;
    return httpService.PATCH<EditServiceReq, EditServiceRes>({
      uri,
      request,
    });
  },

  deleteService: ({ id }: DeleteServiceReq) => {
    const uri = url.servicePatch + `/${id}/`;
    return httpService.DELETE<DeleteServiceReq, DeleteServiceRes>({
      uri,
    });
  },
};

export default ServiceApi;
