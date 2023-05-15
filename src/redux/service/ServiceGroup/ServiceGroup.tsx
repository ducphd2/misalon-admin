import {
  AddServiceGroupReq,
  AddServiceGroupRes,
  DeleteServiceGroupReq,
  DeleteServiceGroupRes,
  EditServiceGroupName,
  EditServiceGroupReq,
  EditServiceGroupRes,
  GetServiceGroupReq,
  ServiceGroupRes,
} from "../../types/ServiceGroup/serviceGroup";
import { httpService } from "../httpService";
import url from "./url";

const ServiceGroupApi = {
  getServiceGroups: (params: GetServiceGroupReq) => {
    const merchant = JSON.parse(localStorage.getItem("merchant") as any);
    const uri = url.serviceGroupList(merchant.id);
    return httpService.GET<GetServiceGroupReq, ServiceGroupRes[]>({
      uri,
      params,
    });
  },

  addServiceGroup: (request: AddServiceGroupReq) => {
    const uri = url.serviceGroupPatch;
    return httpService.POST<AddServiceGroupReq, AddServiceGroupRes>({
      uri,
      request,
    });
  },

  editServiceGroup: (request: EditServiceGroupReq, id: string) => {
    const uri = url.serviceGroupPatch + `/${id}/`;
    return httpService.PATCH<EditServiceGroupReq, EditServiceGroupRes>({
      uri,
      request,
    });
  },

  deleteServiceGroup: ({ id }: DeleteServiceGroupReq) => {
    const uri = url.serviceGroupPatch + `/${id}/`;
    return httpService.DELETE<DeleteServiceGroupReq, DeleteServiceGroupRes>({
      uri,
    });
  },
};

export default ServiceGroupApi;
