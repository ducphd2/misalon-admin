export interface ISignUpRes {
  user: {
    email: string;
    password: string;
    phone: string;
    role: number;
    fullName: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

export interface ISignUpMerchantRes extends ISignUpRes {
  merchant: {
    name: string;
    address: string;
    phone: string;
    subdomain: string;
    latitude: number;
    longitude: number;
  };
}
