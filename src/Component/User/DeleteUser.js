import Cookies from "js-cookie";
import React from "react";
import axios from "../../api/axios";

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/Users/usersSlice";

export const DeleteUser = (props) => {
  const id = props.userId;
  const url = `/api/users/${id}`;
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users)

  const deleteUser = async (e) => {
    e.preventDefault();
    dispatch(usersActions.deleteUser(id));
    if(usersList.isSuccess && !usersList.isLoading) {
      window.location.reload(true)
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
