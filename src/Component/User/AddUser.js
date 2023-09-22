import React, { useEffect, useState } from 'react'
import Input from "react-phone-number-input/input";
import axios from '../../api/axios';

export const AddUser = () => {
  const [role, setRole] = useState()
//   const [role, setRole] = useState("ROLE_CUSTOMER")
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
//   const [password, setPwd] = useState();
  const password = "pass"
  const [dob, setDob] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const url = "/api/users"

  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => setIsChecked(!isChecked);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const maxDate = `${year-13}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${
    date < 10 ? `0${date}` : `${date}`
  }`;

  useEffect(() => {
    isChecked ? setRole("ROLE_ADMIN") : setRole("ROLE_CUSTOMER")
  },[isChecked])

  const addUser = async (e) => {
    e.preventDefault()
    console.log(role)
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        dOB: dob,
        phoneNumber: phoneNum,
        role: role
    }
    const header = {
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.post(
            url,
            data,
            {headers: header}
        )
        console.log(response)
        console.log("Register")
        window.location.reload(true)
    }catch(err){
        console.log(err)
    }

    console.log(data)
  }

  return (
    <div className='row m-2'>
        <button
            type="button"
            className="btn btn-dark col-sm-3"
            data-bs-toggle="modal"
            data-bs-target="#AddUser"
        >
            Add User
        </button>

        <div
            class="modal fade"
            id="AddUser"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Create User </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={addUser}>
                            <div class="form-check form-switch">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    id="flexSwitchCheckDefault" 
                                    value={role}
                                    checked={isChecked}
                                    onChange= {handleToggle}
                                    />
                                <label 
                                    class="form-check-label" 
                                    for="flexSwitchCheckDefault"> Create Admin User</label>
                            </div>
                            <input
                            className="col-sm-12 opacity-60 p-2 m-2"
                            type="text"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder= "First Name"
                            required
                            />
                            <input
                            className="col-sm-12 opacity-60 p-2 m-2"
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder= "Last Name"
                            required
                            />
                            <input
                            className="col-sm-12 opacity-60 p-2 m-2"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder= "Email"
                            required
                            />
                            <input
                            type="date"
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}
                            className="col-sm-12 opacity-60 p-2 m-2"
                            max = {maxDate}
                            required
                            />
                            <Input
                            placeholder="Enter phone number"
                            value={phoneNum}
                            onChange={setPhoneNum}
                            className="col-sm-12 opacity-60 p-2 m-2"
                            />
                            <div class=" my-4">
                                <button type="submit" class="btn btn-dark btn-block col-md-12">
                                Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
