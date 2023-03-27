import React, { useEffect, useState,useReducer } from 'react'
import {AiOutlineHeart,AiTwotoneHeart} from 'react-icons/ai'
import { Box,Flex,Image,Text,Modal,ModalHeader,ModalCloseButton,ModalOverlay,ModalContent,ModalBody,useDisclosure,Spinner,Input,InputGroup,InputLeftElement,InputRightElement, useToast } from '@chakra-ui/react'
import axios from 'axios'
// import {FaRegShareSquare} from "react-icons/fa"
import {MdOutlineModeComment} from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import {BsEmojiSmile,BsSave2} from "react-icons/bs"
import {CiHeart} from "react-icons/ci"
import {baseUrl} from '../Utils/BaseUrl'
import Navbar from '../Components/Navbar'

const Home = () => {
    const [feeds,setFeeds]=useState([])
    const user=JSON.parse(localStorage.getItem("socialcodes"))
    const navigate=useNavigate()
    const [likes,setLikes]=useState([])
    const [text,setText]=useState("")
    const toast=useToast()
    const { isOpen:iscommentOpen, onOpen:oncommentOpen, onClose:oncommentClose } = useDisclosure()
    const { isOpen:islikeOpen, onOpen:onlikeOpen, onClose:onlikeClose } = useDisclosure()
    const [comments,setComments]=useState([])
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


const handleRender=()=>{
  console.log("rerendrng")
  forceUpdate()
}


// ....................... Use Effect To get initialy Posts ............................

useEffect(()=>{
    getAllPosts()
},[])



// ....................... Single User Page Navigation ............................


const SingleUser=(id)=>{
  navigate(`/SingleUser/${id}`)
}

// ....................... All Posts Get Function ............................


const getAllPosts=()=>{
    axios.get(`${baseUrl}/post/all`)
    .then((res)=>{  
        console.log(res.data)
        setFeeds(res.data)
    })
}


// ....................... Post Like Function ............................


const likePost=(postId)=>{
  console.log('clicked',postId,user._id)
axios.patch(`${baseUrl}/post/${postId}/like/`,{userId: user._id})
  .then((res)=>{  
      console.log(res.data)
      setFeeds(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
}

const handleLikedUser=(id)=>{
  onlikeOpen()
  console.log(id)
axios.get(`${baseUrl}/post/likes/${id}`)
.then((res)=>{
  console.log(res.data)
  setLikes(res.data)
})
}

const handleClick=(id)=>{
  navigate(`/SingleUser/${id}`)
}

const handleComment=(postId)=>{
  if(text==""){
    toast({
      title: 'Please Enter Comment.', status: 'error',duration: 3000,isClosable: true,
    })
  }else{
  axios.put(`${baseUrl}/posts/comment`,{postId,text})
  .then((res)=>{
    console.log(res.data.comments)
    getAllPosts()
    toast({
      title: 'This Comment Added',
      description:text,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    setText(" ")
  })
}
}

const seecomments=(ele)=>{
  setComments(ele.comments)
  oncommentOpen()
} 
  return (
    <Box>
      <Navbar/>
      <Box w='80%' ml='20%' backgroundColor="blackAlpha.100">

    {
    feeds.map(ele=>(  
        <Box w={['90%','90%','90%','50%']} m='auto' backgroundColor='white' pt={[2]} mb={[5]} borderRadius={["0%","0%","15px"]} key={ele._id}>
         <Flex p="7px">
        <Flex w="100%" gap={5} justifyContent='space-around'>
        <Box>
        <Text cursor='pointer' onClick={()=>SingleUser(ele.userId)}>{`${ele.username}`}</Text>
        <Text>{ele.location}</Text>
        </Box>
        <Box>
          <Text>{ele.date}</Text>
        </Box>
        </Flex>
        {/* <Box w="30%" fontSize="40px" pl="30px">
        </Box> */}
      </Flex>
      <Text p={2}>{ele.description}</Text>
      <Box>
      <Image onDoubleClick={()=>likePost(ele._id)} w="100%" pb={5} m="auto" src={`${baseUrl}/assets/${ele.picturePath}`} borderRadius={5}/>
      </Box>
      <Flex gap={2} pl={2} justifyContent="space-between" pb={5}>
        <Flex gap={2}>
          {
            ele.likes.includes(user._id)?<AiTwotoneHeart onClick={()=>likePost(ele._id)} fontSize='25px' cursor={"pointer"} color="red"/>:<AiOutlineHeart onClick={()=>likePost(ele._id)} fontSize='25px' cursor={"pointer"}/>
          }
         <Text onClick={()=>handleLikedUser(ele._id)} cursor="pointer">{ele.likes.length} Like</Text>
         <MdOutlineModeComment cursor="pointer" fontSize='25px'/>
        </Flex>
        <Box pr={5}>
        <BsSave2 onClick={handleRender} fontSize="25px"/>
        </Box>
      </Flex>
  
    {/* <Box w='60%' > */}
      <Modal isOpen={islikeOpen} onClose={onlikeClose} scrollBehavior="inside">
                <ModalOverlay backdropBlur="2px"/>
                <ModalContent w='60vw' ml='20%' mt={100}>
                    <ModalHeader>Liked By</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                    {likes && likes.map(ele=>(
        <Flex justifyContent="space-around" pb={2} cursor="pointer" key={ele._id} _hover={{ bg: "grey" }}>
            <Box onClick={()=>handleClick(ele._id)}>
            <Image h="50px" w="50px" borderRadius="50%" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'/>
            </Box>
            <Box>
                <Text onClick={()=>handleClick(ele._id)}>{`${ele.firstName} ${ele.lastName}`}</Text>
                <Text>{ele.location}</Text>
            </Box>
              </Flex>
              ))
          }
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* </Box> */}
    </Box>
    ))
}        
</Box>
</Box>
  )
}

export default Home
