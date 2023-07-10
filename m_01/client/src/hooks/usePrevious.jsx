import  { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef(useEffect(() => {}, [value]));
  return ref.current;
};

export default usePrevious;
