import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import EditProfileNgo from "../components/edit_profile_ngo_res";

function EditProfileNGO() {
  return (
    <>
      <Navbar color="linear-gradient(270deg, #7DB9E1 0.29%, rgba(216, 244, 250, 0.37) 98.4%)" />
      <EditProfileNgo />
      <Footer />
    </>
  );
}

export default EditProfileNGO;
