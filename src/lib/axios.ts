import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import router from "next/router"; // use only in client-side env

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    withCredentials: true, // for sending secure cookie (refreshToken)
    headers: {
        "Content-Type": "application/json",
    },
});

// In-memory access token (never expose in localStorage for security)
let accessToken: string | null = null;

// Helper: Set or clear Authorization header
export const setAuthToken = (token: string | null) => {
    accessToken = token;
    if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common["Authorization"];
    }
};

export const getAccessToken = () => accessToken;

// Request Interceptor: attach accessToken to every request
instance.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error(" Request error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor: handle 401 (token expired)
instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalConfig = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalConfig?._retry) {
            originalConfig._retry = true;

            try {
                const refreshRes = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = refreshRes.data?.accessToken || refreshRes.data?.data?.accessToken;


                if (!newAccessToken) {
                    console.warn("Refresh endpoint did not return accessToken");
                    throw new Error("No accessToken in refresh response");
                }

                setAuthToken(newAccessToken);
                originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return instance(originalConfig);

            } catch (refreshError: any) {
                console.error("Refresh token failed:", {
                    status: refreshError?.response?.status,
                    message: refreshError?.response?.data?.error || refreshError.message,
                });

                setAuthToken(null);

                if (typeof window !== "undefined") {
                    router.push("/login");
                }

                return Promise.reject(refreshError);
            }

        }

        // Other errors
        if (error.response) {
            console.error(" Response error:", {
                url: error.config?.url,
                status: error.response.status,
                data: error.response.data,
            });
        } else if (error.request) {
            console.error(" No response received from server");
        } else {
            console.error(" Unexpected error:", error.message);
        }

        return Promise.reject(error);
    }
);


export default instance;
