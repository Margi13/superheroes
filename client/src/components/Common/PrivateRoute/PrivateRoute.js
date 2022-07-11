import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
export const PrivateRoute = ({
    children
}) => {
    const { user } = useAuthContext();
    return user.accessToken ? children : <Navigate to="/login" />;
}

export const AdminRoute = ({
    children
}) => {
    const { isAdmin } = useAuthContext();
    return isAdmin ? children : <Navigate to="/" />;
}

export const UserRoute = ({
    children
}) => {
    const { user, isAdmin } = useAuthContext();
    return user.accessToken && !isAdmin ? children : <Navigate to="/" />;
}

