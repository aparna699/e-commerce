import React, { useEffect, useRef, useState } from "react";
import Input from "react-phone-number-input/input";
import  { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigate} from "react-router-dom";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth/authSlice";
import { Loading } from "../Component/Loading";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigator = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPwd] = useState();
  const [confirmPassword, setConfirmPwd] = useState();
  const [dob, setDob] = useState();
  const [phoneNum, setPhoneNum] = useState();

  let registered = false;

  const [errMsg, setErrMsg] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const maxDate = `${year-13}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${
    date < 10 ? `0${date}` : `${date}`
  }`;

  const dispatch = useDispatch();
  const authInfo = useSelector((state) => state.auth);

  useEffect(() => {
    if(registered) {
      // navigator('login')
      console.log("Regeistered")
    }
  }, [registered])

  // if(registered){
  //   navigator('/login')
  //   console.log("Reg")
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidPhoneNumber(phoneNum)) {
        if(password === confirmPassword) {
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                dOB: dob,
                phoneNumber: phoneNum,
                role: "ROLE_CUSTOMER"
            }
            dispatch(authActions.register(data))
            console.log("Register")
            navigator('/login')
        }else{
            alert("Password Mismatch")
        }
    }else{
        alert("Phone Number is Not Valide")
    }
  };

  return (
    <section className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
          <div class="form-outline my-2">
            <input
              type="text"
              id="text"
              ref={userRef}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              autoComplete="off"
              className="col-sm-12 border-start border-top border-end opacity-70 p-2"
              placeholder="Enter First Name"
              required
            />
          </div>

          <div class="form-outline my-2 ">
            <input
              type="text"
              id="text"
              ref={userRef}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              autoComplete="off"
              className="col-sm-12 border-start border-top border-end opacity-70 p-2"             
              placeholder="Enter Last Name"
              required
            />
          </div>

          <div class="form-outline my-2 ">
            <input
              type="email"
              id="email"
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
              className="col-sm-12 border-start border-top border-end opacity-70 p-2"
              placeholder="Enter email"
              required
            />
          </div>

          <div class="form-outline my-2 ">
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              autoComplete="off"
              className="col-sm-12 border-start border-top border-end opacity-70 p-2"
              placeholder="Enter password"
              required
            />
          </div>

          <div class="form-outline my-2 ">
            <input
              type="password"
              id="password"
              onChange={(e) => setConfirmPwd(e.target.value)}
              value={confirmPassword}
              autoComplete="off"
              className="col-sm-12 border-start border-top border-end opacity-70 p-2"
              placeholder="Confirm password"
              required
            />
          </div>

          <div class="form-outline my-2">
            <label class="form-label col-sm-4" for="form2Example2">
              Date Of Birth
            </label>
            <input
              type="date"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
              className="col-sm-8 border-start border-top border-end opacity-70 p-2"
              max = {maxDate}
              required
            />
          </div>

          <div class="form-outline my-2">
            <Input
              placeholder="Enter phone number"
              value={phoneNum}
              onChange={setPhoneNum}
              className="col-sm-12 border-start border-top border-end opacity-70 p-2"
            />
            
          </div>

          <div class=" my-4">
            <button type="submit" class="btn btn-dark btn-block col-md-12">
              Register
            </button>
          </div>
      </form>
    </section>
  );
};

export default Register;
