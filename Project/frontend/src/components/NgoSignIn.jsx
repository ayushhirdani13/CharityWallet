import React, { useEffect, useState } from "react";
import logo from "../image/logo.svg";
import {Box} from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useFormControl } from '@mui/material/FormControl';
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CheckBox } from "@mui/icons-material";
import "../Styles/Sign_In.css";
import { Link, useNavigate } from "react-router-dom";
import { responsiveFontSizes } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function NgoSignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const [error1, setErrors1] = useState({});

  const [Type, setType] = useState({
    type: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setType({ [name]: value });
  };

  function handleOpen()
  {
    setOpen1(true);
  }
  const [errors, setErrors] = useState({});

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

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/signin");
    window.location.reload();
  };
  async function handelsignin(e) {
    e.preventDefault();

    const validationerrors = {};
    const error_email_patten = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    if (!Type.type.trim()) {
      validationerrors.type = "Type is required";
    }
    if (!user.email.trim()) {
      validationerrors.email = "Email is required";
    } else if (!error_email_patten.test(user.email)) {
      validationerrors.email = "Email is not valid";
    }

    if (!user.password.trim()) {
      validationerrors.password = "Password is required";
    } else if (user.password.length < 8) {
      validationerrors.password = "Password shold be at least 8 char";
    }

    setErrors(validationerrors);

    if (Object.keys(validationerrors).length === 0) {
      try {
        const response = await fetch(`/${Type.type.toLowerCase()}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json(); // Parse the response JSON

        if (data.success) {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("userType", Type.type);
          console.log(sessionStorage);
          window.location.href = "/home";
        } else {
          setErrors1(data.message);
          setOpen(true);
        }

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        // setErrors1(error);
        // setOpen(true);
      }
    }
  }

  async function handleForgotPass(e)
  {
    e.preventDefault();
    try{
      const validationerrors = {};
      const response = await fetch(`/${Type.type.toLowerCase()}/myNgo/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json(); // Parse the response JSON
     console.log(data);
      if (data.success) {
        // sessionStorage.setItem("loggedIn", true);
        // sessionStorage.setItem("userType", Type.type);
        // console.log(sessionStorage);
        // window.location.href = "/home";
        validationerrors.otp="Enter otp you get on Email";
        setErrors(validationerrors);
      } else {
        setErrors1(data.message);
        setOpen(true);
      }

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }


    }
    catch (error) {
      console.error(error);
    }
  }

  async function handleChangePass(e)
  {
    e.preventDefault();
    try{
      // const validationerrors = {};
      const response = await fetch(`/${Type.type.toLowerCase()}/myNgo/changePasswordConfirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json(); // Parse the response JSON
     console.log(data);
      if (data.success) {

        alert(data.message);
        
        window.location.href = "/signin";
        // validationerrors.otp="Enter otp you get on Email";
        // setErrors(validationerrors);
      } else {
        setErrors1(data.message);
        setOpen(true);
      }

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }


    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="r1">
      <div className="logo1">
        <img id="l1" src={logo} alt="logo" />
      </div>
      <div className="signfrom">
        <div className="box-signin">
          <form
            className="f1"
            onSubmit={(event) => {
              console.log(event);
              handelsignin(event);
            }}
          >
            <h1 style={{fontFamily:"'Raleway', sans-serif",fontWeight:"bold"}}>Sign in</h1>
            <FormControl
              error={errors.type}
              variant="filled"
              sx={{
                m: 1,
                minWidth: 120,
                width: "90%",
                height: "60px",
                margin: "0px",
              }}
            >
              <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
              <Select
                name="type"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={Type.type}
                onChange={handleChange}
              >
                <MenuItem value={"NGO"}>NGO</MenuItem>
                <MenuItem value={"Fundraiser"}>Fundraiser</MenuItem>
                <MenuItem value={"Oraganizer"}>Organizerr</MenuItem>
              </Select>
              <FormHelperText>{errors.type}</FormHelperText>
            </FormControl>

            <TextField
              name="email"
              id="filled-error1"
              // sx={{ height: "60px", width: "500px" }}
              label="Email"
              helperText={errors.email}
              variant="filled"
              onChange={handlechange}
              className="email"
            />

            <FormControl
              error={errors.password}
              className="password"
              sx={{ height: "60px" }}
              variant="filled"
              onChange={handlechange}
            >
              <InputLabel helperText={errors.password} htmlFor="filled-error">
                Password
              </InputLabel>
              <FilledInput
                error={errors.password}
                name="password"
                id="filled-error1"
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
              <FormHelperText>{errors.password}</FormHelperText>
            </FormControl>

            <div className="button">
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
                Sign in
              </Button>
            </div>
            <div >
              <Box component={Link} onClick={handleOpen} style={{ fontSize: "20px", color: "blue" }}>
                
                  Forgot password ?
                
              </Box>
            </div>
            <div>
              <span>
                Don't have an account?
                <Link
                  style={{ fontSize: "20px", color: "blue" }}
                  to="/Registrationas"
                >
                  Sign up
                </Link>
              </span>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              maxWidth={'sm'}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                Error
              </DialogTitle>
              <DialogContent>
                <DialogContentText>{error1}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Re Enter</Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open1}
              onClose={handleClose}
              maxWidth="lg"
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                Enter Email 
              </DialogTitle>
              <DialogContent sx={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",gap:"20px"}}>
                <DialogContentText></DialogContentText>

                <FormControl
              error={errors.type}
              variant="filled"
              sx={{
                m: 1,
                minWidth: 120,
                width: "500px",
                height: "60px",
                margin: "0px",
              }}
            >
              <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
              <Select
                name="type"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={Type.type}
                onChange={handleChange}
              >
                <MenuItem value={"NGO"}>NGO</MenuItem>
                <MenuItem value={"Fundraiser"}>Fundraiser</MenuItem>
                <MenuItem value={"Oraganizer"}>Organizerr</MenuItem>
              </Select>
              <FormHelperText>{errors.type}</FormHelperText>
            </FormControl>

                <TextField

              name="email"
              id="filled-error1"
              sx={{ height: "60px", width: "100%" }}
              label="Email"
              helperText={errors.email}
              variant="filled"
              onChange={handlechange}
              className="email"
            />
              <TextField
              disabled={!errors.otp}
              name="otp"
              id="filled-error1"
              sx={{ height: "60px", width: "100%" }}
              label="OTP"
              helperText={errors.otp}
              variant="filled"
              onChange={handlechange}
              className="email"
            />
             <TextField
              disabled={!errors.otp}
              name="password"
              id="filled-error1"
               sx={{ height: "60px", width: "500px" }}
              label="Enter New Password"
              helperText={errors.password}
              variant="filled"
              onChange={handlechange}
              className="email"
            />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {!errors.otp?( <Button onClick={(e)=>{handleForgotPass(e);}}>Next</Button>):( <Button onClick={(e)=>{handleChangePass(e);}}>Submit</Button>)}
               
              </DialogActions>
            </Dialog>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NgoSignIn;
