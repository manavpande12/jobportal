import { forgetPassword, login, logout, register } from "@/features/auth/services/auth.service";
import { useMutation } from "@tanstack/react-query"

export const useRegister = () =>
    useMutation({
        mutationFn: register,
    });

export const useForgetPassword = () =>
    useMutation({
        mutationFn: forgetPassword,
    });

export const useLogin = () =>
    useMutation({
        mutationFn: login,
    });

export const useLogout = () =>
    useMutation({
        mutationFn: logout,
    });

