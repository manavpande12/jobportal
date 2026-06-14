import { useMutation } from "@tanstack/react-query";
import { sendOtp, verifyOtp } from "@/common/services/otp.service";

export const useSendOtp = () => {
    return useMutation({
        mutationFn: sendOtp,
    });
};

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: verifyOtp,
    });
}