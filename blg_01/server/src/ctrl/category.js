
const asyncHandler = require("express-async-handler");
const Category =require("../model/Category")

//@desc  Create a category
//@route POST /api/v1/categories
//@access Private
exports.createCategory=asyncHandler(async(req,res)=>{
  const {name,author}=req.body;

  const categoryFound=await Category.findOne({name});
  if(categoryFound){
    throw new Error("Category already exists")
  }
  const category = await Category.create({
    name:name,
    author:req.userAuth?._id,
  })
   await category.save()
  res.status(201).json(
    {
      status:"success",
      message:"Category successfully created",
      category
    })
})
//@desc  Get all Categories
//@route GET /api/v1/categories
//@access PUBLIC
exports.getCategories=asyncHandler(async(req,res)=>{
  const categories =await Category.find({}).populate({path:"posts",model:"Post",})
  res.status(201).json(
    {
      status:"success",
      message:"Categories successfully fetched,",
      categories
    })
})
//@desc  Delete Category
//@route DELETE /api/v1/categories/:id
//@access Private
exports.deleteCategories=asyncHandler(async(req,res)=>{
  const category =await Category.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Categoryies successfully deleted",
    del_category:category
  });
})
//@desc  update Category
//@route PUT /api/v1/categories/:id
//@access Private
exports.updateCategories=asyncHandler(async(req,res)=>{
const category = await Category.findByIdAndUpdate(req.params.id,
  {name:req.body.name},
  {
    new: true,
    runValidators: true,
  }
  )
  res.status(201).json(
    {
      status:"success",
      message:"Categories successfully deleted",
      category
    })
})

exports.get = async (req, res) => {
  try {
    console.log("get Category");
    res.send({ message: "Category GEt" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.test = async (req, res, next) => {
  try {
    console.log("get Category");
    res.send({ message: "Category GEt" });
  } catch (error) {
    next(error);
  }
};
