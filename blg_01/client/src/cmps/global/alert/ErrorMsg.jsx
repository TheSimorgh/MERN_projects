/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops",
    text: message,
  });
  // dispatch(console.log("1"));
};

export default ErrorMsg;