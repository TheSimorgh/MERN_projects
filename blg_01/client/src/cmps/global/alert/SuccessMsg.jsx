/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const SuccesMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Good Job",
    text: message,
  });
  // dispatch(console.log("1"));
};

export default SuccesMsg;