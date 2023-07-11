import { useEffect } from "react";

const NotFound = () => {
  useEffect(()=>{console.log(`You are Not_Found page`)},[])
  return (
    <>
      <h2>404</h2>
      <h2>NotFound</h2>
    </>
  );
};

export default NotFound;
