import { useEffect, useRef, useState ,useContext} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import Cookies from 'js-cookie'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth/authSlice";


const LogIn = () => {
    // const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"
    // console.log("from: ",from)

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState();
    const [password, setPwd] = useState();
    const [errMsg, setErrMsg] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = (e) => {
        e.preventDefault()
      setPasswordShown(passwordShown ? false : true);
    };

    const dispatch = useDispatch()
    const authInfo = useSelector((state) => state.auth);

    useEffect(() => {
        if(authInfo.isLogedIn){
            console.log("login")
            navigate(from,{replace: true})
        }
    },[authInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password:password
        };

        dispatch(authActions.logIn(body))  
        console.log(authInfo)
        // navigate(from,{replace: true})
    }

    return (
        <section className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <h1>Log-In</h1>
                <div class="form-outline mb-4">
                    <input 
                    type="email"
                    id="email"
                    ref={userRef}
                    onChange= {(e) => setEmail(e.target.value)}
                    value= {email}
                    className="col-sm-12 border-start border-top border-end opacity-70 p-2"
                    placeholder="Enter email"
                    style={{"width":"460px"}}
                    required
                    />            
                </div>

                <div class="form-outline mb-4 ">
                    <div className="col-sm-12">
                        <input 
                        type={passwordShown ? "text" : "password"}
                        id="password"
                        onChange= {(e) => setPwd(e.target.value)}
                        value= {password}
                        autoComplete= "off"
                        className=" border-start border-top border-end opacity-70 p-2"
                        placeholder="Enter password"
                        style={{"width":"460px"}}
                        required
                        />
                        <a
                        style={{"margin-left": "-30px"}}
                        onClick={togglePasswordVisiblity}> 
                            {
                                passwordShown ? (
                                    <VisibilityOffIcon /> 
                                ):(
                                    <VisibilityIcon /> 
                                )
                            } 
                        </a>{" "}
                    </div>
                </div>

                <div class="row mb-4">
                    <button type="submit" class="btn btn-dark btn-block">Log-In</button>
                </div>

                <div class="text-center">
                    <p>Not a member? <a href="/register">Register</a></p>
                </div>
            </form>
        </section>
    )
}

export default LogIn;