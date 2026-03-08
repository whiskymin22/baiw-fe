// Custom event for auth token changes
export const AUTH_TOKEN_UPDATED = "auth-token-updated";
export const AUTH_LOGOUT = "auth-logout";

// In-memory token storage
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;
