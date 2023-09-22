import React from "react";
import axios from "../../api/axios";
import Cookies from "js-cookie";

const DeleteButton = (props) => {
  const itemId = props.itemId;
  const url = `/api/items/${itemId}`;
  const token = Cookies.get("token");
 
  const deleteItem = async (e) => {
    e.preventDefault()
    let isMounted = true
    try {
        const header = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.delete(url , {
          headers: header,
          withCredentials: false
        });
        console.log(response.data);
        isMounted && window.location.reload(true);
        console.log("delete");
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <div>
      <button className="btn btn-outline-dark btn-sm mx-2" onClick={deleteItem}>
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
