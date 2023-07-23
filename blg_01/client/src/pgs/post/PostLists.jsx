/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";




import { Link, useNavigate } from "react-router-dom";
import truncatePost from "../../utils/truncatePost";

import { get_private_posts, get_public_posts } from "../../redux/features/postSlice";
import { get_categories } from "../../redux/features/categorySlice";
import { LoadingCmp } from "../../cmps";
const PostLists = () => {
  return (
    <div>
      
    </div>
  )
}

export default PostLists
