import React, { useEffect, useRef, useState } from 'react'
import { Box,Heading,Image,Text,Flex, Grid, GridItem,Button,useDisclosure,Modal,ModalHeader,ModalCloseButton,ModalOverlay,ModalContent,ModalBody,Textarea,Input,Popover,PopoverTrigger,Portal,PopoverContent,PopoverArrow,PopoverHeader,PopoverBody,PopoverCloseButton,Tooltip,Spinner} from '@chakra-ui/react'
import {IoAddCircleOutline} from "react-icons/io5"
import axios from 'axios'
import {IoPersonRemoveOutline} from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import {RiImageEditFill,RiSettings4Line} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import {CiEdit} from "react-icons/ci"
import {BiChevronDown} from "react-icons/bi"
import {AiOutlineDelete} from 'react-icons/ai'
import {baseUrl} from "../Utils/BaseUrl"
import Navbar from "../Components/Navbar"


const Profile = () => {
  const [posts,setPosts]=useState([])
  const [image, setImage] = useState(null);
  const [profileData,setProfileData]=useState([JSON.parse(localStorage.getItem("socialcodes"))])
  const navigate=useNavigate()
  const user = JSON.parse(localStorage.getItem("socialcodes"))
  const { isOpen, onOpen, onClose } = useDisclosure()
console.log(profileData)

useEffect(()=>{
  getUserPosts()
},[])

const getUserPosts=()=>{
  axios.get(`${baseUrl}/posts/${user._id}/posts`)
  .then((res)=>{
    console.log(res.data)
    setPosts(res.data)
  })
}

const profilepicref=useRef()
// const handleUpdate= async()=>{
//   let formData= new FormData()
//   formData.append("images",image)
//   await axios.patch(`${baseUrl}/users/editprofile/${user._id}`,formData,{
//     headers:{
//         "Content-Type": "multipart/form-data",
//         Authorization:`Bearer ${token}`
//     }
// })
// .then((res)=>{
//   alert("Image Updated")
//   setImage(" ")
// })
// .catch((err)=>{
//   console.log(err)
// })
// }

const handleDelete=(ele)=>{
  axios.delete(`${baseUrl}/posts/delete/${ele._id}`)
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
}

const SinglePost=(ele)=>{
  navigate(`/SinglePost/${ele._id}`)
}
const SingleUser=(id)=>{
  navigate(`/SingleUser/${id}`)
}

// if(isLoading){
//   return <Spinner ml='50%' mt='10%' thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
// }

// if(isError){
//   return <h1>Something Went Wrong</h1>
// }

  return (
    <>
    <Navbar/>
    <Flex ml="20%" backgroundColor="blackAlpha.100">
        <Box w={["100%","100%","100%",'100%']} margin="auto" p={[0,0,20]}>
        {
          profileData.map(ele=>(
        <>
        <Box margin="auto">
          <Box textAlign="center">
            <Flex justifyContent='space-around'>
            <Heading>{ele.firstName+" "+ele.lastName}</Heading>
            <Link to="/settings">
            <Button>Edit Profile</Button>
            </Link>
            </Flex>
            <Flex pt={5} justifyContent='space-around'>
            <Text textAlign='center' pt={2}>Username : {ele.username}</Text>
            <Text pt={5} display={["none","none","block"]}>Email : {ele.email}</Text>
            </Flex>
          </Box>
          <Box>
          <Flex justifyContent='space-around'  pt={5}>
            <Link to="/newPost">
             <IoAddCircleOutline fontSize="25px"/>
            </Link>
            <Text>{posts.length} Posts</Text>
            <Text>{ele.friends.length} Followers</Text>
            <Text>{ele.friends.length} Follows</Text>
          </Flex>
          <Box mb={10} mt={5}>
          <Text textAlign='center'>{ele.bio}</Text>
          </Box>
          </Box>
        </Box>
  </>
  ))
 }
         <hr/>
         <Flex justifyContent="space-evenly" backgroundColor='white'>
         <Text textAlign="center">Posts</Text>
         </Flex>
         <hr />
         <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)']} gap={[2,2,5]} pt={[1,0,30]} w="100%">
            {
              posts && posts.map(ele=>(
                  <GridItem key={ele._id} w="100%">
                    <Image onClick={()=>SinglePost(ele)} cursor="pointer" src={`${baseUrl}/assets/${ele.picturePath}`} h={[100,100,400]}/>
                <Popover>
                  <PopoverTrigger>
                <Text bg='#74ceda' cursor="pointer" color='white' textAlign='center'>Delete</Text>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Are you sure.You want Delete.</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Button onClick={()=>handleDelete(ele)} colorScheme='blue'>Delete</Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
                  </GridItem>
              ))
            }
         </Grid>
        </Box>
    </Flex>
      
    </>
  )
}

export default Profile
