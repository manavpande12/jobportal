import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
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
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        const errorCode = error.response?.data?.errorCode;

        const requestUrl = originalRequest?.url ?? "";

        const isAuthRoute = AUTH_ROUTES.some((route) =>
            requestUrl.includes(route)
        );

        // IMPORTANT:
        // Do not refresh tokens for auth routes
        if (
            error.response.status === 401 && errorCode === "ACCESS_TOKEN_EXPIRED" &&
            !originalRequest._retry &&
            !isAuthRoute
        ) {
            originalRequest._retry = true;

            try {
                await api.post("/auth/refresh");
                return api(originalRequest);
            } catch (refreshError) {
                // clear local state
                localStorage.clear();
                sessionStorage.clear();

                // optional
                try {
                    await api.post("/auth/logout");
                } catch { }

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);