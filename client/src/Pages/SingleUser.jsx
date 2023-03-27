import React, { useEffect, useState } from 'react'
import {IoAddCircleOutline,IoPersonRemoveOutline} from "react-icons/io5"
import { Box,Heading,Image,Text,Flex, Grid, GridItem,Button } from '@chakra-ui/react'
import Navbar from '../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { baseUrl } from '../Utils/BaseUrl'

const SingleUser = () => {
    const {id}=useParams() 
    const [posts,setPosts]=useState([])
    const navigate=useNavigate()
    const user = JSON.parse(localStorage.getItem("socialcodes"))
    const [update,setUpdate]=useState(1)
    const [SingleProfile,setSingleProfile]=useState([])


useEffect(()=>{
    getUserPosts()
    getSingleUser()
},[id])

const getSingleUser=()=>{
    axios.get(`${baseUrl}/user/${id}`)
    .then((res)=>{  
        console.log(res.data)
        setSingleProfile([res.data])
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getUserPosts=()=>{
  axios.get(`${baseUrl}/post/${id}/posts`)
  .then((res)=>{
    setPosts(res.data)
  })
}

const SinglePost=(ele)=>{
  navigate(`/SinglePost/${ele._id}`)
}

const SingleUser=(id)=>{
  navigate(`/SingleUser/${id}`)
}


// ....................... Add and Remove friend Function ............................

const handleFriend=(ele)=>{
  if(ele._id==user._id){
    alert("You can't add yourself as a friend.")
  }else{
  axios.get(`${baseUrl}/users/${user._id}/${ele._id}`)
  .then((res)=>{
    // console.log(res.data)
    setUpdate(update+1)
  })
}
}

const handleFollow=(id)=>{
  const payload={
    followingId:id,
    followerId:user._id
  }
  axios.post(`${baseUrl}/user/follow`,payload)
  .then((res)=>{
    console.log(res)
  })
}

return (
    <>
    <Navbar/>
    <Flex pt={20} backgroundColor="blackAlpha.100">
        <Box w="25%" pl={10} pr={10}>
            <Text p={5} textAlign="center">Friends</Text>
            {/* {
            SingleFriends && SingleFriends.map(ele=>(

        <Flex onClick={()=>SingleUser(ele._id)} justifyContent="space-around" _hover={{ bg: "grey" }} pb={2} key={ele._id} cursor="pointer">
            <Box >
                <Image w="50px" h="50px" borderRadius="50%" src={`${baseUrl}/assets/${ele.picturePath}`}/>
            </Box>
            <Box>
                <Text>{`${ele.firstName} ${ele.lastName}`}</Text>
                <Text>{ele.location}</Text>
            </Box>
            <Box pt={3}>
                <IoPersonRemoveOutline />
            </Box>
        </Flex>
        ))
    } */}
        </Box>
        <Box w='75%' margin="auto" p={20} pt={5}>
        {
          SingleProfile.map(ele=>(
            <>
            <Box margin="auto">
              <Box textAlign="center">
                <Flex justifyContent='space-around'>
                <Heading>{ele.firstName+" "+ele.lastName}</Heading>
                {/* <Link to="/settings"> */}
                <Button onClick={()=>handleFollow(ele._id)} bg='blue' color='white'>Follow</Button>
                {/* </Link> */}
                </Flex>
                <Flex pt={5} justifyContent='space-around'>
                <Text textAlign='center' pt={2}>Username : {ele.username}</Text>
                <Text pt={5} display={["none","none","block"]}>Email : {ele.email}</Text>
                </Flex>
              </Box>
              <Box>
              <Flex justifyContent='space-around'  pt={5}>
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
         <hr />
         <Flex justifyContent="space-evenly" backgroundColor='white'>
         <Text textAlign="center">Posts</Text>
         <Text>Reels</Text>
         </Flex>
         <hr />
         <Grid templateColumns='repeat(3, 1fr)' gap={5} pt={30}>
            {
              posts && posts.map(ele=>(
                  <GridItem onClick={()=>SinglePost(ele)}>
                    <Image cursor='pointer' src={`${baseUrl}/assets/${ele.picturePath}`} h={400} w={400}/>
                  </GridItem>
              ))
            }
         </Grid>
        </Box>
    </Flex>
      
    </>
  )
}

export default SingleUser
  
