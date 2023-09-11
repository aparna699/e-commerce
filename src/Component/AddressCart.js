import React from 'react'

export const AddressCart = (props) => {
    const address = props.address
  return (
    <div className='col-md-12'>
        <div className='card p-3 m-2'>
            <div className="row">
                <div className='col-md-9'>
                    <h5 className=''>
                        <span className='fw-bold'>
                            Address: {address.id}
                        </span><br/>
                        {` ${address.unit} ${address.line1} ${address.line2}`}
                    </h5>
                    <p>{address.pinCode} {address.city} {address.state} {address.country} </p>
                </div>
                <div className="col-md-3">
                    <button className='btn btn-outline-dark col-sm-12 my-2'>Edit</button> <br/>
                    <button className='btn btn-dark col-sm-12 my-2'>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
