import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <LoadingSpinner size="sm" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
