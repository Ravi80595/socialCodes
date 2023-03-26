import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Create from '../Pages/Create'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import Request from '../Pages/Request'
import Signup from '../Pages/Signup'
import SingleUser from '../Pages/SingleUser'

const AllRoutes = () => {

return (
    <Routes>
             <Route path="/" element={<Home/>}></Route>
             <Route path="/signup" element={<Signup/>}></Route>
             <Route path="/login" element={<Login/>}></Route>
             <Route path="/profile" element={<Profile/>}></Route>
             <Route path="/create" element={<Create/>}></Route>
             <Route path="/request" element={<Request/>}></Route>
             <Route path="/SingleUser/:id" element={<SingleUser/>}></Route>
    </Routes>
  )
}

export default AllRoutes
