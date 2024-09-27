import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ size = 90 }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <HashLoader size={size} />
    </div>
  );
};

export default Loader;
