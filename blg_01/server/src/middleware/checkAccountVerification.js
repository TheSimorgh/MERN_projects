
const User =require("../model/User")

module.exports.checkAccountVerification = async(req,res,next)=>{

try {
    const user =User.findByID(req.userAuth._id)
    if(user?.isVerified){
        next()
    }else{
        res.status(401).json({ message: "Account not verified" });
    }


} catch (error) {
    console.log(error);
    return res.status(500).json({message:`Server error ${error}`})
}

}