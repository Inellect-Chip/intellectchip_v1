import { setAuthToken } from "./axios";

// Save token globally
export const storeAccessToken = (token: string) => {
    setAuthToken(token);
    localStorage.setItem("accessToken", token);
};

// Remove token
export const clearAccessToken = () => {
    setAuthToken(null);
    localStorage.removeItem("accessToken");
};
