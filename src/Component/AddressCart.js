import React from 'react'
import { DeleteAddress } from './DeleteAddress'
import { EditAddress } from './EditAddress'

export const AddressCart = (props) => {
    const address = props.address
  return (
    <div className='col-md-12'>
        <div className='card p-3 m-2'>
            <div className="row">
                <div className='col-md-9'>
                    <h7 className=''>
                        <span className='fw-bold'>
                            {address.unit}
                        </span><br/>
                        {` ${address.line1} ${address.line2}`}
                    </h7>
                    <p>{address.pinCode} {address.city} {address.state} {address.country} </p>
                </div>
                <div className="col-md-3">
                    <EditAddress address ={address}/> 
                    <DeleteAddress id={address.id}/>
                </div>
            </div>
        </div>
    </div>
  )
}
