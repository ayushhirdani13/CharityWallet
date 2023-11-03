import React from "react";
import logo from "../image/logo.svg";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Link } from "react-router-dom";
import "../Styles/Sign_In.css";

function Login() {
  return (
    <div className="login">
      <img src={logo} alt="logo" />

      <div className="loginform">
        <div className="box-login">
          <form>
            <h1>Login as</h1>

            <Link to="/ngosignin">
              <button>
                <CorporateFareIcon fontSize="medium" /> NGO
              </button>
            </Link>

            <button className="btn2">
              <VolunteerActivismIcon fontSize="medium" /> Donar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
