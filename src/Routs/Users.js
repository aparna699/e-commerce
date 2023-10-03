import React from 'react'
import { AddUser } from '../Component/User/AddUser';
import { DisplayUsers } from '../Component/User/DisplayUsers';

const Users = () => {
  return (
    <div className='px-3 py-2'>
      <AddUser />
      <DisplayUsers />
    </div>
  )
}

export default Users;