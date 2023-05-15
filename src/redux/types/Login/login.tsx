export interface ILoginData {
  email: string;
  password: string;
}
export interface LoginReq {
  email: string;
  password: string;
}

export interface authUser {
  username: string;
  email: string;
  employee: {
    _id: string;
  };
}

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
  authUser: any;
  result:any
}

export interface LoginState {
  authUser: AuthUser;
  accessToken: string;
  loading: boolean;
  errors: object;
}

export interface AuthUser {
  createdAt: string;
  email: string;
  employee: null;
  resetPasswordToken: string;
  role: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}
