import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

if(
    localStorage.getItem("socialcodes") == "r" ||
    localStorage.getItem("socialcodes") == null
){
    return <Navigate to="/login"/>
}
    return children
}

export default PrivateRoute
