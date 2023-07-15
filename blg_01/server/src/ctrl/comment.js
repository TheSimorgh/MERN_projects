const asyncHandler = require("express-async-handler");
const Comment = require("../model/Comment");
const Post = require("../model/Post");
const User = require("../model/User");

//@desc  Create a comment
//@route POST /api/v1/comments/:postId
//@access Private

exports.create_comment = asyncHandler(async (req, res) => {
  const { message, author } = req.body;
  const postId = req.params.postId;
  const comment = await Comment.create({
    message,
    author: req.userAuth._id,
    postId,
  });
  await comment.save();
  //Associate comment to a post
  await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment._id },
    },
    { new: true }
  );
  //send the response
  res.json({
    status: "success",
    message: "Comment created successfully",
    comment,
  });
});

//@desc  update comment
//@route PUT /api/v1/comments/:id
//@access Private
exports.update_comment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      message: req.body.message,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "comment successfully updated",
    comment,
  });
});

//@desc  Delete comment
//@route DELETE /api/v1/comments/:id
//@access Private
exports.delete_comment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Comment successfully deleted",
  });
});

exports.xxx = asyncHandler(async (req, res) => {
  res.status(201).json({
    status: "success",
    message: "xxx successfully fetched,",
  });
});

exports.get = async (req, res) => {
  try {
    console.log("get Comment");
    res.send({ message: "Comment GEt" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
