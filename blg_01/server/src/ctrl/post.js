const Post = require("../model/Post");
const User = require("../model/User");
const Category = require("../model/Category");
const asyncHandler = require("express-async-handler");
const storage = require("../utils/fileUpload");
const multer = require("multer");


//@desc  Get all posts
//@route GET /api/v1/posts
//@access Private

exports.get_all_post = asyncHandler(async (req, res) => {
  // !find all users who have blocked the logged-in user
  const loggedInUserId = req.userAuth?._id;
  //get current time
  const currentTime = new Date();
  const usersBlockingLoggedInuser = await User.find({
    blockedUsers: loggedInUserId,
  });
  // Extract the IDs of users who have blocked the logged-in user
  const blockingUsersIds = usersBlockingLoggedInuser?.map((user) => user?._id);
  //! Get the category, searchterm from request
  const category = req.query.category;
  const searchTerm = req.query.searchTerm;
  //query
  let query = {
    author: { $nin: blockingUsersIds },
    $or: [
      {
        shedduledPublished: { $lte: currentTime },
        shedduledPublished: null,
      },
    ],
  };
  //! check if category/searchterm is specified, then add to the query
  if (category) {
    query.category = category;
  }
  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" };
  }
  //Pagination parameters from request

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Post.countDocuments(query);

  const posts = await Post.find(query)
    .populate({
      path: "author",
      model: "User",
      select: "email role username",
    })
    .populate("category")
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });
  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(201).json({
    status: "success",
    message: "Posts successfully fetched",
    pagination,
    posts,
  });
});

//@desc  Get only 4 posts
//@route GET /api/v1/posts
//@access PUBLIC
exports.get_pub_posts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("category");
  res.status(201).json({
    status: "success",
    message: "Posts successfully fetched",
    posts,
  });
});

//@desc  Get single post
//@route GET /api/v1/posts/:id
//@access PUBLIC
exports.get_one_post = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author")
    .populate("category")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "username",
      },
    });

  res.status(201).json({
    status: "success",
    message: "Post successfully fetched",
    post,
  });
});

//@desc  Create a post
//@route POST /api/v1/post
//@access Private
exports.create_post = asyncHandler(async (req, res) => {
  console.log(req.file);
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
    image: req?.file?.path,
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

//@desc  Update Post
//@route Update /api/v1/post/:id
//@access Private
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
//@desc  Delete Post
//@route DELETE /api/v1/posts/:id
//@access Private
exports.delete_post = asyncHandler(async (req, res) => {
  const postFound = await Post.findById(req.params.id);
  const isAuthor =
    req.userAuth?._id?.toString() === postFound?.author?._id?.toString();
  console.log(isAuthor);
  if (!isAuthor)
    throw new Error("Action denied, you are not the creator of this post");
  await Post.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Post successfully deleted",
    deleted_post: postFound,
  });
});

//@desc   liking a Post
//@route  PUT /api/v1/posts/likes/:id
//@access Private

exports.like_post = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.userAuth._id;
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }

  await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { likes: userId },
    },
    { new: true }
  );
  // Remove the user from the dislikes array if present
  post.dislikes = post.dislikes.filter(
    (dislike) => dislike.toString() !== userId.toString()
  );
  //resave the post
  await post.save();
  res.status(200).json({ message: "Post liked successfully.", post });
});

//@desc   disliking a Post
//@route  PUT /api/v1/posts/dislikes/:id
//@access Private
exports.dislike_post = asyncHandler(async (req, res) => {
  //Get the id of the post
  const { id } = req.params;
  //get the login user
  const userId = req.userAuth._id;
  //Find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  //Push the user into post dislikes

  await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { dislikes: userId },
    },
    { new: true }
  );
  // Remove the user from the likes array if present
  post.likes = post.likes.filter(
    (like) => like.toString() !== userId.toString()
  );
  //resave the post
  await post.save();
  res.status(200).json({ message: "Post disliked successfully.", post });
});


//@desc   claps a Post
//@route  PUT /api/v1/posts/claps/:id
//@access Private
exports.claps = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  //implement the claps
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { claps: 1 },
    },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Post clapped successfully.", updatedPost });
});


//@desc   Shedule a post
//@route  PUT /api/v1/posts/schedule/:postId
//@access Private

exports.schedule = asyncHandler(async (req, res) => {
  //get the payload
  const { scheduledPublish } = req.body;
  const { postId } = req.params;
  //check if postid and scheduledpublished found
  if (!postId || !scheduledPublish) {
    throw new Error("PostID and schedule date are required");
  }
  //Find the post
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found...");
  }
  //check if tjhe user is the author of the post
  if (post.author.toString() !== req.userAuth._id.toString()) {
    throw new Error("You can schedulle your own post ");
  }
  // Check if the scheduledPublish date is in the past
  const scheduleDate = new Date(scheduledPublish);
  const currentDate = new Date();
  if (scheduleDate < currentDate) {
    throw new Error("The scheduled publish date cannot be in the past.");
  }
  //update the post
  post.shedduledPublished = scheduledPublish;
  await post.save();
  res.json({
    status: "success",
    message: "Post scheduled successfully",
    post,
  });
});

//@desc   post  view counta
//@route  PUT /api/v1/posts/:id/post-views-count
//@access Private
exports.view = asyncHandler(async (req, res) => {

  const {id}=req.params;
  const userId=req.userAuth._id;
  const post=await Post.findById(id);
  if(!post){throw new Error("post not found")}
  //Push thr user into post likes

  await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { postViews: userId },
    },
    { new: true }
  ).populate("author");
  await post.save();
  res.status(200).json({ message: "Post liked successfully.", post });
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


