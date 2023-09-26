import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { ProfileInfo } from '../Component/User/ProfileInfo'
import { DeleteUser } from "../Component/User/DeleteUser";
import { ChangePassword } from "../Component/Password/ChangePassword";

const Profile = () => {
  return (
    <div className="m-2">
      
      <ProfileInfo />

      <div className="d-flex justify-content-end">
        <ChangePassword userId={Cookies.get("userId")}/>
        <DeleteUser  userId={Cookies.get("userId")}/>
      </div>
    </div>
  )
}

export default Profile