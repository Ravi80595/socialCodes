import { Box, Flex,Image,Text,useDisclosure,Modal,ModalHeader,ModalCloseButton,ModalOverlay,ModalContent,ModalBody } from '@chakra-ui/react'
import React, { useEffect,useState} from 'react'
import {AiOutlineHeart} from "react-icons/ai"
import {BiCommentDetail} from "react-icons/bi"
import Navbar from '../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {AiTwotoneHeart} from "react-icons/ai"
import { baseUrl } from '../Utils/BaseUrl'



const SinglePost = () => {
    const {id}=useParams() 
    const user=JSON.parse(localStorage.getItem("socialcodes"))
    const [text,setText]=useState("")
    const [SinglePost,setSinglePost]=useState([])
    const [likes,setLikes]=useState([])
    const { isOpen:islikeOpen, onOpen:onlikeOpen, onClose:onlikeClose } = useDisclosure()
    const navigate=useNavigate()

useEffect(()=>{
    getSinglePost()
},[])


// ....................... Post Like Function ............................


const getSinglePost=()=>{
    axios.get(`${baseUrl}/post/singlepost/${id}`)
    .then((res)=>{
        console.log(res)
        setSinglePost([res.data])
    })
}


const likePost=(postId)=>{
    axios.patch(`${baseUrl}/post/${postId}/like/`,{userId: user._id})
      .then((res)=>{  
          console.log(res.data)
          getSinglePost()
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

return (
    <>
    <Navbar/>
    {
        SinglePost && SinglePost.map(ele=>(
      <Box w="40%" pt='20px' pb='20px' ml='32%' boxShadow= "rgba(0, 0, 0, 0.24) 0px 3px 8px" key={ele._id} mb={10}>
            <Box>
            <Flex justifyContent='space-around' p={5}>
            <Text>{`${ele.firstName} ${ele.lastName}`}</Text>
            <Text>{ele.date}</Text>
             </Flex>
             <Image w='100%' h="500px"  src={`${baseUrl}/assets/${ele.picturePath}`}/>
             <hr /> 
        <Box>
        <Flex gap={2} pl={5} justifyContent="space-between" pr={5} pt={5}>
        <Flex gap={2} justifyContent='space-around'>
        {
            ele.likes.includes(user._id)?<AiTwotoneHeart onClick={()=>likePost(ele._id)} fontSize='25px' cursor={"pointer"} color="red"/>:<AiOutlineHeart onClick={()=>likePost(ele._id)} fontSize='25px' cursor={"pointer"}/>
          }
            <Text onClick={()=>handleLikedUser(ele._id)} cursor="pointer">{ele.likes.length} Likes</Text>
        </Flex>
            <BiCommentDetail fontSize='25px'/>
        </Flex>
        <Text textAlign='center' pt={2}>{ele.description=="undefined"?"No Caption":ele.description}</Text>
        </Box>
      </Box>
    </Box>
      ))
    }
    <Modal isOpen={islikeOpen} onClose={onlikeClose} scrollBehavior="inside">
                <ModalOverlay backdropBlur="2px"/>
                <ModalContent w='60vw' ml='20%' mt={100}>
                    <ModalHeader>Liked By</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
            {likes && likes.map(ele=>(
                <Flex onClick={()=>handleClick(ele._id)} justifyContent="space-around" pb={2} cursor="pointer" key={ele._id} _hover={{ bg: "grey" }}>
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
    </>
  )
}

export default SinglePost
