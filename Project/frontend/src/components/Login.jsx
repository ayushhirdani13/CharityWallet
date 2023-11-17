import React from "react";
import logo from "../image/logo.svg";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Link } from "react-router-dom";
import "../Styles/Login.css";

function Login() {
  return (
    <div id="r2">
    <div className="logo1">
    <img id="l1" src={logo} alt="logo" /> 
    </div>

    <div className="loginfrom">
        <div className="box-login">
          <form className="f2">
            <h1>Login as</h1>

            <Link to="/ngosignin">
              <button className="btn1">
                <CorporateFareIcon fontSize="medium" /> NGO
              </button>
            </Link>

            <button className="btn1" style={{marginBottom:"10%"}}>
              <VolunteerActivismIcon fontSize="medium" /> Donar
            </button>
          </form>
        </div>
      </div>
      </div>
  );
}

export default Login;
