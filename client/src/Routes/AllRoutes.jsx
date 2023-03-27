import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Create from '../Pages/Create'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import Request from '../Pages/Request'
import Signup from '../Pages/Signup'
import SinglePost from '../Pages/SinglePost'
import SingleUser from '../Pages/SingleUser'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {

return (
    <Routes>
             <Route path="/" element={ <PrivateRoute><Home/></PrivateRoute>}></Route>
             <Route path="/signup" element={<Signup/>}></Route>
             <Route path="/login" element={<Login/>}></Route>
             <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
             <Route path="/create" element={<PrivateRoute><Create/></PrivateRoute>}></Route>
             <Route path="/request" element={<PrivateRoute><Request/></PrivateRoute>}></Route>
             <Route path="/SingleUser/:id" element={<PrivateRoute><SingleUser/></PrivateRoute>}></Route>
             <Route path="/SinglePost/:id" element={<PrivateRoute><SinglePost/></PrivateRoute>}></Route>
    </Routes>
  )
}

export default AllRoutes
