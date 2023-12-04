import React from "react";
import Footer from "../components/footer";
import Navbardonor from "../components/Navbardonor";
import ProfileHome from "../components/ProfileHome";

function DonorHome() {
  return (
    <>
      <Navbardonor color="white" />
      <ProfileHome />
      <Footer />
    </>
  );
}

export default DonorHome;
