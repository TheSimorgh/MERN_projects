const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../model/User");
//@desc Register a new user
//@route POST /api/v1/users/register
//@access public

exports.register = asyncHandler(async (req, res) => {

    //get the details
  const { username, password, email } = req.body;
  //! Check if user exists
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User Already Exists");
  }
  //Register new user
  const newUser = new User({
    username,
    email,
    password,
  });

  //! hash password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  //save
  await newUser.save();
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    // _id: newUser?._id,
    // username: newUser?.username,
    // email: newUser?.email,
    // role: newUser?.role,
    newUser,
  });


});

//@desc Login  user
//@route POST /api/v1/users/login
//@access public

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  //compare the hashed password with the one the request
  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }

  //Update the last login
  user.lastLogin = new Date();
  res.json({
    status: "success",
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    token: generateToken(user),
    profilePicture: user?.profilePicture,
    isVerified: user?.isVerified,
    User: { user, token: generateToken(user) },
  });
});


//@desc   Block user
//@route  PUT /api/v1/users/block/:userIdToBlock
//@access Private

exports.block_user = asyncHandler(async (req, res) => {

  //* Find the user to be blocked
  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock) {
    throw new Error("User to block not found");
  }
  // ! user who is blocking
  const userBlocking = req.userAuth._id;
  // check if user is blocking him/herself
  if (userIdToBlock.toString() === userBlocking.toString()) {
    throw new Error("Cannot block yourself");
  }
  //find the current user
  const currentUser = await User.findById(userBlocking);
  //? Check if user already blocked
  if (currentUser?.blockedUsers?.includes(userIdToBlock)) {
    throw new Error("User already blocked");
  }
  //push the user to be blocked in the array of the current user
  currentUser.blockedUsers.push(userIdToBlock);
  await currentUser.save();
  res.json({
    message: "User blocked successfully",
    status: "success",
  });
});

//@desc   unBlock user
//@route  PUT /api/v1/users/unblock/:userIdToUnBlock
//@access Private
exports.unblock_user = asyncHandler(async (req, res) => {
 //* Find the user to be unblocked
 const userIdToUnBlock = req.params.userIdToUnBlock;
 const userToUnBlock = await User.findById(userIdToUnBlock);
 if (!userToUnBlock) {
   throw new Error("User to be unblock not found");
 }
 //find the current user
 const userUnBlocking = req.userAuth._id;
 const currentUser = await User.findById(userUnBlocking);

 //check if user is blocked before unblocking
 if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
   throw new Error("User not block");
 }
 //remove the user from the current user blocked users array
 currentUser.blockedUsers = currentUser.blockedUsers.filter(
   (id) => id.toString() !== userIdToUnBlock.toString()
 );
 //resave the current user
 await currentUser.save();
 res.json({
   status: "success",
   message: "User unblocked successfully",
   userIdToUnBlock
 });
});

//@desc   who view my profile
//@route  GET /api/v1/users/profile-viewer/:userProfileId
//@access Private
exports.profile_viewers = asyncHandler(async (req, res) => {
  const user_profile_id=req.params.id
  const user_profile=await User.findById(user_profile_id)
  if(!user_profile) throw new Error ("User to view is not Found")
  
  const current_user_id=req.userAuth._id
  if(user_profile?.profileViewers?.includes(current_user_id)) throw new Error ("You have already viewed this profile")
  
  user_profile.profileViewers.push(current_user_id)
  await user_profile.save()

  res.json({
    message: "You have successfully viewed his/her profile",
    status: "success",
    
  });
});


exports.getProfile = async (req, res,next) => {
  try {
    const user = await User.findById(req.params.id)
    res.send({ message: "getProfile" ,user});
  } catch (error) {
    // res.status(500).json({ message: error.message });
    console.log(error);
    next(error)
  }
};



//@desc   Follwing user
//@route  PUT /api/v1/users/following/:userIdToFollow
//@access Private
exports.following_user = asyncHandler(async (req, res) => {
  
  const following_user_id=req.params.userToFollowId;
  const current_user_id=req.userAuth._id
  if (current_user_id.toString() === following_user_id.toString()) {throw new Error("Cannot Follow yourself"); }



  await User.findByIdAndUpdate(
    current_user_id,
    {
      $addToSet: { following: following_user_id },
    },
    {
      new:true
    }
  )

  await User.findByIdAndUpdate(
    following_user_id,
    {
      $addToSet: { followers: current_user_id },
    },
    {
      new:true
    }
  )

  res.json({
    status: "success",
    message: "You have followed the user successfully",
  });
  const following_user =await User.findById(userToFollowId)
  if(!following_user) throw new Error ("User to follow is not Found")


  if(current_user.following.include(following_user)) throw new Error ("You have already following")

});



//@desc   UnFollwing user
//@route  PUT /api/v1/users/unfollowing/:userIdToUnFollow
//@access Private
exports.unfollowing_user = asyncHandler(async (req, res) => {
  const unfollowing_user_id=req.params.userToUnFollowId;
  const current_user_id=req.userAuth._id
  if (current_user_id.toString() === unfollowing_user_id.toString()) {throw new Error("Cannot Follow yourself"); }



  await User.findByIdAndUpdate(
    current_user_id,
    {
      $pull: { following: unfollowing_user_id },
    },
    {
      new:true
    }
  )

  await User.findByIdAndUpdate(
    unfollowing_user_id,
    {
      $pull: { followers: current_user_id },
    },
    {
      new:true
    }
  )

  res.json({
    status: "success",
    message: "You have followed the user successfully",
  });
});




exports.getme = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth._id)
    res.send({ message: "getProfile" ,user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.xxx = asyncHandler(async (req, res) => {
  res.status(201).json({
    status: "success",
    message: "xxx successfully fetched,",
  });
});
