import axios, { InternalAxiosRequestConfig } from "axios";
import { ErrorCode } from "../types/error.types";

declare module "axios" {
    interface AxiosRequestConfig {
        redirectOnUnauthenticated?: boolean;
    }
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json", },
    withCredentials: true,
});

const AUTH_ROUTES = [
    "/auth/login",
    "/auth/register",
    "/auth/refresh",
    "/auth/logout",
];



api.interceptors.response.use(
    (res) => res,

    async (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }
        const originalRequest = error.config;
        const status = error.response.status;
        const errorCode = error.response?.data?.errorCode;
        const requestUrl = originalRequest?.url ?? "";
        const isAuthRoute = AUTH_ROUTES.some((route) => requestUrl.includes(route));

        // Don't handle authentication failures from auth endpoints
        if (isAuthRoute) {
            return Promise.reject(error);
        }

        // Access token expired → try refresh
        if (status === 401 && errorCode === ErrorCode.ACCESS_TOKEN_EXPIRED && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await api.post("/auth/refresh");
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                sessionStorage.clear();
                try { await api.post("/auth/logout"); } catch { }
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        // Only redirect when THIS request explicitly requires authentication
        if (status === 401 && errorCode === ErrorCode.USER_NOT_AUTHENTICATED && originalRequest?.redirectOnUnauthenticated) {
            window.location.href = "/login";
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);