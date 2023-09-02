import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    const token = Cookies.get('token')
    // const user = token?jwtDecode(token): null
    const role = Cookies.get('role')
    console.log(token)

    
    return (
        role === undefined
            ? <Navigate to="/login" state={{from: location}} replace/>
            :allowedRoles?.find(r =>role.includes(r))
                ?<Outlet/>
                : auth?.email
                    ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                    :  <Navigate to="/login" state={{from: location}} replace/>
    )
}
 
export default RequireAuth;