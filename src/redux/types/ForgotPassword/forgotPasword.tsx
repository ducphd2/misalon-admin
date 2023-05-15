export interface ForgotPasswordReq {
    email: string;
};
export interface ForgotPasswordRes {
    message: string;
};

export interface ForgotPasswordState {
    message: string;
    success: boolean;
    loading: boolean;
    errors: object;
}