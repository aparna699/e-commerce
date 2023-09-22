import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "../../api/axios";

export const AddAddress = () => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const [unit, setUnit] = useState();
  const [line1, setLine1] = useState();
  const [line2, setLine2] = useState();
  const [pinCode, setPinCode] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();

  const addAddress = async(e) => {
    e.preventDefault();
    let isMounted = true
    const data = {
      userId: userId,
      unit: unit,
      line1: line1,
      line2: line2,
      pinCode: pinCode,
      city: city,
      state: state,
      country: country,
    };
    console.log(data);
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
          '/api/address',
          data,
          { headers: header });
      console.log(response)
      console.log("Add Item")
      isMounted && window.location.reload(true)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="m-2">
      <button
        type="button"
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#AddAddress"
      >
        Add Address
      </button>
      <div
        class="modal fade"
        id="AddAddress"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 class="modal-title"> Add Address </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={addAddress}>
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setUnit(e.target.value)}
                  value={unit}
                  placeholder="Unit"
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setLine1(e.target.value)}
                  value={line1}
                  placeholder="Address Line 1"
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setLine2(e.target.value)}
                  value={line2}
                  placeholder="Address Line 2"
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setPinCode(e.target.value)}
                  value={pinCode}
                  placeholder="Pin Code"
                  required
                />

                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  placeholder="City"
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  placeholder="State"
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  placeholder="Country"
                  required
                />
                <div></div>
                <div class="modal-footer mt-3">
                  <button
                    type="submit"
                    class="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Add Address
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
