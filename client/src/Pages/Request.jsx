import { Box } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { baseUrl } from '../Utils/BaseUrl'

const Request = () => {
  const [profileData,setProfileData]=useState([JSON.parse(localStorage.getItem("socialcodes"))])

// useEffect=()=>{
//   getRequests()
// }

// const getRequests=()=>{
//   axios.get(`${baseUrl}/`)
// }

return (
    <Box backgroundColor="blackAlpha.100">
      <Navbar/>
      <Box>

      </Box>
    </Box>
  )
}

export default Request
