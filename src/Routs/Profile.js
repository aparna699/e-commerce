import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { ProfileInfo } from '../Component/ProfileInfo'
import { DeleteUser } from "../Component/DeleteUser";

const Profile = () => {
  return (
    <div className="m-2">
      
      <ProfileInfo />

      <div className="d-flex justify-content-end">
        <DeleteUser  userId={Cookies.get("userId")}/>
      </div>
    </div>
  )
}

export default Profile