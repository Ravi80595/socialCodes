import React, { useEffect, useRef, useState } from 'react'
import { Box,Image,Text,Flex, Grid, GridItem,Button,useDisclosure,Modal,ModalHeader,ModalCloseButton,ModalOverlay,ModalContent,ModalBody,Textarea,Input,Stack,Skeleton} from '@chakra-ui/react'
import {IoAddCircleOutline} from "react-icons/io5"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {baseUrl} from "../Utils/BaseUrl"
import Navbar from "../Components/Navbar"


const Profile = () => {
  const [posts,setPosts]=useState([])
  const [image, setImage] = useState(null);
  const [profileData,setProfileData]=useState([])
  const navigate=useNavigate()
  const user = JSON.parse(localStorage.getItem("socialcodes"))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [texts,setTexts]=useState('')
  const [isLoading,setIsLoading]=useState(false)

useEffect(()=>{
  getUserPosts()
  getUserProfile()
},[firstName])


const getUserProfile=()=>{
  setIsLoading(true)
  axios.get(`${baseUrl}/user/${user._id}`)
  .then((res)=>{
    console.log(res.data)
    setIsLoading(false)
    setProfileData([res.data])
  })
}

const getUserPosts=()=>{
  axios.get(`${baseUrl}/post/${user._id}/posts`)
  .then((res)=>{
    console.log(res.data)
    setPosts(res.data)
  })
}

const profilepicref=useRef()

const SinglePost=(ele)=>{
  navigate(`/SinglePost/${ele._id}`)
}

const handleUpdate=()=>{
  const payload={
    firstName:firstName,
    lastName:lastName,
    bio:texts
  }
axios.patch(`${baseUrl}/user/updateDetail/${user._id}`,payload)
.then((res)=>{
  console.log(res)
  alert("Profile Updated")
})
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
        <Box w={["95%","100%","100%",'100%']} margin="auto" p={[0,0,20]}>
        {
          isLoading?<Stack color='blue'>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </Stack>:profileData.map(ele=>(
        <>
        <Box margin="auto">
          <Box textAlign="center">
            <Flex justifyContent='space-around' pt={[5,10,10,0]}>
            <Text fontSize={["20px","20px","20px",'35px']} fontWeight='bold'>{ele.firstName+" "+ele.lastName}</Text>
            <Button bg='blue' onClick={onOpen} color='white'>Edit Profile</Button>
            </Flex>
            <Flex pt={5} justifyContent='space-around'>
            <Text textAlign='center' pt={2}>Username : {ele.username}</Text>
            {/* <Text pt={5} display={["none","none","block"]}>Email : {ele.email}</Text> */}
            </Flex>
          </Box>
          <Box>
          <Flex justifyContent='space-around'  pt={5}>
            <Link to="/create">
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
              isLoading?<Stack color='blue'>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>:posts && posts.map(ele=>(
                  <GridItem key={ele._id} w="100%">
                    <Text textAlign='center'>{ele.date}</Text>
                    <Image w={300} onClick={()=>SinglePost(ele)} cursor="pointer" src={`${baseUrl}/assets/${ele.picturePath}`} h={[400,100,400]}/>
                  </GridItem>
              ))
            }
         </Grid>
        </Box>
    </Flex>
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay backdropBlur="2px"/>
                <ModalContent w='60vw' ml='20%' mt={100}>
                    <ModalHeader>Update Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                      <label> First name</label>
                      <Input value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                      <label>Last name</label>
                      <Input value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                      <label>Enter Bio</label>
                      <Textarea value={texts} onChange={(e)=>setTexts(e.target.value)}></Textarea>
                      <Button onClick={handleUpdate} mt={5}>Update</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
    </>
  )
}

export default Profile
