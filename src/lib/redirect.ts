const BLOCKED_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

export const saveRedirectPath = (path: string) => {
    const normalized = path.split("?")[0];
    const shouldBlock = BLOCKED_PATHS.includes(normalized);

    if (!shouldBlock) {
        localStorage.setItem("redirectPath", path);
    }
};

export const getRedirectPath = () => {
    return localStorage.getItem("redirectPath") || "/";
};

export const clearRedirectPath = () => {
    localStorage.removeItem("redirectPath");
};
