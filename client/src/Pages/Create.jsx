import React from 'react'
import Navbar from '../Components/Navbar'
import {Flex,Box,Input,Button,Text} from "@chakra-ui/react"
import Dropzone from 'react-dropzone'
import {CiEdit} from "react-icons/ci"
import { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../Utils/BaseUrl'


const Create = () => {
  const [image, setImage] = useState(null);
  const [desc,setDesc]=useState("")
  const [location,setLocation]=useState("")
  const user = JSON.parse(localStorage.getItem("socialcodes"))


 
const handlePost=async()=>{
     const formData=new FormData()
     formData.append("userId",user._id)
     formData.append("description",desc)
     formData.append('location',location)
     formData.append("image", image);
     formData.append("picturePath",image.name)
    //  console.log(desc,location,image.name)
await axios.post(`${baseUrl}/post/create`,formData)
.then((res)=>{
console.log(res)
alert("Post Uploaded")
})
.catch((err)=>{
  console.log(err)
  alert(err.response.data.msg)
})
}



return (
    <Box backgroundColor="blackAlpha.100" minH='100vh'>
    <Navbar/>
    <Box w={["100%","100%","70%"]} ml="25%" pt={10}>
     <Box bg='white' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" p={[5,5,20]}>
        <Box border="2px solid grey" mb={2} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Flex>
               <Box {...getRootProps()} border={`2px dashed black`} p="1rem" width="100%" sx={{ "&:hover": { cursor: "pointer" } }}>
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <Flex>
                      <p>{image.name}</p>
                      <CiEdit/>
                    </Flex>
                  )}
                </Box>
              </Flex>
            )}
          </Dropzone>
        </Box>
     <Box>
          <Input p={10} value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Enter Caption'/>
          {/* <Input mt={2} value={location} onChange={(e)=>setLocation(e.target.value)} placeholder='Enter Location'/> */}
     </Box>
     <Text textAlign="center" mt={2}>
     <Button w="50%" bg="blue.400" color='white' onClick={handlePost}>Post</Button>
     </Text>
     </Box>
     </Box>
    </Box>
  )
}

export default Create
