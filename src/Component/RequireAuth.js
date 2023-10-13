import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({allowedRoles}) => {
    const location = useLocation();
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    console.log(token)
    return (
        role === undefined
            ? <Navigate to="/login" state={{from: location}} replace/>
            :allowedRoles?.find(r =>role.includes(r))
                ? <Outlet/>
                : <Navigate to="/login" state={{from: location}} replace/>
    )
}
 
export default RequireAuth;