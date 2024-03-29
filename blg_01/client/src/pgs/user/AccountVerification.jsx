/* eslint-disable no-unused-vars */
import { reset } from "../../redux/features/postSlice";
import { logout, verify_acc } from "../../redux/features/userSlice";
import { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const AccountVerification = () => {
 //! Get the token the url
 const { token } = useParams();
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { isVerified, loading, error } = useSelector((state) => state?.user);
 useEffect(() => {
   if (token) {
     dispatch(verify_acc(token));
   } else {
     console.log("Token not found");
   }
 }, [dispatch, token]);
 const logoutHandler = () => {
   dispatch(logout());
   dispatch(reset())
   //redirect
   setTimeout(() => {
     navigate("/login");
   }, 2000);
 };
 return (
   <>
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
       {loading ? (
         <h1>Verifying please wait....</h1>
       ) : (
         <>
           <FiCheckCircle className="text-green-500 text-9xl" />
           <h1 className="mt-4 text-3xl font-bold text-gray-700">
             Account Verified!
           </h1>
           <p className="mt-2 text-lg text-gray-600">
             Thank you for verifying your email address. You may now proceed to
             login.
           </p>
           <button
             onClick={logoutHandler}
             className="mt-8 px-8 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none"
           >
             Logout
           </button>
         </>
       )}
     </div>
   </>
 );
}

export default AccountVerification
