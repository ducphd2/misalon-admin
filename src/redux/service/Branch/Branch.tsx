import {
  AddBranchReq,
  AddBranchRes,
  DeleteBranchReq,
  DeleteBranchRes,
  EditBranchName,
  EditBranchReq,
  EditBranchRes,
  GetBranchReq,
  BranchRes,
} from "../../types/Branch/branch";
import { httpService } from "../httpService";
import url from "./url";

const BranchApi = {
  getBranchs: (params: GetBranchReq) => {
    const merchant = JSON.parse(localStorage.getItem("merchant") as any);
    const uri = url.branchList(merchant.id);
    return httpService.GET<GetBranchReq, BranchRes[]>({ uri, params });
  },

  addBranch: (request: AddBranchReq) => {
    const uri = url.branchPatch;
    return httpService.POST<AddBranchReq, AddBranchRes>({ uri, request });
  },

  editBranch: (request: EditBranchReq, id: string) => {
    const uri = url.branchPatch + `/${id}/`;
    return httpService.PATCH<EditBranchReq, EditBranchRes>({
      uri,
      request,
    });
  },

  deleteBranch: ({ id }: DeleteBranchReq) => {
    const uri = url.branchPatch + `/${id}/`;
    return httpService.DELETE<DeleteBranchReq, DeleteBranchRes>({
      uri,
    });
  },
};

export default BranchApi;
