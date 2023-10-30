import React from "react";
import logo from "../image/logo.svg"
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import {Link, Route, Routes} from 'react-router-dom';
import NgoSignIn from "./NgoSignIn";

function Login()
{

  
  return <div className="login">
     <div className="logoimg">
     <img src={logo} alt="logo" />
      </div> 
      <div className="loginfrom">
      <div className="box-login" >
        <from>
          <h1>Login as</h1>

         <Link to="/ngosignin">
          <button><CorporateFareIcon fontSize="medium"/> NGO</button>
          </Link>

          {/* <Routes>
            <Route path="/ngosignin" element={<NgoSignIn />}/>
          </Routes> */}
          
          
          <button className="btn2"><VolunteerActivismIcon fontSize="medium" /> Donar</button>
          </from>
      </div>
      </div>
      </div>
          ;
}

export default Login;