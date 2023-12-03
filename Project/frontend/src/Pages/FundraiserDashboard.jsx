import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Fundraiser_dashboard from "../components/FundraiserDashboard";

function Fundraiser_dashboard1() {
  return (
    <>
      <Navbar color="linear-gradient(270deg, #7DB9E1 0.29%, rgba(216, 244, 250, 0.37) 98.4%)" />
      <Fundraiser_dashboard />
      <Footer />
    </>
  );
}

export default Fundraiser_dashboard1;
