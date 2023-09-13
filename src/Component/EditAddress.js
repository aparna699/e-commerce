import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "../api/axios";

export const EditAddress = (props) => {
  const address = props.address

  const token = Cookies.get("token");
  const [unit, setUnit] = useState();
  const [line1, setLine1] = useState();
  const [line2, setLine2] = useState();
  const [pinCode, setPinCode] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();

  const editAddess = async(e) => {
    e.preventDefault()
    let isMounted = true
    const data = {
      unit: unit,
      line1: line1,
      line2: line2,
      pinCode: pinCode,
      city: city,
      state: state,
      country: country,
    }
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
    try {
      const response = await axios.put(
          `/api/address/${address.id}`,
          data,
          { headers: header });
      console.log(response)
      console.log("Edit Item")
      isMounted && window.location.reload(true)
    } catch (err) {
      console.log(err);
    }

    console.log(address.id)
  }

  return (
    <div>
      <button
        type="button"
        className='btn btn-outline-dark col-sm-12 my-2'
        data-bs-toggle="modal"
        data-bs-target="#EditAddress"
      >
        Edit 
      </button>
      <div
        class="modal fade"
        id="EditAddress"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 class="modal-title"> Edit Address </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={editAddess}>
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setUnit(e.target.value)}
                  value={unit}
                  defaultValue= {address.unit}
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setLine1(e.target.value)}
                  value={line1}
                  defaultValue={address.line1}
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setLine2(e.target.value)}
                  value={line2}
                  defaultValue={address.line2}
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setPinCode(e.target.value)}
                  value={pinCode}
                  defaultValue= {address.pinCode}
                  required
                />

                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  defaultValue={address.city}
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  defaultValue={address.state}
                  required
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  defaultValue={address.country}
                  required
                />
                <div></div>
                <div class="modal-footer mt-3">
                  <button
                    type="submit"
                    class="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Edit Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
