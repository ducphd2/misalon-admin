export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirm_password: string;
}

export interface ChangePasswordReq {
    oldPassword: string;
    newPassword: string;
};
export interface ChangePasswordRes {
    message: string;
};

export interface ChangePasswordState {
    message: string;
    success: boolean;
    loading: boolean;
    errors: object;
}