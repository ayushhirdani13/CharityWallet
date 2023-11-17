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

  const [errors,setErrors]=useState({});

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handlechange(event) {
    const { name, value } = event.target;
    // const validationerrors={};
    // const error_email_patten= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    // if(!user.email.trim())
    // {
    //   validationerrors.email="Email is required";
    // }
    // else if(!error_email_patten.test(user.email))
    // {
    //   validationerrors.email="Email is not valid";
    // }

   

    // setErrors(validationerrors);

    // if(Object.keys(validationerrors).length===0)
    // {
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }
  async function handelsignin(e) {
    e.preventDefault();
    
    const validationerrors={};
    const error_email_patten= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    if(!user.email.trim())
    {
      validationerrors.email="Email is required";
    }
    else if(!error_email_patten.test(user.email))
    {
      validationerrors.email="Email is not valid";
    }

    if(!user.password.trim())
    {
      validationerrors.password="Password is required";
    }
    else if(user.password.length<8)
    {
      validationerrors.password="Password shold be at least 8 char";
    }

    setErrors(validationerrors);

    if(Object.keys(validationerrors).length===0)
{
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
  }

  // console.log(user);

  return (
    <div id="r1">
      <div className="logo1">
     <img id="l1" src={logo} alt="logo" /> 
     </div>
      <div className="signfrom">
        <div className="box-signin">
          <form className="f1"
            onSubmit={(event) => {
              console.log(event);
              handelsignin(event);
            }}
          >
            <h1>Sign in</h1>

            <TextField
            error={errors.email}
              name="email"
             
              id="filled-error"
              // sx={{ height: "60px", width: "500px" }}
              label="Email"
              helperText={errors.email}
              
              variant="filled"
              onChange={handlechange}
              className="email"
             
            />
              
            <FormControl
            className="password"
              sx={{ height: "60px" }}
              variant="filled"
              onChange={handlechange}
            >
              <InputLabel helperText={errors.password}htmlFor="filled-error">
                Password
              </InputLabel>
              <FilledInput
                error={errors.password}
                name="password"
                id="filled-error"
                
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
            {errors.password&&<span style={{color:"red"}}>{errors.password}</span>}
          <div className="button"> 
            <button className="btn1" type="submit" >
              Sign in
            </button>
            <button className="btn1" >Sign up</button>
            </div>
            <div>
              <span>
                Don't have an account? 
                <Link
                  style={{ fontSize: "20px", color: "blue" }}
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
