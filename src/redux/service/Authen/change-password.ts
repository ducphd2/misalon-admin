import { IChangePassword, LoginReq, LoginRes } from "../../types/Login/login";
import { httpService } from "../httpService";
import url from "./url";

const changePassword = {
  change: (request: IChangePassword) => {
    const uri = url.change_password;
    return httpService.POST<IChangePassword, any>({
      uri,
      request,
    });
  },
};

export default changePassword;
