import { LoginReq, LoginRes } from "../../types/Login/login";
import { httpService } from "../httpService";
import url from "./url";

const handleLogin = {
  login: (request: LoginReq) => {
    const uri = url.login;
    return httpService.POST<LoginReq, LoginRes>({
      uri,
      request,
    });
  },
};

export default handleLogin;
