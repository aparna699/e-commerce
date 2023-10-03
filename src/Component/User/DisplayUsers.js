import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../api/axios";
import dateFormat from "dateformat";
import { DeleteUser } from "./DeleteUser";

import SearchIcon from "@mui/icons-material/Search";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

export const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const token = Cookies.get("token");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const url = `/api/users`;

    const getUsers = async () => {
      console.log("get Users");
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(url, {
          headers: header,
        });

        console.log("users", response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <div className=" py-1">
        <form class="d-flex my-2">
          <div
            class="p-2 card rounded-start border-1 bg-light"
            style={{
              borderRadius: "0%",
              // "backgroundColor": "lightgray"
            }}
          >
            <SearchIcon style={{ fill: "gray" }} />
          </div>
          <input
            class="form-control rounded-end"
            type="search"
            // placeholder={"Search"}
            style={{ borderRadius: "0%" }}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
        </form>
      </div>
      <div className="card my-2 ">
        <div className="card m-0 p-2 bg-light border-0">
        <div className="row ">
          <div className="col-sm-1">
            <h6 className="fw-bold">ID</h6>
          </div>
          <div className="col-sm-2">
            <h6 className="fw-bold">Name</h6>
          </div>
          <div className="col-sm-3">
            <h6 className="fw-bold">Email</h6>
          </div>
          <div className="col-sm-2">
            <h6 className="fw-bold">Phone</h6>
          </div>
          <div className="col-sm-2">
            <h6 className="fw-bold">DOB</h6>
          </div>
          <div className="col-sm-2">
            <h6 className="fw-bold">Role</h6>
          </div>
        </div>
        </div>
        {/* <div className="col-sm-12 card my-2"></div> */}
        {users.filter(post => {
            const searchList= post.id + post.firstName + post.lastName + post.email;
            if (query === "") {
              //if query is empty
              return post;
            } else if (searchList.toLowerCase().includes(query.toLowerCase())) {
              //returns filtered array
              return post;
            }}).map((user) => {
          return (
            <div className="row p-2">
              <div className="col-sm-1">
                <h6 className=" px-2">{user.id}</h6>
              </div>
              <div className="col-sm-2">
                <h6>
                  {user.firstName} {user.lastName}
                </h6>
              </div>
              <div className="col-sm-3">
                <h6>{user.email}</h6>
              </div>
              <div className="col-sm-2">
                <h6>{user.phoneNumber}</h6>
              </div>
              <div className="col-sm-2">
                <small>{dateFormat(user.dOB, "mmm dS, yyyy")}</small>
              </div>
              <div className="col-sm-1 px-1">
                {user.role === "ROLE_ADMIN" ? (
                  <h7 className="fw-bold d-flex justify-content-center">
                    <AdminPanelSettingsIcon />
                    <small>Admin</small>
                  </h7>
                ) : (
                  <h7 className="d-flex justify-content-center">
                    <PersonIcon />
                    <small>User</small>
                  </h7>
                )}
              </div>
              <div className="col-sm-1 mb-2 d-flex justify-content-end">
                <DeleteUser
                  style={{
                    width: "90px",
                  }}
                  text="Delete"
                  userId={user.id}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
