import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Create from '../Pages/Create'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import Signup from '../Pages/Signup'

const AllRoutes = () => {

return (
    <Routes>
             <Route path="/" element={<Home/>}></Route>
             <Route path="/signup" element={<Signup/>}></Route>
             <Route path="/login" element={<Login/>}></Route>
             <Route path="/profile" element={<Profile/>}></Route>
             <Route path="/create" element={<Create/>}></Route>
    </Routes>
  )
}

export default AllRoutes
