import { Box,Flex,Image,Input,Menu,MenuButton,MenuList,MenuGroup,MenuItem,Button,MenuDivider,Text, Avatar, Heading} from '@chakra-ui/react'
import React from 'react'
import {AiOutlineLogout,AiOutlineHome,AiOutlineCloseCircle,AiOutlinePullRequest} from 'react-icons/ai'
import {BiMessageSquareAdd,BiMessageDetail} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {baseUrl} from "../Utils/BaseUrl"


const Navbar = () => {
  const navigate=useNavigate()
  // const {profileData} = useSelector((store)=>store.AppReducer)
  const [searchData,setSearchData]=useState("")
  // const { token,user } = JSON.parse(localStorage.getItem("socialPshcyoToken"))



const handleLogout=()=>{
  let Socialpshcyo="r"
  localStorage.setItem("socialcodes",JSON.stringify(Socialpshcyo))
  navigate("/login")
}

// ....................... Single User Page Navigation ............................

const handleClick=(id)=>{
  navigate(`/SingleUser/${id}`)
}


// window.onclick=()=>{
//   document.querySelector("#searchBox").style.display="none"
// }

const handleChange = (e) => {
  console.log(e.target.value)
    document.querySelector("#searchBox").style.display="block"
axios.get(`${baseUrl}/user/search/${e.target.value}`).then((res)=>{
  console.log(res)
  setSearchData(res.data)
})
.catch((err)=>{
  console.log(err)
})
};

const handleClose=()=>{
  document.querySelector("#searchBox").style.display="none"
}

return (
    <>
    <Box minH='100vh' zIndex="9999" boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' backgroundColor="white" position='fixed' w="20%">
    <Box justifyContent='space-between' w='100%' h={20}>
          <Box  p={[0,0,5]} justifyContent='space-around'>
        <Heading color='blue' textAlign='center' fontFamily='cursive'>OnlySad</Heading>
        <Input mt={10} onInput={(e)=>handleChange(e)} placeholder="search" w="100%" display={["block","none","block"]}/>
      </Box> 
      <Box pl={['10px','10px','40px','40px']} justifyContent="space-around" fontSize='20px'>
        <Link to="/">
          <Flex p={3} _hover={{background:'#f3f4f6'}} gap='50px'>
            <AiOutlineHome pt={5}/>
            <Text display={["none","none","block"]}>Home</Text>
          </Flex>
        </Link>
        <Link to="/create">
          <Flex p={3} _hover={{background:'#f3f4f6'}} gap='50px'>
            <BiMessageSquareAdd/>
            <Text display={["none","none","block"]}>Create</Text>
          </Flex>
        </Link>
        <Link to="/request">
          <Flex p={3} _hover={{background:'#f3f4f6'}} gap='50px'>
        <AiOutlinePullRequest/>
        <Text display={["none","none","block"]}>Request</Text>
          </Flex>
          </Link>
          <Link to="/profile">
          <Flex p={3} _hover={{background:'#f3f4f6'}} gap='50px'>
        <CgProfile/>
        <Text display={["none","none","block"]}>Profile</Text>
          </Flex>
          </Link>
          {/* <Link to='/login'> */}
          <Flex onClick={handleLogout} p={3} _hover={{background:'#f3f4f6'}} gap='50px'>
        <AiOutlineLogout/>
        <Text display={["none","none","block"]}>Logout</Text>
          </Flex>
        {/* </Link>         */}
      </Box>
    </Box>
    </Box>
    <Box id="searchBox" display='none' w={["15%","10%","10%","20%"]} position="fixed" backgroundColor="white" mt="170px" zIndex="9999" minHeight='100vh'>
      <Text cursor='pointer'  onClick={handleClose} pl='88%' fontSize='30px'>
      <AiOutlineCloseCircle />
      </Text>
    {
      searchData && searchData.map(ele=>(
        <>
        <Flex justifyContent="space-around" pb={2} cursor="pointer" key={ele._id} _hover={{ bg: "grey" }}>
            {/* <Box onClick={()=>handleClick(ele._id)}>
                <Image h="50px" w="50px" borderRadius="50%" src={`${baseUrl}/assets/${ele.picturePath}`}/>
            </Box> */}
            <Box>
                <Text fontSize={['10px','10px','10px','25px']} onClick={()=>handleClick(ele._id)}>{ele.username}</Text>
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
