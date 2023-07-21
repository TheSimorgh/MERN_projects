const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../model/User");
const storage = require("../utils/fileUpload");
const multer = require("multer");

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
    // profilePicture:req?.file?.path,
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
  console.log("DONE login");
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
    userIdToUnBlock,
  });
});

//@desc   who view my profile
//@route  GET /api/v1/users/profile-viewer/:userProfileId
//@access Private
exports.profile_viewers = asyncHandler(async (req, res) => {
  const user_profile_id = req.params.userProfileId;
  const user_profile = await User.findById(user_profile_id);
  if (!user_profile) throw new Error("User to view is not Found");

  const current_user_id = req.userAuth._id;
  if (user_profile?.profileViewers?.includes(current_user_id))
    throw new Error("You have already viewed this profile");

  user_profile.profileViewers.push(current_user_id);
  await user_profile.save();

  res.json({
    message: "You have successfully viewed his/her profile",
    status: "success",
  });
});

// exports.get_my_profile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userAuth._id);
//     res.send({ message: "get myself", user });
//   } catch (error) {
//     // res.status(500).json({ message: error.message });
//     console.log(error);
//     next(error);
//   }
// };

//@desc   Get my profile
//@route  GET /api/v1/users/profile/
//@access Private
exports.get_my_profile = asyncHandler(async (req, res) => {
   //! get user id from params
  const id = req.userAuth._id;
  const user = await User.findById(id)
    .populate({
      path: "posts",
      model: "Post",
    })
    .populate({
      path: "following",
      model: "User",
    })
    .populate({
      path: "followers",
      model: "User",
    })
    .populate({
      path: "blockedUsers",
      model: "User",
    })
    .populate({
      path: "profileViewers",
      model: "User",
    });
  res.json({
    status: "success",
    message: "Profile fetched",
    user,
  });

});

//@desc  Get profile
//@route GET /api/v1/users/profile/
//@access Private

exports.get_pub_profile = asyncHandler(async (req, res, next) => {
  //! get user id from params
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .select("-password")
    .populate({
      path: "posts",
      populate: {
        path: "category",
      },
    });
  res.json({
    status: "success",
    message: "Public Profile fetched",
    user,
  });
});


//@desc   Follwing user
//@route  PUT /api/v1/users/following/:userIdToFollow
//@access Private
exports.following_user = asyncHandler(async (req, res) => {
  const following_user_id = req.params.userToFollowId;
  const current_user_id = req.userAuth._id;
  if (current_user_id.toString() === following_user_id.toString()) {
    throw new Error("Cannot Follow yourself");
  }

  await User.findByIdAndUpdate(
    current_user_id,
    {
      $addToSet: { following: following_user_id },
    },
    {
      new: true,
    }
  );

  await User.findByIdAndUpdate(
    following_user_id,
    {
      $addToSet: { followers: current_user_id },
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "You have followed the user successfully",
  });
  const following_user = await User.findById(userToFollowId);
  if (!following_user) throw new Error("User to follow is not Found");

  if (current_user.following.include(following_user))
    throw new Error("You have already following");
});

//@desc   UnFollwing user
//@route  PUT /api/v1/users/unfollowing/:userIdToUnFollow
//@access Private
exports.unfollowing_user = asyncHandler(async (req, res) => {
  const unfollowing_user_id = req.params.userToUnFollowId;
  const current_user_id = req.userAuth._id;
  if (current_user_id.toString() === unfollowing_user_id.toString()) {
    throw new Error("Cannot unFollow yourself");
  }

  await User.findByIdAndUpdate(
    current_user_id,
    {
      $pull: { following: unfollowing_user_id },
    },
    {
      new: true,
    }
  );

  await User.findByIdAndUpdate(
    unfollowing_user_id,
    {
      $pull: { followers: current_user_id },
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "You have followed the user successfully",
  });
});

// @route   POST /api/v1/users/forgot-password
// @desc   Forgot password
// @access  Public
exports.forgot_password = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userFound = await User.findOne({ email });
  if (!userFound) {
    throw new Error("There's No Email In Our System");
  }

  //Create token
  const resetToken = await userFound.generatePasswordResetToken();
  //resave the user
  await userFound.save();
  //send email
  sendEmail(email, resetToken);
  res.status(200).json({ message: "Password reset email sent", resetToken });
});

// @route   POST /api/v1/users/reset-password/:resetToken
// @desc   Reset password
// @access  Public
exports.reset_password = asyncHandler(async (req, res) => {
  //Get the id/token from email /params
  const { resetToken } = req.params;
  const { password } = req.body;
  //Convert the token to actual token that has been saved in the db
  const cryptoToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //find the user by the crypto token
  const userFound = await User.findOne({
    passwordResetToken: cryptoToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!userFound) {
    throw new Error("Password reset token is invalid or has expired");
  }
  //Update the user password
  const salt = await bcrypt.genSalt(10);
  userFound.password = await bcrypt.hash(password, salt);
  userFound.passwordResetExpires = undefined;
  userFound.passwordResetToken = undefined;
  //resave the user
  await userFound.save();
  res.status(200).json({ message: "Password reset successfully" });
});

// @route   POST /api/v1/users/account-verification-email/
// @desc    Send Account verification email
// @access  Private

exports.account_verification_email = asyncHandler(async (req, res) => {
  //Find the login user email
  const user = await User.findById(req?.userAuth?._id);
  if (!user) {
    throw new Error("User not found");
  }
  //send the token
  const token = await user.generateAccVerificationToken();
  //resave
  await user.save();
  //send the email
  sendAccVerificationEmail(user?.email, token);
  res.status(200).json({
    message: `Account verification email sent ${user?.email}`,
  });
});

// @route   POST /api/v1/users/verify-account/:verifyToken
// @desc    Verify token
// @access  Private
exports.account_verification = asyncHandler(async (req, res) => {
  //Get the id/token params
  const { verifyToken } = req.params;
  //Convert the token to actual token that has been saved in the db
  const cryptoToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");
  //find the user by the crypto token
  const userFound = await User.findOne({
    accountVerificationToken: cryptoToken,
    accountVerificationExpires: { $gt: Date.now() },
  });
  if (!userFound) {
    throw new Error("Account verification  token is invalid or has expired");
  }
  //Update user account
  userFound.isVerified = true;
  userFound.accountVerificationExpires = undefined;
  userFound.accountVerificationToken = undefined;
  //resave the user
  await userFound.save();
  res.status(200).json({ message: "Account  successfully verified" });
});

exports.getme = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth._id);
    res.send({ message: "getProfile", user });
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

exports.upload_profile_img = asyncHandler(async (req, res) => {
  res.status(201).json({
    status: "success",
    message: "xxx successfully fetched,",
  });
});
exports.upload_cover_img = asyncHandler(async (req, res) => {
  res.status(201).json({
    status: "success",
    message: "xxx successfully fetched,",
  });
});


