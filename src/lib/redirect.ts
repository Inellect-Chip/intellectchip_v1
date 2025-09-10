const BLOCKED_PATHS = ["/login", "/register"];

export const saveRedirectPath = (path: string) => {
    const normalized = path.split("?")[0];
    if (!BLOCKED_PATHS.includes(normalized)) {
        localStorage.setItem("redirectPath", path);
    }
};

export const getRedirectPath = () => localStorage.getItem("redirectPath") || "/";

export const clearRedirectPath = () => localStorage.removeItem("redirectPath");

//alias to match your old helper name
export const cleanRedirectPath = clearRedirectPath;
