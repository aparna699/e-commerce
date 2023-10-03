import Cookies from "js-cookie";
import React from "react";
import axios from "../../api/axios";

import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteUser = (props) => {
  const id = props.userId;
  const url = `/api/users/${id}`;
  const token = Cookies.get("token");

  const deleteUser = async (e) => {
    e.preventDefault();
    let isMounted = true;
    try {
      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.delete(url, {
        headers: header,
        withCredentials: false,
      });
      console.log(response);
      isMounted && window.location.reload(true);
      console.log("delete");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // <div>
      <button
        className="btn btn-sm border-0 m-0 p-0"
        
        onClick={deleteUser}
      >
        <DeleteIcon style={{"fill": "#D10000"}}/>
      </button>
    // </div>
  );
};
