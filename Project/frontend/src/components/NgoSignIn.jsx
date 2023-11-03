import React, { useState } from "react";
import logo from "../image/logo.svg";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
// import { useFormControl } from '@mui/material/FormControl';
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CheckBox } from "@mui/icons-material";
import "../Styles/Sign_In.css";
import { Link } from "react-router-dom";
import { responsiveFontSizes } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

function NgoSignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handlechange(event) {
    const { name, value } = event.target;

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }
  async function handelsignin(e) {
    e.preventDefault();
    try {
      const response = await fetch("/ngo/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log(response.message);
      if (!response.ok) {
        // Handle errors if the request is not successful
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response JSON

      console.log(data); // Log the response data
    } catch (error) {
      console.error(error);
    }
  }

  // console.log(user);

  return (
    <div className="login">
      {/* <div className="logoimg"> */}
      <img id="l1" src={logo} alt="logo" />
      {/* </div>  */}
      <div
        style={{ height: { md: "50px" }, width: {} }}
        className="loginform"
        id="l1"
      >
        <div
          style={{ height: { md: "50px" }, width: {} }}
          className="box-login"
        >
          <form
            onSubmit={(event) => {
              console.log(event);
              handelsignin(event);
            }}
          >
            <h1>Sign in</h1>

            <TextField
              name="email"
              type="email"
              id="filled-password-input"
              sx={{ height: "60px", width: "500px" }}
              label="Email"
              autoComplete="current-password"
              variant="filled"
              onChange={handlechange}
            />

            <FormControl
              sx={{ height: "60px", width: "500px" }}
              variant="filled"
              onChange={handlechange}
            >
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                name="password"
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment sx={{ marginLeft: "10px" }} position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <button type="submit" style={{ borderRadius: "50px" }}>
              Sign in
            </button>
            <button style={{ borderRadius: "50px" }}>Forgot Password</button>

            <div>
              <span>
                Don't have an account?
                <Link
                  style={{ fontSize: "25px", color: "blue" }}
                  to="/Registration"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NgoSignIn;
