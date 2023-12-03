import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import NgoProfile from "../components/Ngoprofile";

function NgoProfileDashboard() {
  return (
    <>
      <Navbar color="linear-gradient(270deg, #7DB9E1 0.29%, rgba(216, 244, 250, 0.37) 98.4%)" />
      <NgoProfile />
      <Footer />
    </>
  );
}

export default NgoProfileDashboard;
