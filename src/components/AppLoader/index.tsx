import React from "react";
import { OrbitProgress } from "react-loading-indicators";
import "../../styles/app-loader.scss";

const GlobalLoader = () => {
  return (
    <div className="app-loader">
      <OrbitProgress color="#FFF" size="large" dense />
    </div>
  );
};

export default GlobalLoader;
