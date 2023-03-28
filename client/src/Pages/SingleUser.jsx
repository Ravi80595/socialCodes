import React, { useEffect, useState } from 'react'
import {IoAddCircleOutline,IoPersonRemoveOutline} from "react-icons/io5"
import { Box,Heading,Image,Text,Flex, Grid, GridItem,Button,Stack,Skeleton} from '@chakra-ui/react'
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
    const [isLoading,setIsLoading]=useState(false)

useEffect(()=>{
    getUserPosts()
    getSingleUser()
},[id])

const getSingleUser=()=>{
  setIsLoading(true)
    axios.get(`${baseUrl}/user/${id}`)
    .then((res)=>{  
        console.log(res.data)
        setIsLoading(false)
        setSingleProfile([res.data])
    })
    .catch((err)=>{
      setIsLoading(false)
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
    alert(res.data.msg)
  })
}
// if(isLoading){
//   return(
//   <Stack color='blue'>
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
// </Stack>
//   )
// }
return (
    <>
    <Navbar/>
    <Flex backgroundColor="blackAlpha.100">
        <Box w={["10%","10%","10%","20%"]} pl={10} pr={10}>
            {/* <Text p={5} textAlign="center">Friends</Text> */}
        </Box>
        <Box w='75%' margin="auto" p={[0,0,0,20]} pt={5}>
        {
         isLoading?<Stack color='blue'>
         <Skeleton height='20px' />
         <Skeleton height='20px' />
         <Skeleton height='20px' />
       </Stack>:SingleProfile.map(ele=>(
            <>
            <Box margin="auto">
              <Box textAlign="center">
                <Flex justifyContent='space-around'>
                <Text fontSize={["20px","20px","20px",'35px']} fontWeight='bold'>{ele.firstName+" "+ele.lastName}</Text>
                {/* <Link to="/settings"> */}
                <Button onClick={()=>handleFollow(ele._id)} bg='blue' color='white'>Follow</Button>
                {/* </Link> */}
                </Flex>
                <Flex pt={5} justifyContent='space-around'>
                <Text textAlign='center' pt={2}>Username : {ele.username}</Text>
                {/* <Text pt={5} display={["none","none","block"]}>Email : {ele.email}</Text> */}
                </Flex>
              </Box>
              <Box>
              <Flex justifyContent='space-around'  pt={5}>
                <Text>{posts.length} Posts</Text>
                <Text>{ele.followers.length} Followers</Text>
                <Text>{ele.following.length} Follow</Text>
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
         {/* <Text>Reels</Text> */}
         </Flex>
         <hr />
         <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)']} gap={5} pt={30}>
            {
            isLoading?<Stack color='blue'>
         <Skeleton height='20px' />
         <Skeleton height='20px' />
         <Skeleton height='20px' />
       </Stack>:posts && posts.map(ele=>(
                  <GridItem onClick={()=>SinglePost(ele)}>
                    <Text textAlign='center'>{ele.date}</Text>
                    <Image w={300} cursor='pointer' src={`${baseUrl}/assets/${ele.picturePath}`} h={400}/>
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
  
