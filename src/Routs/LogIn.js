import { useEffect, useRef, useState ,useContext} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "../api/axios";
import Cookies from 'js-cookie'


const LogIn = () => {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState();
    const [password, setPwd] = useState();
    const [errMsg, setErrMsg] = useState('');


    
    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    },[email, password])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const LOGIN_URL = '/auth'
            const body = JSON.stringify({email: email,password:password});
            const header = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
            const response = await axios.post(
                LOGIN_URL,
                body,
                header
            );

            const accessToken = response?.data?.accessToken
            const role = response?.data?.role
            const id = response?.data?.id
            console.log(response?.data)
            Cookies.set('token', accessToken)
            Cookies.set('role', role)
            Cookies.set('userId', id)
            setAuth({email, password, accessToken})
            setEmail('')
            setPwd("")
            
            navigate(from,{replace: true})
        }catch(err){
            if(!err?.response){
                setErrMsg('No response');
            } else if(err.response?.status === 400){
                setErrMsg('Missing user or password');
            } else if(err.response?.status === 401){
                setErrMsg('Unauthorized');
            } else {
                setErrMsg("LogIn failed")
            }
            console.log(err);
            // errRef.current.focus();
        }
    }

    return (
        <section className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <h1>Log-In</h1>
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Email </label>
                    <input 
                    type="email"
                    id="email"
                    ref={userRef}
                    onChange= {(e) => setEmail(e.target.value)}
                    value= {email}
                    autoComplete= "off"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    />            
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">Password</label>
                    <input 
                    type="password"
                    id="password"
                    onChange= {(e) => setPwd(e.target.value)}
                    value= {password}
                    autoComplete= "off"
                    className="form-control"
                    placeholder="Enter password"
                    required
                    />
                </div>

                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label class="form-check-label" for="form2Example31"> Remember me </label>
                    </div>
                    </div>

                    {/* <div class="col">
                    <a href="#!">Forgot password?</a>
                    </div> */}
                    <button type="submit" class="btn btn-primary btn-block">Log-In</button>
                </div>

                

                <div class="text-center">
                    <p>Not a member? <a href="/register">Register</a></p>
                </div>
            </form>
        </section>
    )
}

export default LogIn;