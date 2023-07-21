import ProtectedPage from "../cmps/global/auth/ProtectedPage";
import {
  Login,
  Home,
  Register,
  PublicUserProf,
  AddPost,
  SchedulePost,
  PostDetails,
  UpdatePost,
  UpdateUser,
  PasswordResetReq,
  PasswordReset,
  NotFound,
  PrivateUserProf,
  AccountVerification,
  PostLists,
  UploadCoverImg,
  UploadProfImg,
} from "../pgs";

const routes = [
  {
    // path: "/",
    index: true,
    element: <Home />,
    state:"home"
  },
  {
    path: "/login",
    element: <Login />,
    state:"login"
  },
  {
    path: "/register",
    element: <Register />,
    state:"register"
  },
  {
    path: "/user-public-profile/:userId",
    element:  <ProtectedPage> <PublicUserProf /> </ProtectedPage>,
    state:"user-public-profile"
  },
  {
    path: "/post/schedule/:postId",
    element:  <ProtectedPage><SchedulePost /> </ProtectedPage>,
    state:"post/schedule/"
  },
  {
    path: "/post/:postId",
    element: <ProtectedPage><PostDetails /></ProtectedPage>,
    state:"post"
  },
  {
    path: "/update-profile",
    element: <ProtectedPage> <UpdateUser /></ProtectedPage>,
    state:"update-profile"
  },
  {
    path: "/forgot-password",
    element: <PasswordResetReq />,
    state:"forgot-password"
  },
  {
    path: "/reset-password/:token",
    element: <PasswordReset />,
    state:"reset-password"
  },
  {
    path: "*",
    element: <NotFound />,
    state:"NotFound"
  },
  {
    path: "/user-profile",
    element: <ProtectedPage> <PrivateUserProf /> </ProtectedPage>,
    state:"user-profile"

  },
  {
    path: "/add-post",
    element: <ProtectedPage><AddPost /> </ProtectedPage>,
    state:"add-post"

  },
  {
    path: "/verify-account/:token",
    element: <ProtectedPage> <AccountVerification /> </ProtectedPage>,
    state:"verify-account"

  },
  {
    path: "/upload-profile-image",
    element: <ProtectedPage> <UploadProfImg /></ProtectedPage>,
    state:"upload-profile-image"

  },
  {
    path: "/upload-cover-image",
    element: <ProtectedPage><UploadCoverImg /></ProtectedPage>,
    state:"upload-cover-image"
  },
  {
    path: "/posts",
    element: <ProtectedPage><PostLists /> </ProtectedPage>,
    state:"post"

  },
  {
    path: "/post/:postId/update",
    element:<ProtectedPage><UpdatePost /></ProtectedPage>,
    state:"post/:postId/update"
    
  },
];

export default routes;
