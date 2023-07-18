/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const ProtectedPage = ({ children }) => {
  const user = true;
  return (user ? children : null)
};

export default ProtectedPage;
