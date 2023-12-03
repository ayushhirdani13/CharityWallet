import React from "react";
import logo from "../image/logo.svg";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import "../Styles/Login.css";

function Login() {
  return (
    <div id="r2">
      <div className="logo1">
        <img id="l1" src={logo} alt="logo" />
      </div>

      <div className="loginfrom">
        <div className="box-login">
          <form className="f2" >
            <h1>Registration as</h1>

            <Link to="/ngo/Registration">
              <Button
                sx={{
                  background: " #004574",
                  borderRadius: "10px",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "15px",
                  color: "white",
                  fontWeight: "bold",
                }}
                className="btn1"
                type="submit"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CorporateFareIcon fontSize="medium" />
                  <span>NGO</span>{" "}
                </Box>
              </Button>
              {/* <button className="btn1">
                
              </button> */}
            </Link>

            <Link to="/fundraiser/Registration">
              <Button
                sx={{
                  background: " #004574",
                  borderRadius: "10px",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "15px",
                  color: "white",
                  fontWeight: "bold",
                }}
                className="btn1"
                type="submit"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <VolunteerActivismIcon fontSize="medium" />
                  <span>Fundraiser</span>{" "}
                </Box>
              </Button>
              {/* <button className="btn1" style={{ marginBottom: "10%" }}>
                
              </button> */}
            </Link>

            <Link to="/organizer/Registration">
              <Button
                sx={{
                  background: " #004574",
                  borderRadius: "10px",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "15px",
                  color: "white",
                  marginBottom:"20px",
                  fontWeight: "bold",
                }}
                className="btn1"
                type="submit"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    
                  }}
                >
                  <CorporateFareIcon fontSize="medium" />
                  <span>Organizer</span>{" "}
                </Box>
              </Button>
             
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
