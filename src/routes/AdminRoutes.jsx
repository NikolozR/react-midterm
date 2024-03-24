import React, { useContext } from 'react'
import UserContext from '../contexts/userContext'

function AdminRoutes() {
    const {user} = useContext(UserContext)


    console.log(user);
  return (
    <div>AdminRoutes</div>
  )
}

export default AdminRoutes