const Post = require("../model/Post");
const User = require("../model/User");
const Category = require("../model/Category");
const asyncHandler = require("express-async-handler");

//@desc  Get only 4 posts
//@route GET /api/v1/posts
//@access PUBLIC
exports.get_all_post = asyncHandler(async (req, res) => {
  const allPost = await Post.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("category");

  res.status(201).json({
    status: "success",
    message: "Post successfully fetched,",
    allPost,
  });
});

//@desc  Get single post
//@route GET /api/v1/posts/:id
//@access PUBLIC
exports.get_one_post = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author")
    .populate("category");

  res.status(201).json({
    status: "success",
    message: "Post successfully fetched",
    post,
  });
});

//@desc  Create a post
//@route POST /api/v1/posts
//@access Private
exports.create_post = asyncHandler(async (req, res) => {
  //! Find the user/chec if user account is verified
  const userFound = await User.findById(req?.userAuth?._id);
  if (!userFound) {
    throw new Error("User Not found");
  }
  // if (!userFound?.isVerified) {
  //   throw new Error("Action denied, your account is not verified");
  // }
  //Get the payload
  const { title, content, categoryId } = req.body;
  //chech if post exists
  // const postFound = await Post.findOne({ title });
  // if (postFound) {
  //   throw new Error("Post aleady exists");
  // }
  //Create post
  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
  });
  //!Associate post to user
  await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  //* Push post into category
  await Category.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );
  //? send the response
  await post.save();
  res.json({
    status: "scuccess",
    message: "Post Succesfully created",
    post,
  });
});
exports.update_post = asyncHandler(async (req, res) => {
  //!Check if the post exists
  const { id } = req.params;
  const postFound = await Post.findById(id);
  if (!postFound) {
    throw new Error("Post not found");
  }
 //! image update
 const { title, category, content } = req.body;
  const post = await Post.findByIdAndUpdate(
    id,
    {
      image: req?.file?.path ? req?.file?.path : postFound?.image,
      title: title ? title : postFound?.title,
      category: category ? category : postFound?.category,
      content: content ? content : postFound?.content,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "post successfully updated",
    post,
  });
});

exports.delete_post = asyncHandler(async (req, res) => {
  const postFound = await Post.findById(req.params.id);
  const isAuthor = req.userAuth?._id?.toString() === postFound?.author?._id?.toString();
  console.log(isAuthor);
  if (!isAuthor) throw new Error("Action denied, you are not the creator of this post");
   await Post.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Post successfully deleted",
    deleted_post: postFound,
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
    console.log("get Post");
    res.send({ message: "Post GEt" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
