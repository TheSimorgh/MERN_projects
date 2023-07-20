import ReactLoading from "react-loading";
const LoadingCmp = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type="spin" color="green" />
    </div>
  );
};
export default LoadingCmp