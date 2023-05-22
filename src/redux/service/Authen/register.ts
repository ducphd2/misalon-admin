import url from "./url";
import { ISignUpMerchantRes, ISignUpRes } from "../../types/Register/Register";
import { httpService } from "../httpService";

const handleRegister = {
  register: async (request: ISignUpRes) => {
    const uri = url.register;
    return httpService.POST<any, ISignUpRes>({
      uri,
      request,
    });
  },
  registerMerchant: async (request: ISignUpMerchantRes) => {
    const uri = url.register;
    return httpService.POST<any, ISignUpMerchantRes>({
      uri,
      request,
    });
  },
};

export default handleRegister;
