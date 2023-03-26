import Post from "../Models/Post.js"
import User from "../Models/User.js"
import moment from 'moment'



// ........................... Post Create Method ...............................

export const createPost = async(req,res)=>{
    try{
        const {userId,description,picturePath}= req.body
        const user = await User.findById(userId)

         // Check if the user has created a post in the last 24 hours
        const existingPost = await Post.findOne({
            userId: userId,
            createdAt: {
            $gte: moment().subtract(1, 'day').toDate()
            }
        });

  if (existingPost) {
    res.status(429).send('You can only create one post in 24 hours');
    return;
  }
        const newPost = new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            description,
            username:user.username,
            picturePath,
            likes:[],
            createdAt: new Date()
        })
        await newPost.save()
        const post = await Post.find()
        res.status(200).json(post)
    }
    catch(err){
        console.log(err)
    }
}


// ........................... All Feeds Method ...............................

export const getFeedPosts = async(req,res)=>{
    try{
        const post = await Post.find()
        res.status(200).json(post)
    }
    catch(err){
        console.log(err)
    }
}
// ........................... Single User all posts ...............................

export const getUserPosts = async(req,res)=>{
    try{
        const {userId}=req.params
        const post = await Post.find({userId})
        res.status(200).json(post)
    }
    catch(err){
        console.log(err)
    }
}

// ........................... Post Like Method ...............................

export const likePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId}=req.body;
        const post = await Post.findById(id)
        if(post.likes.includes(userId)){
            post.likes=post.likes.filter((id)=>id!==userId)
        }else{
            post.likes.push(userId)
        }
        await post.save()
        const posts = await Post.find()
        res.status(200).json(posts)
    }
    catch(err){
        console.log(err)
    }
}


// ........................... Post Liked users...............................

export const getLikedUser=async(req,res)=>{
    try{
        const {id}=req.params
        const post = await Post.findById(id)
        const like = await Promise.all(
            post.likes.map((id)=>User.findById(id))
        )
        const formatedUsers = like.map(
            ({_id, firstName, lastName, location, picturePath }) => {
                return { _id, firstName, lastName, location, picturePath }
            }
        )
        res.status(200).json(formatedUsers)
    }
    catch(err){
        console.log(err)
    }
}