import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import dateFormat from 'dateformat'; 

import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/Users/usersSlice";
import { Loading } from "../Loading";

export const ProfileInfo = () => {
    const [user, setUser] = useState();

    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.users)
  
    useEffect(() => {
      dispatch(usersActions.getProfileInfo())
    }, []);

    useEffect(() => {
      if(usersList.isSuccess && !usersList.isLoading){
        setUser(usersList.user)
      }
    },[usersList])

  return (
    <div className="row">
        <div className="col-sm-3"></div>
        <div className="card m-2 p-3 col-sm-6">
        {
            (user !== undefined)?(
                <div className="">
                    <h1 className="d-flex justify-content-center fw-bold">
                        {user.firstName} {user.lastName} 
                    </h1>
                    <h5 className="d-flex justify-content-center"><PersonIcon className="mx-2"/> {user.role.substring(5)}</h5>
                    <h5 className="d-flex justify-content-center"><EmailIcon className="mx-2"/>  {user.email}</h5>
                    <h5 className="d-flex justify-content-center"><PhoneAndroidIcon className="mx-2"/> {user.phoneNumber}</h5>
                    <h5 className="d-flex justify-content-center"><CakeIcon className="mx-2"/> {dateFormat(user.dOB, "mmm dS, yyyy")}</h5>
                </div>
            ):(
                <Loading/>
            )
        }
        </div>
    </div>
  );
};
