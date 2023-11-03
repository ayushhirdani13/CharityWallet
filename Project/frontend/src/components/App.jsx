import React from "react";
import Login from "./Login";
import NgoSignIn from "./NgoSignIn";
import NgoRegistration from "./NgoRegistration";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ngosignin" element={<NgoSignIn />} />
        <Route path="/Registration" element={<NgoRegistration />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Router>
  );
}

export default App;
