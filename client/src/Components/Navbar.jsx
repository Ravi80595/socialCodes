import { Box,Flex,Image,Input,Menu,MenuButton,MenuList,MenuGroup,MenuItem,Button,MenuDivider,Text, Avatar, Heading} from '@chakra-ui/react'
import React from 'react'
import {AiOutlineHeart,AiOutlineHome} from 'react-icons/ai'
import {BiMessageSquareAdd,BiMessageDetail} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {GrFormClose} from "react-icons/gr"
import {baseUrl} from "../Utils/BaseUrl"


const Navbar = () => {
  const navigate=useNavigate()
  // const {profileData} = useSelector((store)=>store.AppReducer)
  const [searchData,setSearchData]=useState("")
  // const { token,user } = JSON.parse(localStorage.getItem("socialPshcyoToken"))



const handleLogout=()=>{
  let Socialpshcyo=""
  localStorage.setItem("socialPshcyoToken",JSON.stringify(Socialpshcyo))
  navigate("/")
}

// ....................... Single User Page Navigation ............................

const handleClick=(id)=>{
  navigate(`/SingleUser/${id}`)
}


// window.onclick=()=>{
//   document.querySelector("#searchBox").style.display="none"
// }

const handleChange = (e) => {
    document.querySelector("#searchBox").style.display="block"
axios.get(`${baseUrl}/users/search/${e.target.value}`,{
  headers:{
    // Authorization:`Bearer ${token}`
}
}).then((res)=>{
  console.log(res)
  setSearchData(res.data)
})
.catch((err)=>{
  console.log(err)
})
};


  return (
    <>
    <Box minH='100vh' zIndex="9999" boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' backgroundColor="white" position='fixed' w="20%">
    <Box justifyContent='space-between' w='100%' h={20}>
          <Box  p={[0,0,5]} justifyContent='space-around'>
        <Heading>Sachin</Heading>
        <Input mt={10} onInput={handleChange} placeholder="search" w="100%" display={["none","none","block"]}/>
      </Box> 
      <Box p={5} justifyContent="space-evenly" fontSize='30px'>
        <Link to="/">
          <Flex mt={5} justifyContent='space-around'>
        <AiOutlineHome mt={5}/>
        <Text>Home</Text>
          </Flex>
        </Link>
        <Link to="/create">
          <Flex mt={5} justifyContent='space-around'>
        <BiMessageSquareAdd/>
        <Text>Create</Text>
          </Flex>
        </Link>
        <Link to="/profile">
          <Flex mt={5} justifyContent='space-around'>
        <AiOutlineHome/>
        <Text>Profile</Text>
          </Flex>
          </Link>
          <Link to='/login'>
          <Flex mt={5} justifyContent='space-around'>
        <AiOutlineHome/>
        <Text>Logout</Text>
          </Flex>
        </Link>        
      </Box>
    </Box>
    </Box>
    <Box id="searchBox" w="425px" position="fixed" backgroundColor="white" mt="70px" ml="245px" zIndex="9999">
    {
      searchData && searchData.map(ele=>(
        <>
        <Flex justifyContent="space-around" pb={2} cursor="pointer" key={ele._id} _hover={{ bg: "grey" }}>
            <Box onClick={()=>handleClick(ele._id)}>
                <Image h="50px" w="50px" borderRadius="50%" src={`${baseUrl}/assets/${ele.picturePath}`}/>
            </Box>
            <Box>
                <Text onClick={()=>handleClick(ele._id)}>{ele.username}</Text>
                {/* <Text>{ele.location}</Text> */}
            </Box>
            <Box pt={3}>
                {/* <IoPersonRemoveOutline onClick={()=>handleFriend(ele)}/> */}
            </Box>
        </Flex> 
        </>
      ))
    }
    </Box>
    </>
  )
}

export default Navbar
