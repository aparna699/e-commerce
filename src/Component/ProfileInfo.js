import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import dateFormat from 'dateformat'; 

import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';

export const ProfileInfo = () => {

    const userId = Cookies.get("userId");
    const token = Cookies.get("token");
    const [user, setUser] = useState();
  
    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const url = `/api/users/${userId}`;
  
      const getUser = async () => {
        console.log("get Users");
        try {
          const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          const response = await axios.get(url, {
            headers: header,
          });
          console.log("response.data")
          console.log(response.data);
          isMounted && setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      getUser()
      return () => {
        isMounted = false;
        controller.abort();
      };
    }, []);

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
                <div className="d-flex justify-content-center">Loading ... </div>
            )
        }
        </div>
    </div>
  );
};
