import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg scale-110"></span>
            </div>
        );
    }

    if (user?.email) {
        return children;
    }

    return (
        <Navigate
            to="/sign-in"
            state={{ from: location }}
            replace
        />
    );
};

export default PrivateRoute;
