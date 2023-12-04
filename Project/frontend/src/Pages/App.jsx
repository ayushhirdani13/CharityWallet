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
import Emergency from "./Emergency";
import FundraiserDashboard from "./FundraiserDashboard";
import OrgProfileDashboard from "./OrganizerProfile";
import AboutUs from "./About_us";
import CreateCampaign from "../Pages/Create_campaign";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExploreNgoHome from "../Pages/ExploreNGOhome";
import NgoProfileDashboard from "./NGOProfile";
import "../Styles/boot.css";
import EditProfileNgo from "./EditProfileNgo";
import DonorDetails from "./DonorDetails";
import DonorConfirm from "./DonorConfirm";
import DonorMethod from "./DonorMethod";
import DonorRecords from "./DonorRecords";
import Editcampaign1 from "./Edit_campaign";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/createcampaign" element={<div><Navbar/><Createcampaign /></div>} /> */}

        {/* <Route path="/footer" element={<Footer />} /> */}
        {/* <Route path="/Card" element={<Card/>} /> */}

        {sessionStorage.getItem("loggedIn") ? (
          sessionStorage.getItem("userType") === "NGO" ? (
            <>
              <Route path="/" element={<ProfileHome />} />
              <Route path="/edit_profile_ngo" element={<EditProfileNgo />} />
              <Route path="/edit_Campaign/:alias" element={<Editcampaign1 />} />
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
              <Route
                path="/Fundraiser_dashboard"
                element={<FundraiserDashboard />}
              />
              <Route
                path="/Fundraiser_dashboard/:alias"
                element={<FundraiserDashboard />}
              />
            </>
          ) : sessionStorage.getItem("userType") === "Fundraiser" ? (
            <>
              <Route path="/" element={<ProfileHome />} />
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
              <Route path="/Frprofile" element={<ProfileDashboard />} />
              <Route path="/Emergency" element={<Emergency />} />
              <Route
                path="/aftercreatecampaign"
                element={<AfterCreateCampaign />}
              />
              <Route
                path="/Fundraiser_dashboard"
                element={<FundraiserDashboard />}
              />
              <Route
                path="/Fundraiser_dashboard/:alias"
                element={<FundraiserDashboard />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<ProfileHome />} />
              <Route
                path="/organizer_dashboard"
                element={<OrgProfileDashboard />}
              />
              <Route path="/edit_Campaign/:alias" element={<Editcampaign1 />} />
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
              <Route path="/Createcampaign" element={<CreateCampaign />} />
              <Route path="/Emergency" element={<Emergency />} />
              <Route
                path="/aftercreatecampaign"
                element={<AfterCreateCampaign />}
              />
              <Route path="/Createcampaign" element={<CreateCampaign />} />
              <Route
                path="/Fundraiser_dashboard"
                element={<FundraiserDashboard />}
              />
              <Route
                path="/Fundraiser_dashboard/:alias"
                element={<FundraiserDashboard />}
              />
            </>
          )
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
            <Route
              path="/donor_records/:alias"
              element={<NgoProfileDashboard />}
            />
            {/* <Route path="/Ngoprofile" element={<Profile_Dashboard1/>} /> */}
            <Route path="/Emergency" element={<Emergency />} />
            <Route path="/donor_details" element={<DonorDetails />} />
            <Route path="/donor_method" element={<DonorMethod />} />
            <Route path="/donor_records" element={<DonorRecords />} />
            <Route path="/donor_confirm" element={<DonorConfirm />} />
            <Route
              path="/Fundraiser_dashboard"
              element={<FundraiserDashboard />}
            />
            <Route
              path="/Fundraiser_dashboard/:alias"
              element={<FundraiserDashboard />}
            />
          </>
        )}

        <Route path="/donor_details" element={<DonorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
