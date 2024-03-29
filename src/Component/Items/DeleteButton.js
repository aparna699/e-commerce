import React from "react";
import axios from "../../api/axios";
import Cookies from "js-cookie";

import DeleteIcon from '@mui/icons-material/Delete';

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
      <button className="btn btn-sm border-0 mx-2" onClick={deleteItem}>
        <DeleteIcon style={{"fill": "#D10000"}}/>
      </button>
    </div>
  );
};

export default DeleteButton;
