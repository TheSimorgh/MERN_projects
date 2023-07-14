const jwt = require("jsonwebtoken");
const User= require("../model/User")

const isLoggin =(req,res,next)=>{
    const token =req.headers.authorization?.split(" ")[1]

    jwt.verify(token,process.env.TOKEN_SECRET,async(err,decoded)=>{
        const userId=decoded?.user?.id

        const user= await User.findById(userId).select("username,email,role,_id")
        req.userAuth=user;
        if(err){
            const err=new Error ("Token is expired or invalid")
        }else{
            next()
        }

    })
}

module.exports=isLogin;