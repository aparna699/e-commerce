import React, { useState } from "react";

export const ChangePassword = (props) => {
  const id = props.userId;
  
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const changePassword = (e) => {
    e.preventDefault();
    console.log(id);
    const data = {
      password: password,
    };
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

                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="col-sm-12 opacity-60 p-2 my-2"
                  placeholder="New Password"
                  required
                />

                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  className="col-sm-12 opacity-60 p-2 my-2"
                  placeholder="Confirm New Password"
                  required
                />
                
                <div class=" my-4">
                  <button
                    type="submit"
                    class="btn btn-dark btn-block col-md-12"
                  >
                    Create User
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
