import React, { useContext } from 'react'
import UserContext from '../contexts/userContext'

function UserRoutes() {
    const {user} = useContext(UserContext)
  return (
    <div>{user.name}</div>
  )
}

export default UserRoutes