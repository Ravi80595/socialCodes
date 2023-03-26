import express from "express"
import {getFeedPosts, getLikedUser, getUserPosts,likePost} from "../Controllers/Post.js"

const router = express.Router()

router.get("/all",getFeedPosts)
router.get("/:userId/posts",getUserPosts)
router.patch("/:id/like",likePost)
router.get("/likes/:id",getLikedUser)



// router.delete("/delete/:id",verifyToken,postDelete)
// router.get("/singlepost/:id",verifyToken,getSinglePost)
// router.get("/search/:id",searchPost)
// router.put("/comment",verifyToken,addComment)

export default router;