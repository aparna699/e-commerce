import React, { useState } from "react";
import axios from "../../api/axios";
import Cookies from "js-cookie";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const ChangePassword = (props) => {
  const id = props.userId;
  const token = Cookies.get("token");
  const url = `/api/users/${id}`;

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);

  const togglePasswordVisiblity = (e) => {
    e.preventDefault();
    setPasswordShown(passwordShown ? false : true);
  };

  const togglePasswordVisiblity2 = (e) => {
    e.preventDefault();
    setPasswordShown2(passwordShown2 ? false : true);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    console.log(id);
    let isMounted = true;
    const data = {
      password: password,
    };
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (password === confirmPassword) {
      try {
        const response = await axios.put(url, data, {
          headers: header,
          withCredentials: false,
        });
        console.log(response);
        isMounted && window.location.reload(true);
        console.log("change password");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Password Mismatch");
    }
  };
  return (
    // btn btn-dark btn-sm mx-2
    <div className="">
      <button
        type="button"
        className="btn btn-dark btn-sm mx-2"
        data-bs-toggle="modal"
        data-bs-target="#changePassword"
      >
        Change Password
      </button>

      <div
        class="modal fade"
        id="changePassword"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Change Password </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={changePassword}>
                <div className="col-sm-12">
                  <input
                    type={passwordShown ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="col-sm-12 opacity-60 p-2 my-2"
                    placeholder="New Password"
                    style={{ minWidth: "450px" }}
                    required
                  />
                  <a
                    style={{ "margin-left": "-30px" }}
                    onClick={togglePasswordVisiblity}
                  >
                    {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </a>
                </div>

                <div className="col-sm-12">
                  <input
                    type={passwordShown2 ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="col-sm-12 opacity-60 p-2 my-2"
                    placeholder="Confirm New Password"
                    style={{ minWidth: "450px" }}
                    required
                  />
                  <a
                    style={{ "margin-left": "-30px" }}
                    onClick={togglePasswordVisiblity2}
                  >
                    {passwordShown2 ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </a>
                </div>

                <div class=" my-4">
                  <button
                    type="submit"
                    class="btn btn-dark btn-block col-md-12"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
