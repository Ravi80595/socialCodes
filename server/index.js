import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()






const PORT = process.env.PORT || 3001
mongoose.set("strictQuery", false);
let connections = mongoose.connect(process.env.MONGO_URL)

app.listen(PORT,()=>{
    try{
        connections
        console.log(`Server Connected With DataBase ${PORT}`)
    }
    catch(err){
    console.log("Somethning Wents Wrong",err)
    }
})