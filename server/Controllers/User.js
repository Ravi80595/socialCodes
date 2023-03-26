import User from "../Models/User.js"


// ........................... User Get Method ...............................

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
}

// ........................... User Details update Method ...............................

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {firstName,lastName,bio,phone}=req.body
        console.log(id,req.body)
        const newUser = await User.findByIdAndUpdate({ _id: id }, {
            firstName:firstName,
            lastName:lastName,
            bio:bio,
            phone:phone
        })
        res.status(200).json(newUser)
    } catch (err) {
        console.log(err)
    }
}


// ........................... User Search Method ...............................

export const searchUser=async(req,res)=>{
    const params=req.params.id
    try{
        const users= await User.find({username:{$regex:req.params.id}})
        res.send(users)
    }catch (err) {
        console.log(err)
    }
}