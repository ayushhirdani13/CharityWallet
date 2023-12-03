import React from "react";
import Login from "../components/Login";
import NgoSignIn from "../components/NgoSignIn";
import NgoRegistration from "../Registration/NgoRegistration";
import FundraiserRegistration from "../Registration/FundraiserRegistration";
import OrganizerRegistration from "../Registration/OrganizerRegistration";
import AfterCreateCampaign from "../Pages/After_create_campaign";
import CampaignHome from "./CampaignHome";
import ProfileHome from "./ProfileHome";
import ProfileDashboard from "./ProfileDashboard";
// import Edit_profile_ngo1 from "../Pages/Edit_profile_ngo";
import EditProfileOrg from "./EditProfileOrg";
import Emergency from "./Emergency";
import FundraiserDashboard from "./FundraiserDashboard";
import AboutUs from "./About_us";
import CreateCampaign from "../Pages/Create_campaign";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExploreNgoHome from "../Pages/ExploreNGOhome";
// import Profile_Dashboard from "../components/profile_dashboard";
// import Navbar from "../components/Navbar";
// import Edit_Profile from "../components/edit_profile";
// import DonorHome from "./DonorHome";
import NgoProfileDashboard from "./NGOProfile";
import "../Styles/boot.css";
import EditProfileNgo from "../components/EditProfileNgo";
import DonorAmount from "./DonorAmount";
import DonorDetails from "./DonorDetails";
import DonorConfirm from "./DonorConfirm";
import DonorMethod from "./DonorMethod";
import DonorRecords from "./DonorRecords";

function App() {
  sessionStorage.setItem("loggedIn", false);
  return (
    <Router>
      <Routes>
        {/* <Route path="/createcampaign" element={<div><Navbar/><Createcampaign /></div>} /> */}

        {/* <Route path="/footer" element={<Footer />} /> */}
        {/* <Route path="/Card" element={<Card/>} /> */}

        {sessionStorage.getItem("loggedIn") === true ? (
          <>
            <Route path="/" element={<ProfileHome />} />
            <Route path="/edit_profile_ngo" element={<EditProfileNgo />} />
            <Route path="/edit_profile_org" element={<EditProfileOrg />} />
            <Route
              path="/Campaignhome/:alias"
              element={<AfterCreateCampaign />}
            />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Campaignhome" element={<CampaignHome />} />
            <Route path="/ExploreNgo" element={<ExploreNgoHome />} />
            <Route
              path="/ExploreNgo/:alias"
              element={<NgoProfileDashboard />}
            />
            <Route path="/Ngoprofile" element={<ProfileDashboard />} />
            <Route path="/Createcampaign" element={<CreateCampaign />} />
            <Route path="/Emergency" element={<Emergency />} />
            <Route
              path="/aftercreatecampaign"
              element={<AfterCreateCampaign />}
            />
            <Route path="/Createcampaign" element={<CreateCampaign />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ProfileHome />} />
            <Route path="/Registrationas" element={<Login />} />
            <Route path="/ngo/Registration" element={<NgoRegistration />} />
            <Route
              path="/fundraiser/Registration"
              element={<FundraiserRegistration />}
            />
            <Route
              path="/organizer/Registration"
              element={<OrganizerRegistration />}
            />
            <Route path="/signin" element={<NgoSignIn />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Campaignhome" element={<CampaignHome />} />
            <Route
              path="/Campaignhome/:alias"
              element={<AfterCreateCampaign />}
            />
            <Route path="/ExploreNgo" element={<ExploreNgoHome />} />
            <Route
              path="/ExploreNgo/:alias"
              element={<NgoProfileDashboard />}
            />
            {/* <Route path="/Ngoprofile" element={<Profile_Dashboard1/>} /> */}
            <Route path="/Emergency" element={<Emergency />} />
            <Route path="/donor_amount" element={<DonorAmount />} />
            <Route path="/donor_details" element={<DonorDetails />} />
            <Route path="/donor_method" element={<DonorMethod />} />
            <Route path="/donor_records" element={<DonorRecords />} />
            <Route path="/donor_confirm" element={<DonorConfirm />} />
          </>
        )}

        <Route path="/Fundraiser_dashboard" element={<FundraiserDashboard />} />
        {/* <Route path="/Card" element={<Card/>} />
        <Route path="/Card" element={<Card/>} />
        <Route path="/Card" element={<Card/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
