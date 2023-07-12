/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useDispatch } from "react-redux";


const SignupForm = ({switchAuthState}) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  return (
    <div>
      <button onClick={switchAuthState} >SignupForm</button>
    </div>
  )
}

export default SignupForm
