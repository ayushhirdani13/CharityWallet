import React from "react";
import Login from "../components/Login";
import NgoSignIn from "../components/NgoSignIn";
import NgoRegistration from "../Registration/NgoRegistration";
import Fundraiser_Registration from "../Registration/Fundraiser_Registration";
import Organizer_Registration from "../Registration/Organizer_Registration";
// import Footer from "../components/footer";
// import Card from "../components/Card";
// import pic2_card from "../image/home_card2_pic.png";
// import Createcampaign from "../components/createcampaign"
import  Aftercreatecampaign1 from "../Pages/After_create_campaign"
import Campaignhome1 from "./Campaign_home";
import Profile_home1 from "./Profile_home";
import Profile_Dashboard1 from "./Profile_dashboard";
import Edit_profile_ngo1 from "../Pages/Edit_profile_ngo";
import Edit_profile_org1 from "../Pages/Edit_profile_org";
import Emergency1 from "./Emergency";
import Fundraiser_dashboard1 from "./Fundraiser_dashboard";
import AboutUs1 from "./About_us";
import Createcampaign1 from "../Pages/Create_campaign";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExploreNGOhome from "../Pages/ExploreNGOhome";
import Profile_Dashboard from "../components/profile_dashboard";
// import Navbar from "../components/Navbar";
import Edit_Profile from "../components/edit_profile";
import DonorHome from "./DonorHome";
import NgoProfile from "./NGOProfile";
import "../Styles/boot.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/createcampaign" element={<div><Navbar/><Createcampaign /></div>} /> */}
       
    
        {/* <Route path="/footer" element={<Footer />} /> */}
        {/* <Route path="/Card" element={<Card/>} /> */}
       
        
        {sessionStorage.getItem("loggedIn")?(<>
        <Route path="/edit_profile_ngo" element={<Edit_Profile/>} />
        <Route path="/edit_profile_org" element={<Edit_profile_org1 />} />
        <Route path="/Campaignhome/:alias" element={<Aftercreatecampaign1 />}/>
        <Route path="/home" element={<Profile_home1 />} />
        <Route path="/AboutUs" element={<AboutUs1/>} />
        <Route path="/Campaignhome" element={<Campaignhome1/>} />
        <Route path="/ExploreNgo" element={<ExploreNGOhome/>} />
        <Route path="/ExploreNgo/:alias" element={<NgoProfile />} />
        <Route path="/Ngoprofile" element={<Profile_Dashboard1/>} />
        <Route path="/Createcampaign" element={<Createcampaign1/>} />
        <Route path="/Emergency" element={<Emergency1/>} />
        <Route path="/aftercreatecampaign" element={<Aftercreatecampaign1 />} />
        <Route path="/Createcampaign" element={<Createcampaign1/>} />
        </>):(<>
        <Route path="/" element={<DonorHome />} />
        <Route path="/Registrationas" element={<Login />} />
        <Route path="/ngo/Registration" element={<NgoRegistration />} />
        <Route path="/fundraiser/Registration" element={<Fundraiser_Registration />} />
        <Route path="/organizer/Registration" element={<Organizer_Registration />} />
        <Route path="/signin" element={<NgoSignIn />} />
        <Route path="/home" element={<Profile_home1 />} />
        <Route path="/AboutUs" element={<AboutUs1/>} />
        <Route path="/Campaignhome" element={<Campaignhome1/>} />
        <Route path="/Campaignhome/:alias" element={<Aftercreatecampaign1 />}/>
        <Route path="/ExploreNgo" element={<ExploreNGOhome/>} />
        <Route path="/ExploreNgo/:alias" element={<NgoProfile />} />
        {/* <Route path="/Ngoprofile" element={<Profile_Dashboard1/>} /> */}
        <Route path="/Emergency" element={<Emergency1/>} />
        </>)}
        
       

        <Route path="/Fundraiser_dashboard" element={<Fundraiser_dashboard1/>} />
        {/* <Route path="/Card" element={<Card/>} />
        <Route path="/Card" element={<Card/>} />
        <Route path="/Card" element={<Card/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
