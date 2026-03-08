import { createContext, useContext, useEffect, useState } from "react";
import type { User, LoginPayload } from "../services/auth.service";
import { authService } from "../services/auth.service";
import { AUTH_LOGOUT, setAccessToken } from "../lib/auth-store";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginPayload) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const data = await authService.refreshToken();
            setAccessToken(data.tokens.accessToken);

            if (data.user) {
                setUser(data.user);
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();

        const handleLogout = () => {
            setUser(null);
            setAccessToken(null);
        };

        window.addEventListener(AUTH_LOGOUT, handleLogout);
        return () => {
            window.removeEventListener(AUTH_LOGOUT, handleLogout);
        };
    }, []);

    const login = async (data: LoginPayload) => {
        const response = await authService.login(data);
        setAccessToken(response.tokens.accessToken);
        setUser(response.user);
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
            setAccessToken(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
