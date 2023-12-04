import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../Styles/Regstration.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Numbers } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

const steps = [
  "Fundraiser Information",
  "Issue And Donation Request and Address",
  "Create Password",
  "OTP",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const section1 = {
    visibility: "hidden",
  };
  const section2 = {
    visibility: "hidden",
  };
  const section3 = {
    visibility: "hidden",
  };

  const section4 = {
    visibility: "hidden",
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  

  const [Fundraiser, setFundraiser] = useState({
    name: "",
    phoneNo: "",
    email: "",
    title: "",
    issue: "",
    donationReq: Numbers,
    address: {
      city: "",
      state: "",
      pincode: "",
    },
    password: "",
    description: "",
  });

  const [verifyFundraiser, setverify] = useState({
    email: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [confpass, setConf] = useState({
    confirmpassword: "",
  });
  const handleNext = () => {
    const validationerrors = {};
    const error_email_patten = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const error_phoneNo_patten = /^\(?([6-9]{1})\)?([0-9]{9})$/;
    const error_pincode_patten = /^\d{6}$/;
    const error_password_patten =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (activeStep === 0) {
      if (!Fundraiser.email.trim()) {
        validationerrors.email = "Email is required";
      } else if (!error_email_patten.test(Fundraiser.email)) {
        validationerrors.email = "Email is not valid";
      }

      if (!Fundraiser.name.trim()) {
        validationerrors.name = "Fundraiser name is required";
      }

      if (!Fundraiser.phoneNo.trim()) {
        validationerrors.phoneNo = "Contact number is required";
      } else if (!error_phoneNo_patten.test(Fundraiser.phoneNo)) {
        validationerrors.phoneNo =
          "First Digit start from 6,7,8,9 if invalid contact number";
      }

      if (!Fundraiser.title.trim()) {
        validationerrors.title = "Title is required";
      }

      // if(!data.success)
      // {
      //   alert(data.message);
      // }
    } else if (activeStep === 1) {
      if (!Fundraiser.issue.trim()) {
        validationerrors.issue = "Issue is required";
      }

      if (Fundraiser.donationReq.length === 0) {
        validationerrors.donationReq = "Donation amount is required";
      }

      if (!Fundraiser.description.trim()) {
        validationerrors.description = " description is required";
      } else if (Fundraiser.description.length < 256) {
        validationerrors.description = " description is Maximun legth is 256";
      }

      if (!Fundraiser.address.city.trim()) {
        validationerrors.city = "City name is required";
      }

      if (!Fundraiser.address.state.trim()) {
        validationerrors.state = "State name is required";
      }

      if (!Fundraiser.address.pincode.trim()) {
        validationerrors.pincode = "Pincode number is required";
      } else if (!error_pincode_patten.test(Fundraiser.address.pincode)) {
        validationerrors.pincode = "Pincode required only 6 digits";
      }
    } else if (activeStep === 2) {
      if (!Fundraiser.password.trim()) {
        validationerrors.password = "Password is required";
      } else if (!error_password_patten.test(Fundraiser.password)) {
        validationerrors.password =
          "Password between 7 to 15 characters which contain at least one numeric digit and a special character";
      }

      if (!confpass.confirmpassword.trim()) {
        validationerrors.confirmpassword = "confirm password is required";
      } else if (Fundraiser.password !== confpass.confirmpassword) {
        validationerrors.confirmpassword =
          "Confirm password is not match with password";
      }
    }
    setErrors(validationerrors);

    if (Object.keys(validationerrors).length === 0) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (activeStep === 0) {
    section1.visibility = "visible";
  } else if (activeStep === 1) {
    section1.visibility = "hidden";
    section2.visibility = "visible";
  } else if (activeStep === 2) {
    section2.visibility = "hidden";
    section3.visibility = "visible";
  } else {
    section3.visibility = "hidden";
    section4.visibility = "visible";
  }
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function handleconf(event) {
    const { name, value } = event.target;
    setConf({ [name]: value });
  }
  
  function handlechange(event) {
    const { name, value } = event.target;
   
    if (name === "email") {
      setverify((prev) => {
        return { ...prev, [name]: value };
      });
      const date = new Date();
      setFundraiser((prev) => {
        return { ...prev, dateOfReg: date };
      });
    }

    setFundraiser((prev) => {
      return {
        ...prev,
        [name]: name === "donationReq" ? parseFloat(value) || 0 : value,
      };
    });
  }

  function handlechangeadd(event) {
    const { name, value } = event.target;
    setFundraiser((prev) => {
      return {
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      };
    });
  }

  function handleotp(event) {
    const { name, value } = event.target;
  

    setverify((prev) => {
      return { ...prev, [name]: value };
    });
  }

  
  async function handelregistrtion(e) {
    e.preventDefault();
    const validationerrors = {};
    const error_password_patten =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (!Fundraiser.password.trim()) {
      validationerrors.password = "Password is required";
    } else if (!error_password_patten.test(Fundraiser.password)) {
      validationerrors.password =
        "Password between 7 to 15 characters which contain at least one numeric digit and a special character";
    }

    if (!confpass.confirmpassword.trim()) {
      validationerrors.confirmpassword = "confirm password is required";
    } else if (Fundraiser.password !== confpass.confirmpassword) {
      validationerrors.confirmpassword =
        "Confirm password is not match with password";
    }

    setErrors(validationerrors);
    if (Object.keys(validationerrors).length === 0) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/fundraiser/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Fundraiser),
        });
        const data1 = await response.json(); // Parse the response JSON
        
        
          if(data1.success)
          {
            alert(data1.message);
            
          }
       

        if (!response.ok) {
          // Handle errors if the request is not successful
          throw new Error(`Request failed with status: ${response.status}`);
        }

        // Log the response data
      } catch (error) {
        console.error(error);
      }
    }
  }
  async function handleconfirmregistrstion(e) {
    e.preventDefault();
    const validationerrors = {};
    const error_otp_patten = /^\d{6}$/;
    if (!verifyFundraiser.otp.trim()) {
      validationerrors.pincode = "OTP is required";
    } else if (!error_otp_patten.test(verifyFundraiser.otp)) {
      validationerrors.pincode = "Pincode required only 6 digits";
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/fundraiser/completeRegistration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verifyFundraiser),
      });

      if (!response.ok) {
        // Handle errors if the request is not successful
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response JSON
      if (data.success) {
        const type = sessionStorage.getItem("userType");
        if (type == null) {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("userType", "Fundraiser");
          window.location.href = "/frprofile";
        } else {
          sessionStorage.removeItem("loggedIn");
          sessionStorage.removeItem("userType");

          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("userType", "Fundraiser");
          window.location.href = "/frprofile";
        }
      } else {
        alert(data.message);
        window.location.href = "/fundraiser/Registration";
        // setErrors1(data.message);
        // setOpen(true);
      }
  // Log the response data
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div id="r3">
      <div className="cont1">
        <div className="cont2">
          <Box className="cont3" sx={{ width: "100%", marginRight: "10px" }}>
            <div className="steppercon" style={{ height: "100%" }}>
              <span
                style={{
                  fontSize: "30px",
                  color: "white",
                  marginBottom: "30px",
                }}
              >
                Registration From
              </span>
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                style={{ marginLeft: "10%" }}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    // labelProps.optional = (
                    //   // <Typography variant="caption">Optional</Typography>
                    // );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step
                      sx={{
                        color: "white",
                        "& .MuiStepLabel-label.Mui-active": {
                          color: "white",
                          fontWeight: "700",
                        },
                        "& .MuiStepLabel-label.Mui-completed": {
                          color: "white",
                        },
                      }}
                      key={label}
                      {...stepProps}
                    >
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
            <form className="cont4">
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "40px",
                        color: "black",
                        padding: "0px",
                        // alignContent:"center",

                        marginRight: "0px",
                        marginBottom: "10px",
                      }}
                    >
                      Thank you
                      <p style={{ marginBottom: "10px", marginTop: "10px" }}>
                        For Submitting
                      </p>
                      Your appliction
                    </span>
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>GO TO HOME PAGE </Button>
                  </Box>
                </React.Fragment>
              ) : activeStep === 0 ? (
                <React.Fragment>
                  <Typography
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "2.5em",
                        color: "black",
                        fontFamily: "-moz-initial",
                        alignContent: "left",
                        marginLeft: "8%",
                        marginBottom: "0px",
                        paddingTop: "20px",
                      }}
                    >
                      Fundraiser Information
                    </span>

                    <form
                      className="section1"
                      style={section1}
                      onSubmit={(event) => {
                        
                        handelregistrtion(event);
                      }}
                    >
                      <TextField
                        error={errors.name}
                        name="name"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Fundraiser.name}
                        label="Fundraiser name"
                        helperText={errors.name}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                        size="small"
                      />

                      <TextField
                        error={errors.email}
                        name="email"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Fundraiser.email}
                        label="Email"
                        helperText={errors.email}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                        size="small"
                      />

                      <TextField
                        error={errors.phoneNo}
                        name="phoneNo"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Fundraiser.phoneNo}
                        label="Contact Number"
                        helperText={errors.phoneNo}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                        size="small"
                      />

                      <TextField
                        error={errors.title}
                        name="title"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Fundraiser.title}
                        label="Fundraiser Title"
                        helperText={errors.title}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                        size="small"
                      />
                    </form>
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 5 }}
                  >
                    <Button
                      variant="contained"
                      // color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50px",

                        ":hovor": {
                          backgroundColor: "#004574",
                          color: "white",
                        },
                        width: "130px",
                        height: "40px",
                      }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      variant="contained"
                      onClick={(event) => {
                        handelregistrtion(event);
                        handleNext();
                      }}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50px",

                        ":hovor": {
                          backgroundColor: "#004574",
                          color: "white",
                        },
                        width: "130px",
                        height: "40px",
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              ) : activeStep === 1 ? (
                <React.Fragment>
                  <Typography
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "20px",
                    }}
                  >
                    <div className="section1" style={section2}>
                      <span
                        style={{
                          fontSize: "30px",
                          color: "black",
                          justifyContent: "center",
                          alignContent: "center",
                          marginRight: "10px",
                          marginLeft: "50px",
                          //   marginBottom:"10px"
                        }}
                      >
                        Issue,Donation Request And Address
                      </span>

                      <FormControl
                        error={errors.issue}
                        variant="filled"
                        sx={{
                          m: 1,
                          minWidth: 120,
                          width: "85%",
                          height: "50px",
                          margin: "0px",
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Type
                        </InputLabel>
                        <Select
                          name="issue"
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={Fundraiser.issue}
                          onChange={handlechange}
                        >
                          <MenuItem value={"Medical"}>Medical</MenuItem>
                          <MenuItem value={"Animal"}>Animal</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                        <FormHelperText>{errors.type}</FormHelperText>
                      </FormControl>

                      <TextField
                        error={errors.description}
                        name="description"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Fundraiser.description}
                        label="Description"
                        type="text"
                        helperText={errors.description}
                        sx={{
                          width: "85%",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                        multiline
                        rows={2}
                        variant="filled"
                      />

                      <TextField
                        error={errors.donationReq}
                        name="donationReq"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Fundraiser.donationReq}
                        label="Donation Request"
                        type="number"
                        helperText={errors.donationReq}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                      />

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <TextField
                          error={errors.city}
                          name="city"
                          onChange={handlechangeadd}
                          id="filled-error"
                          defaultValue={Fundraiser.address.city}
                          label="City"
                          helperText={errors.city}
                          sx={{ width: "28%", height: "50px" }}
                          variant="filled"
                        />

                        <TextField
                          error={errors.state}
                          name="state"
                          onChange={handlechangeadd}
                          id="filled-error"
                          defaultValue={Fundraiser.address.state}
                          label="State"
                          helperText={errors.state}
                          sx={{ width: "26%", height: "50px" }}
                          variant="filled"
                        />
                        <TextField
                          error={errors.pincode}
                          name="pincode"
                          onChange={handlechangeadd}
                          id="filled-error"
                          defaultValue={Fundraiser.address.pincode}
                          label="Area PIN"
                          helperText={errors.pincode}
                          sx={{ width: "28%", height: "50px" }}
                          variant="filled"
                        />
                      </div>
                    </div>
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 5 }}
                  >
                    <Button
                      variant="contained"
                      // color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50px",

                        ":hovor": {
                          backgroundColor: "#004574",
                          color: "white",
                        },
                        width: "130px",
                        height: "40px",
                      }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50px",

                        ":hovor": {
                          backgroundColor: "#004574",
                          color: "white",
                        },
                        width: "130px",
                        height: "40px",
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              ) : activeStep === 2 ? (
                <React.Fragment>
                  <Typography
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "20px",
                    }}
                  >
                    <div className="section1" style={section3}>
                      <span
                        style={{
                          fontSize: "40px",
                          color: "black",
                          alignContent: "left",
                          marginRight: "130px",
                          marginBottom: "20px",
                        }}
                      >
                        Create Password
                      </span>
                      <FormControl
                        error={errors.password}
                        sx={{ m: 1, width: "85%" }}
                        variant="filled"
                        onChange={handlechange}
                      >
                        <InputLabel htmlFor="filled-adornment-password">
                          Password
                        </InputLabel>
                        <FilledInput
                          defaultValue={Fundraiser.password}
                          name="password"
                          id="filled-adornment-password"
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment
                              sx={{ marginLeft: "10px" }}
                              position="end"
                            >
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      {errors.password && (
                        <span style={{ color: "red", padding: "0px 75px" }}>
                          {errors.password}
                        </span>
                      )}
                      <FormControl
                        error={errors.confirmpassword}
                        sx={{ m: 1, width: "85%" }}
                        variant="filled"
                        onChange={handleconf}
                      >
                        <InputLabel htmlFor="filled-adornment-confirmpassword">
                          {" "}
                          Confirm Password
                        </InputLabel>
                        <FilledInput
                          defaultValue={confpass.confirmpassword}
                          name="confirmpassword"
                          id="filled-adornment-confirmpassword"
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment
                              sx={{ marginLeft: "10px" }}
                              position="end"
                            >
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      {errors.confirmpassword && (
                        <span style={{ color: "red" }}>
                          {errors.confirmpassword}
                        </span>
                      )}
                    </div>
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 5 }}
                  >
                    <Button
                      variant="contained"
                      // color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50px",

                        ":hovor": {
                          backgroundColor: "#004574",
                          color: "white",
                        },
                        width: "130px",
                        height: "40px",
                      }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      variant="contained"
                      onClick={(event) => {
                        handleNext();

                        handelregistrtion(event);
                      }}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50px",

                        ":hovor": {
                          backgroundColor: "#004574",
                          color: "white",
                        },
                        width: "130px",
                        height: "40px",
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "20px",
                    }}
                  >
                    <div className="section1" style={section4}>
                      <span
                        style={{
                          fontSize: "40px",
                          color: "black",
                          alignContent: "left",
                          marginRight: "220px",
                          marginBottom: "40px",
                        }}
                      >
                        Enter OTP
                      </span>

                      <TextField
                        error={errors.otp}
                        name="otp"
                        onChange={handleotp}
                        id="filled-error"
                        value={verifyFundraiser.otp}
                        label="OTP"
                        helperText={errors.otp}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                      />
                    </div>
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 5 }}
                  >
                    <Button
                      variant="contained"
                      // color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50px",

                        ":hovor": {
                          backgroundColor: "#004574",
                          color: "white",
                        },
                        width: "130px",
                        height: "40px",
                      }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      variant="contained"
                      onClick={(event) => {
                        handleconfirmregistrstion(event);
                      }}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50px",

                        ":hovor": {
                          backgroundColor: "#004574",
                          color: "white",
                        },
                        width: "130px",
                        height: "40px",
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}
