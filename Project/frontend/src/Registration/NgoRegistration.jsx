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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

const steps = ["Ngo Information", "Ngo Address", "Create Password", "OTP"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [skipped, setSkipped] = React.useState(new Set());
  const [error1, setErrors1] = useState({});

  const handleClose = () => {
    setOpen(false);
    // navigate("/signin");
    // window.location.reload();
  };
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
  const [data, setdata] = useState();
  // const date = new Date();
  const [Ngo, setNgo] = useState({
    name: "",
    contactNo: "",
    email: "",
    licenseNo: "",
    address: {
      city: "",
      state: "",
      pincode: "",
    },
    dateOfReg:null,
    password: "",
  });

  const [verifyngo, setverify] = useState({
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
    const error_contactNO_patten = /^\(?([6-9]{1})\)?([0-9]{9})$/;
    const error_pincode_patten = /^\d{6}$/;
    const error_password_patten =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (activeStep === 0) {
      if (!Ngo.email.trim()) {
        validationerrors.email = "Email is required";
      } else if (!error_email_patten.test(Ngo.email)) {
        validationerrors.email = "Email is not valid";
      }

      if (!Ngo.name.trim()) {
        validationerrors.name = "Ngo name is required";
      }

      if (!Ngo.contactNo.trim()) {
        validationerrors.contactNo = "Contact number is required";
      } else if (!error_contactNO_patten.test(Ngo.contactNo)) {
        validationerrors.contactNo =
          "First Digit start from 6,7,8,9 if invalid contact number";
      }

      if (!Ngo.licenseNo.trim()) {
        validationerrors.licenseNo = "license number is required";
      } else if (Ngo.licenseNo.length < 12) {
        validationerrors.licenseNo = "Invalid license number";
      }

      // if(!data.success)
      // {
      //   alert(data.message);
      // }
    } else if (activeStep === 1) {
      if (!Ngo.address.city.trim()) {
        validationerrors.city = "City name is required";
      }

      if (!Ngo.address.state.trim()) {
        validationerrors.state = "State name is required";
      }

      if (!Ngo.address.pincode.trim()) {
        validationerrors.pincode = "Pincode number is required";
      } else if (!error_pincode_patten.test(Ngo.address.pincode)) {
        validationerrors.pincode = "Pincode required only 6 digits";
      }
    } else if (activeStep === 2) {
      if (!Ngo.password.trim()) {
        validationerrors.password = "Password is required";
      } else if (!error_password_patten.test(Ngo.password)) {
        validationerrors.password =
          "Password between 7 to 15 characters which contain at least one numeric digit and a special character";
      }

      if (!confpass.confirmpassword.trim()) {
        validationerrors.confirmpassword = "confirm password is required";
      } else if (Ngo.password !== confpass.confirmpassword) {
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
      // const date = new Date();
      // setNgo((prev) => {
      //   return { ...prev, dateOfReg: date };
      // });
    }

    setNgo((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handlechangeadd(event) {
    const { name, value } = event.target;
    setNgo((prev) => {
      return { ...prev, address: { ...prev.address, [name]: value } };
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

    if (!Ngo.password.trim()) {
      validationerrors.password = "Password is required";
    } else if (!error_password_patten.test(Ngo.password)) {
      validationerrors.password =
        "Password between 7 to 15 characters which contain at least one numeric digit and a special character";
    }

    if (!confpass.confirmpassword.trim()) {
      validationerrors.confirmpassword = "confirm password is required";
    } else if (Ngo.password !== confpass.confirmpassword) {
      validationerrors.confirmpassword =
        "Confirm password is not match with password";
    }

    setErrors(validationerrors);
    if (Object.keys(validationerrors).length === 0) {
      try {
        const response = await fetch("/ngo/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Ngo),
        });
        const data1 = await response.json(); // Parse the response JSON
        setdata(data1);
        
        if (!data1.success) {
          setErrors1(data.message);
          setOpen(true);
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
    if (!verifyngo.otp.trim()) {
      validationerrors.pincode = "OTP is required";
    } else if (!error_otp_patten.test(verifyngo.otp)) {
      validationerrors.pincode = "Pincode required only 6 digits";
    }
    try {
      const response = await fetch("/ngo/confirm-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verifyngo),
      });
      const data1 = await response.json(); // Parse the response JSON

      if (data1.success) {
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("userType", "NGO");
       
        window.location.href = "/edit_profile_ngo";
      } else {
        setErrors1(data1.message);
        setOpen(true);
      }
      
      if (!response.ok) {
        // Handle errors if the request is not successful
        throw new Error(`Request failed with status: ${response.status}`);
      }

      // Parse the response JSON

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
              <Stepper activeStep={activeStep} orientation="vertical">
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
                      Ngo Information
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
                        defaultValue={Ngo.name}
                        label="ngo name"
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
                        defaultValue={Ngo.email}
                        label="Email"
                        helperText={errors.email}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                        size="small"
                      />

                      <TextField
                        error={errors.contactNo}
                        name="contactNo"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Ngo.contactNo}
                        label="Contact Number"
                        helperText={errors.contactNo}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                        size="small"
                      />

                      <TextField
                        error={errors.licenseNo}
                        name="licenseNo"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Ngo.licenseNo}
                        label="Ngo License Number"
                        helperText={errors.licenseNo}
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
                          fontSize: "40px",
                          color: "black",
                          alignContent: "left",
                          marginRight: "210px",
                          marginBottom: "10px",
                        }}
                      >
                        Ngo Address
                      </span>

                      <TextField
                        error={errors.city}
                        name="city"
                        onChange={handlechangeadd}
                        id="filled-error"
                        defaultValue={Ngo.address.city}
                        label="City"
                        helperText={errors.city}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                      />

                      <TextField
                        error={errors.state}
                        name="state"
                        onChange={handlechangeadd}
                        id="filled-error"
                        defaultValue={Ngo.address.state}
                        label="State"
                        helperText={errors.state}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                      />
                      <TextField
                        error={errors.pincode}
                        name="pincode"
                        onChange={handlechangeadd}
                        id="filled-error"
                        defaultValue={Ngo.address.pincode}
                        label="Area PIN"
                        helperText={errors.pincode}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                      />

                      <TextField
                      type="date"
                        error={errors.dateOfReg}
                        name="dateOfReg"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Ngo.dateOfReg}
                        label="Date of Ngo Registration"
                        helperText={errors.dateOfReg}
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
                          defaultValue={Ngo.password}
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
                        value={verifyngo.otp}
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
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      PaperComponent={PaperComponent}
                      maxWidth={"xl"}
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
