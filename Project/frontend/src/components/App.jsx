import React from "react";
import Login from "./Login";
import NgoSignIn from "./NgoSignIn";
import NgoRegistration from "./NgoRegistration";
import Footer from "./footer";
import Card from "./Card";
import pic2_card from "../image/home_card2_pic.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ngosignin" element={<NgoSignIn />} />
        <Route path="/Registration" element={<NgoRegistration />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/Card" element={<Card
                  imgSrc={pic2_card}
                  imgAlt="Card Image 1"
                  title="Help Nitya"
                  description="It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the rebuke, in the pleasure he wants to be a hair from the pain, let him flee from the pain..."
                  buttonText="Donation"
                  link="card1" 
                />} />
      </Routes>
    </Router>
  );
}

export default App;
