import express from "express"
import { login,register } from "../Controllers/Auth.js"
import { getUser, searchUser, updateUser } from "../Controllers/User.js"

const router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.get("/:id",getUser)
router.patch("/updateDetail/:id",updateUser)
router.get("/search/:id",searchUser)

export default router