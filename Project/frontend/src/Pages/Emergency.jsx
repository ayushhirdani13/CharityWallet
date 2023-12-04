import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Emergency from "../components/Emergency";

function Emergency1() {
  return (
    <>
      <Navbar color="linear-gradient(270deg, #7DB9E1 0.29%, rgba(216, 244, 250, 0.37) 98.4%)" />
      <Emergency />
      <Footer />
    </>
  );
}

export default Emergency1;
