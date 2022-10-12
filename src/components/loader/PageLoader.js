import React from "react";

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="loader"></div>
      <div className="loader-text">Loading...</div>
    </div>
  );
};
export const ButtonLoader = ()=>{
  return <div className="page-loader button-loader">
  <div className="loader"></div>
</div>
}

export const FullScreenPageLoader = () => {
  return (
    <div className="page-loader fullscreenpageloader">
      <div className="loader"></div>
    </div>
  );
};

 export default PageLoader;
