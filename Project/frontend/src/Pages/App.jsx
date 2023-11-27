import React from "react";
import Login from "../components/Login";
import NgoSignIn from "../components/NgoSignIn";
import NgoRegistration from "../components/NgoRegistration";
import Footer from "../components/footer";
import Card from "../components/Card";
import pic2_card from "../image/home_card2_pic.png";
import Createcampaign from "../components/createcampaign"
import Aftercreatecampaign from "../components/aftercreatecampaign"
import Fundraiser_dashboard from "../components/fundraiser_dashboard_res";
import Profile_home1 from "./Profile_home";
import Fundraiser_Registration from "../Registration/Fundraiser_Registration";
import Organizer_Registration from "../Registration/Organizer_Registration";


import Profile_Dashboard1 from "./Profile_dashboard";
import Edit_profile_ngo1 from "./Edit_profile_ngo";
import Edit_profile_org1 from "./Edit_profile_org";
import Donor_amount from "./donarAmount";
import Donor_details from './donarDetails';
import Donor_Confirm from './donarConfirm';
import Donor_method from './donarMethod';
import Donor_records from './donarRecords';
import Forgot_password from './forgotPassword';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createcampaign" element={<Createcampaign />} />
        <Route path="/aftercreatecampaign" element={<Aftercreatecampaign />} />
        <Route path="/" element={<Login />} />
        <Route path="/ngosignin" element={<NgoSignIn />} />
        <Route path="/Registration" element={<NgoRegistration />} />
        <Route path="/fundraiser/Registration" element={<Fundraiser_Registration />} />
        <Route path="/organizer/Registration" element={<Organizer_Registration />} />
        
        <Route path="/footer" element={<Footer />} />
        <Route path="/Card" element={<Card
                  imgSrc={pic2_card}
                  imgAlt="Card Image 1"
                  title="Help Nitya"
                  description="It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the rebuke, in the pleasure he wants to be a hair from the pain, let him flee from the pain..."
                  buttonText="Donation"
                  link="card1" 
                />} />
        <Route path="/fund" element={<Fundraiser_dashboard/>} />
        <Route path="/home" element={<Profile_home1 />} />
        <Route path="/profile_dashboard" element={<Profile_Dashboard1 />} />
        <Route path="/edit_profile_ngo" element={<Edit_profile_ngo1 />} />
        <Route path="/edit_profile" element={<Edit_profile_org1 />} />
        <Route path="/donor_amount" element={<Donor_amount />} />
        <Route path="/donor_details" element={<Donor_details />} />
        <Route path="/donor_method" element={<Donor_method />} />
        <Route path="/donor_records" element={<Donor_records />} />
        <Route path="/donor_confirm" element={<Donor_Confirm />} />
        <Route path="/forgot_password" element={<Forgot_password />} />
      </Routes>
    </Router>
  );
}

export default App;
