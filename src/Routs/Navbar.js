import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Navbar = () => {
    const token = Cookies.get('token')
    
    // const user = token?jwtDecode(token): null
    const role = Cookies.get('role')
    // const role = 'ROLE_ADMIN'
    console.log(role)

    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('role')
    }

    return ( 
        <div>
            <nav className="navbar">
            <a href="/"><h1>Project</h1></a>
            {
                role === 'ROLE_ADMIN'
                    ? (
                        <div className="links">
                        <a href="bookManagment"> Book Managment </a>
                        <a href="studentManagment"> Student Managment </a>
                        <a href="profile"> Profile </a>
                        <a href="borrowedBook"> Borrowed Book </a>
                    </div> 
                    ): role === 'ROLE_CUSTOMER'? (
                        <div className="links">
                            <a href="books"> Book </a>
                            <a href="profile"> Profile </a>
                        </div> 
                    ): (
                        // <Navigate to="/login"/>
                        <div></div>
                    )
            }
            {
                role === undefined
                    ? (
                        <a style={{
                            color: " #8c9aca"
                        }} href="login" onClick={logout}> login </a> 
                        
                    ):(
                        <a style={{
                            color: " #8c9aca"
                        }} href="login" onClick={logout}> logout </a> 
                    )
            }
            </nav>
            <Outlet/>
        </div>

     );
}
 
export default Navbar;