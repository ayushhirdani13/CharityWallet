import React, { useState } from "react";
import "../Styles/boot.css";
import "../Styles/Don_records.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import axios from "axios";
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

function Donation_records() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [error1, setErrors1] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/donor_confirm");
    window.location.reload();
  };

  const validateEmail = () => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (re.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  async function handelSubmit(e) {
    e.preventDefault();
    const body = { email: email };
    await axios
      .post(`${process.env.REACT_APP_API}/donor/enter`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setEmailValid(true);
        } else {
          setErrors1(data.message);
          setOpen(true);
        }
      })
      .catch((error) => {
        setErrors1(error);
        setOpen(true);
      });
  }

  async function handelVerify(e) {
    e.preventDefault();
    const body = { email: email, otp: otp };
    await axios
      .post(`${process.env.REACT_APP_API}/donor/verifyDonor`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          navigate("/donor_records", { state: data.donations });
          // setEmailValid(true);
        } else {
          setErrors1(data.message);
          setOpen(true);
        }
      })
      .catch((error) => {
        setErrors1(error);
        setOpen(true);
      });
  }
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center " style={{paddingBottom:"100px", paddingTop:"100px"}}  >
        <div style={{height:"80%", width:"60%"}}>
          <form
            action=""
            className="needs-validation d-flex align-items-center justify-content-center"
            noValidate
            onSubmit={validateEmail}
            style={{height:"100%", width:"100%"}}
          >
            <div className="card" style={{width:"60%" }}>
              <div className="card-header" style={{justifyContent:"center", display:"flex"}}>Enter Donar Details</div>
              <div className="card-body">
                <div className="donarInputsection">
                  <div className="form-floating mb-3 mt-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatinginput12"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label for="floatinginput12">Email</label>
                    <div className="invalid-feedback">Invalid Email.</div>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      type="number"
                      class="form-control"
                      id="floatinginput13"
                      placeholder="Kush"
                      value={otp}
                      disabled={!emailValid}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <label for="floatinginput13">OTP</label>
                  </div>
                </div>
                <div
                  className="col d-flex " 
                  style={{ justifyContent: "center", alignItems: "center", gap:"20px" }}
                >
                  <button className="btn" type="reset">
                    Cancel
                  </button>
                  {emailValid ? (
                    <button
                      onClick={(e) => {
                        handelVerify(e);
                      }}
                      className="btn "
                    >
                      Submit
                    </button>
                  ) : (
                    <button onClick={(e) => handelSubmit(e)} className="btn">
                      Next
                    </button>
                  )}
                </div>
              </div>
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Donation_records;
