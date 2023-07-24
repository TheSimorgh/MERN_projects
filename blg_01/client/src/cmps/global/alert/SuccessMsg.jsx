/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { reset_success_action } from "../../../redux/features/globalSlice";

const SuccessMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Good Job",
    text: message,
  });
   dispatch(reset_success_action());
};

export default SuccessMsg;