import Cookies from "js-cookie";
import React from "react";
import axios from "../api/axios";

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
    <div>
      <button
        className="btn btn-outline-dark btn-sm"
        style={{
          width: "90px",
        }}
        onClick={deleteUser}
      >
        Delete
      </button>
    </div>
  );
};
