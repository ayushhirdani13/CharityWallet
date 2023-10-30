import React from "react";
import logo from "../image/logo.svg"
function Login()
{
  return <div className="login">
     <div className="logoimg">
     <img src={logo} alt="logo" />
      </div> 
      <div className="loginfrom">
        <from>
          <button>NGO</button>
          <button className="btn2">Donor</button>
          </from>
      </div>
      </div>
          ;
}

export default Login;