import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import EditIcon from '@mui/icons-material/Edit';
import { addressActions } from "../../store/Address/addressSlice";

export const EditAddress = (props) => {
  const address = props.address

  const [unit, setUnit] = useState();
  const [line1, setLine1] = useState();
  const [line2, setLine2] = useState();
  const [pinCode, setPinCode] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();

  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.address);


  const editAddess = async(e) => {
    e.preventDefault()
    const data = {
      unit: unit,
      line1: line1,
      line2: line2,
      pinCode: pinCode,
      city: city,
      state: state,
      country: country,
    }
    console.log(data)
    const editInfo = {
      addressId: address.id,
      data: data
    }
    dispatch(addressActions.editAddress(editInfo))
    if(addressList.isSuccess) {
      window.location.reload(true)
    }
  }

  return (
    <div className="d-flex justify-content-end">
      <button
        type="button"
        className='btn btn-outline-dark my-2 '
        data-bs-toggle="modal"
        data-bs-target={`#EditAddress${address.id}`}
      >
        <EditIcon /> 
      </button>
      <div
        class="modal fade"
        id={`EditAddress${address.id}`}
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
