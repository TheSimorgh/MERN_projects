/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { reset_error_action } from "../../../redux/features/globalSlice";
const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops",
    text: message,
  });
dispatch(reset_error_action());
};

export default ErrorMsg;