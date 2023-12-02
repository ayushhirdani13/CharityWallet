import React, { useState } from "react";
import "../Styles/boot.css";
import "../Styles/Don_records.css";
function Donation_records() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [otp, setOtp] = useState("");

  const validateEmail =
    // e.preventDefault();
    // make a POST request to the server with the email
    // const response = await fetch('http://localhost:5000/api/email-validation', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: email }),
    // });

    // const data = await response.json();

    // if (data.status === 'valid') {
    // setEmailValid(true);
    // send OTP to the email and store it in the otp state
    // setOtp(data.otp);
    // } else {
    //     setEmailValid(false);
    // }
    () => {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (re.test(email)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    };
  async function handelSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/donor/enter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      if (data.success) {
        setEmailValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handelVerify(e) {
    e.preventDefault();
    try {
      const response = await fetch("/donor/verifyDonor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, otp:otp }),
      });

      const data = await response.json();
      if (data.success) {
        // setEmailValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container">
        <form
          action=""
          className="needs-validation"
         noValidate
         onSubmit={validateEmail}
        >
          <div className="card">
            <div className="card-header">Enter Donar Details</div>
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
                    onChange={(e)=>setOtp(e.target.value)}
                    required
                  />
                  <label for="floatinginput13">OTP</label>
                </div>
              </div>
              <div
                className="col d-flex"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <button className="btn" type="reset">
                  Cancel
                </button>
                {emailValid ? (
                  <button
                    
                    onClick={(e) => {
                      handelVerify(e)
                    }}
                    className="btn"
                    type="submit"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    
                    onClick={(e) => (
                      handelSubmit(e)
                )}
                    className="btn"
                    
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Donation_records;
