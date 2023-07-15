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

exports.getme = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth._id)
    res.send({ message: "getProfile" ,user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

