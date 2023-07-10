/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

const PgWrapper = ({ state, children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(setAppState(state));
    }, [state, dispatch]);
  
  return (children);
};

export default PgWrapper;
