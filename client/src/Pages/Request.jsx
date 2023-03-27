import { Box,Flex,Text,Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { baseUrl } from '../Utils/BaseUrl'


const Request = () => {
  const [profileData,setProfileData]=useState([JSON.parse(localStorage.getItem("socialcodes"))])
  const [data,setData]=useState([])


useEffect(()=>{
  getRequests()
},[])

const getRequests=()=>{
  axios.get(`${baseUrl}/user/requests/${profileData[0]._id}`)
  .then((res)=>{
    console.log(res.data)
    setData(res.data)
  })
} 

const approved=(id)=>{
  axios.post(`${baseUrl}/user/approve/${profileData[0]._id}`,{followerId:id})
  .then((res)=>{
    console.log(res)
    alert("Approved")
    getRequests()
  })
}

const rejected=(id)=>{
  axios.post(`${baseUrl}/user/reject/${profileData[0]._id}`,{followerId:id})
  .then((res)=>{
    console.log(res)
    alert("Rejected")
    getRequests()
  })
}

return (
    <>
      <Navbar/>
      <Box backgroundColor="blackAlpha.100" ml='20%' minH='100vh' pt={10}> 
      {
      data.length==0? 
      <Box bg='white' w='95%' m='auto' p={10}>
        <Text textAlign='center'>You have currently no Request </Text>
      </Box>
      :data.map(ele=>(
      <Box w='95%' bg='white' pb={3} m='auto' borderRadius={10} mb={5}> 
      <Flex direction={['column','column','column','row']} justifyContent='space-around' p={5}>
      <Box lineHeight={10}>
      <Text>Name : {ele.firstName} {ele.lastName}</Text>
    </Box>
    <Box lineHeight={10}>
      <Text>Username : {ele.username}</Text>
      {/* <Text>Applicant gender : {ele.middleName}</Text> */}
    </Box>
    <Box lineHeight={10}>
      <Text>Followers : {ele.following.length}</Text>
    </Box>
   </Flex>
   <Text pb={5} textAlign='center'>{ele.bio}</Text>
  <Flex w='70%' m='auto' justifyContent='space-evenly' mb={5}>
    <Button onClick={()=>approved(ele._id)} bg='green' color='white' p={5} _hover={{color:'black'}}>Approve</Button>
    <Button onClick={()=>rejected(ele._id)} bg='red' color='white' p={5} _hover={{color:'black'}}>Reject</Button>
  </Flex>
      </Box>
    ))
  }
  </Box>
    </>
  )
}

export default Request