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

    const dispatch = useDispatch();
    const authInfo = useSelector((state) => state.auth);

    useEffect(() => {
        setErrMsg('');
    },[email, password])

    useEffect(() => {
        if(authInfo.isSuccess && !authInfo.isLoading){
            const token = authInfo.data.token
            const role = authInfo.data.role
            const id = authInfo.data.userId
            // setAuth({email, password, token})
            setEmail('')
            setPwd("")
            navigate(from,{replace: true})
        }
    },[authInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        // try{
            // const LOGIN_URL = '/auth'
            const body = {
                email: email,
                password:password
            };
            // const header = {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     withCredentials: true,
            // }
            // const response = await axios.post(
            //     LOGIN_URL,
            //     body,
            //     header
            // );
            dispatch(authActions.logIn(body))
            
            
            
            
        // }catch(err){
        //     if(!err?.response){
        //         setErrMsg('No response');
        //     } else if(err.response?.status === 400){
        //         setErrMsg('Missing user or password');
        //     } else if(err.response?.status === 401){
        //         setErrMsg('Unauthorized');
        //     } else {
        //         setErrMsg("LogIn failed")
        //     }
        //     console.log(err);
        //     // errRef.current.focus();
        // }
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