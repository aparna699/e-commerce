import React from 'react'
import { AddUser } from '../Component/AddUser';
import { DisplayUsers } from '../Component/DisplayUsers';

const Users = () => {
  return (
    <div>
      <AddUser />
      <DisplayUsers />
    </div>
  )
}

export default Users;