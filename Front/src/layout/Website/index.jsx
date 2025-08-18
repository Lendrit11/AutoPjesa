import React from "react";
import Navbar from "./Navbar";

const Website = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Website;
