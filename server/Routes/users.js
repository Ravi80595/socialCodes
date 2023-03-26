import express from "express"
import { login,register } from "../Controllers/Auth.js"

const router = express.Router()


router.post("/register",register)
router.post("/login",login)

// router.patch("/profileEdit")

export default router