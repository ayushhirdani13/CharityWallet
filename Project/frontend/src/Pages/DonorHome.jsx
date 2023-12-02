import React from "react";
import Footer from "../components/footer";
import Navbardonor from "../components/Navbardonor";
import Profile_home from "../components/profile_home_res";


function DonorHome() {
   
    return(
        <>
        <Navbardonor color="white"/>
        <Profile_home />
    <Footer/>
    </>
    );
  

}

export default DonorHome;