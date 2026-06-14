export type SentOtpRequest = { email: string; subject: string };
export type SentOtpResponseData = null;
export type SentOtpResponse = import("./api.types").ApiResponse<SentOtpResponseData>;

export type VerifyOtpRequest = { email: string; enteredOtp: string };
export type VerifyOtpResponseData = null;
export type VerifyOtpResponse = import("./api.types").ApiResponse<VerifyOtpResponseData>;