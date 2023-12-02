import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
const steps = ["Organizer Information", "Create Password", "OTP"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [error1, setErrors1] = useState({});
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/organizer/Registration");
    window.location.reload();
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

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const [data, setdata] = useState();
  const date = new Date();
  const [Organizer, setOrganizer] = useState({
    name: "",
    contactNo: "",
    email: "",
    password: "",
  });

  const [verifyOrganizer, setverify] = useState({
    email: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [confpass, setConf] = useState({
    confirmpassword: "",
  });
  const handleNext = () => {
    const validationerrors = {};
    const error_email_patten = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const error_phoneNo_patten = /^\(?([6-9]{1})\)?([0-9]{9})$/;
    const error_pincode_patten = /^\d{6}$/;
    const error_password_patten =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (activeStep === 0) {
      if (!Organizer.email.trim()) {
        validationerrors.email = "Email is required";
      } else if (!error_email_patten.test(Organizer.email)) {
        validationerrors.email = "Email is not valid";
      }

      if (!Organizer.name.trim()) {
        validationerrors.name = "Organizer name is required";
      }

      if (!Organizer.contactNo.trim()) {
        validationerrors.phoneNo = "Contact number is required";
      } else if (!error_phoneNo_patten.test(Organizer.contactNo)) {
        validationerrors.phoneNo =
          "First Digit start from 6,7,8,9 if invalid contact number";
      }
    } else if (activeStep === 1) {
      if (!Organizer.password.trim()) {
        validationerrors.password = "Password is required";
      } else if (!error_password_patten.test(Organizer.password)) {
        validationerrors.password =
          "Password between 7 to 15 characters which contain at least one numeric digit and a special character";
      }

      if (!confpass.confirmpassword.trim()) {
        validationerrors.confirmpassword = "confirm password is required";
      } else if (Organizer.password !== confpass.confirmpassword) {
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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (activeStep === 0) {
    section1.visibility = "visible";
  } else if (activeStep === 1) {
    section1.visibility = "hidden";
    section2.visibility = "visible";
  } else {
    section2.visibility = "hidden";
    section3.visibility = "visible";
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
  console.log(confpass);
  function handlechange(event) {
    const { name, value } = event.target;
    console.log(name);

    if (name === "email") {
      setverify((prev) => {
        return { ...prev, [name]: value };
      });
      const date = new Date();
      setOrganizer((prev) => {
        return { ...prev, createdAt: date };
      });
    }

    setOrganizer((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handlechangeadd(event) {
    const { name, value } = event.target;
    setOrganizer((prev) => {
      return { ...prev, address: { ...prev.address, [name]: value } };
    });
  }

  function handleotp(event) {
    const { name, value } = event.target;
    console.log(name);

    setverify((prev) => {
      return { ...prev, [name]: value };
    });
  }

  console.log(Organizer);
  console.log(verifyOrganizer);
  async function handelregistrtion(e) {
    e.preventDefault();
    const validationerrors = {};
    const error_password_patten =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (!Organizer.password.trim()) {
      validationerrors.password = "Password is required";
    } else if (!error_password_patten.test(Organizer.password)) {
      validationerrors.password =
        "Password between 7 to 15 characters which contain at least one numeric digit and a special character";
    }

    if (!confpass.confirmpassword.trim()) {
      validationerrors.confirmpassword = "confirm password is required";
    } else if (Organizer.password !== confpass.confirmpassword) {
      validationerrors.confirmpassword =
        "Confirm password is not match with password";
    }

    setErrors(validationerrors);
    if (Object.keys(validationerrors).length === 0) {
      try {
        const response = await fetch("/organizer/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Organizer),
        });
        const data1 = await response.json(); // Parse the response JSON
        setdata(data1);
        console.log(data);
        // if (!data1.success) {
        //   alert(data1.message);
        // }
        // console.log(response.message);
        setdata(data1);
        console.log(data);
        if (!data1.success) {
          setErrors1(data1.message);
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
    if (!verifyOrganizer.otp.trim()) {
      validationerrors.pincode = "OTP is required";
    } else if (!error_otp_patten.test(verifyOrganizer.otp)) {
      validationerrors.pincode = "Pincode required only 6 digits";
    }
    try {
      const response = await fetch("/organizer/confirm-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verifyOrganizer),
      });

      const data1 = await response.json(); // Parse the response JSON

      if (data1.success) {
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("userType", "Organizer");
        console.log(sessionStorage);
        window.location.href = "/edit_profile_org";
      } else {
        setErrors1(data1.message);
        setOpen(true);
      }
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
                      Organizer Information
                    </span>

                    <form
                      className="section1"
                      style={section1}
                      onSubmit={(event) => {
                        console.log(event);
                        handelregistrtion(event);
                      }}
                    >
                      <TextField
                        error={errors.name}
                        name="name"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Organizer.name}
                        label="Organizer name"
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
                        defaultValue={Organizer.email}
                        label="Email"
                        helperText={errors.email}
                        sx={{ width: "85%", height: "50px" }}
                        variant="filled"
                        size="small"
                      />

                      <TextField
                        error={errors.phoneNo}
                        name="contactNo"
                        onChange={handlechange}
                        id="filled-error"
                        defaultValue={Organizer.phoneNo}
                        label="Contact Number"
                        helperText={errors.phoneNo}
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
                          defaultValue={Organizer.password}
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
                    <div className="section1" style={section3}>
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
                        value={verifyOrganizer.otp}
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
