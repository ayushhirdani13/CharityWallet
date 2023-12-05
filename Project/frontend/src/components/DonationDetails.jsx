import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../Styles/Don_details.css";
import "../Styles/boot.css";
import { Numbers } from "@mui/icons-material";

// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function DonationDetails() {
  const location = useLocation();

  const Type = location.state;
  console.log(Type);
  const navigate = useNavigate();
 
  const [DonationDetails, setUser] = useState({
    donorName: "",
    donorEmail: "",
    donorPhoneNo: "",
    donationAmount: Numbers,
    message: "",
    // receiverType:"NGO",
  });

  

  function handlechange(event) {
    const { name, value } = event.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: name === "donationAmount" ? parseFloat(value) : value,
      };
    });
  }

  function handleChange() {
    navigate("/donor_method", {
      state: { Type: Type, DonationDetails: DonationDetails },
    });
  }

  // async function handleChange(e) {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API}/${Type.type}/donate?${Type.type}Alias=${Type.alias}`,
  //       DonationDetails,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const data = await response.json(); // Parse the response JSON
  //     if (data.success) {
  //       navigate("/");
  //     }

  //     if (!response.ok) {
  //       throw new Error(`Request failed with status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // if (isValid == true) {
  //   // navigate("/donor_amount", { state: DonationDetails });
  // }
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("was-validated");

    if (event.currentTarget.checkValidity()) {
    
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center p-5">
        <div className="card" style={{width:"50%"}}>
          <div className="card-header" style={{display:"flex", justifyContent:"center"}}>
            <span>Enter Donor Details</span>
          </div>

          <div className="card-body">
            <form
              onSubmit={handleSubmit}
              className="needs-validation"
              noValidate
            >
              <div className="details_section">
                <div className="form-floating mb-3 ">
                  <input
                    name="donorName"
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Name"
                    onChange={handlechange}
                    required
                  />
                  <label for="floatingInput" class="form-label">
                    Name
                  </label>
                  <div className="invalid-feedback">Name is required</div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={handlechange}
                    name="donorEmail"
                    required
                  />
                  <label for="floatingInput">Email</label>
                  <div className="invalid-feedback">Invaild Email</div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Contact Number"
                    onChange={handlechange}
                    name="donorPhoneNo"
                    required
                  />
                  <label for="floatingInput">Phone No.</label>
                  <div className="invalid-feedback">Invaild Phone</div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Feedback"
                    onChange={handlechange}
                    name="message"
                    required
                  />
                  <label for="floatingInput">Feedback</label>
                  {/* <div className="invalid-feedback">Invaild Phone</div> */}
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Amount"
                    onChange={handlechange}
                    name="donationAmount"
                    required
                  />
                  <label for="floatingInput">Amount</label>
                  <div className="invalid-feedback">Invaild Address</div>
                </div>
              </div>
              <div className="pnext_section">
                <button
                  class="btn"
                  type="reset"
                  style={{
                    width: "200px",
                    borderRadius: "50px",
                    height: "50px",
                    marginTop: "0px",
                  }}
                >
                  Cancel
                </button>

                <button
                  class="btn"
                  onClick={(e) => handleChange(e)}
                  style={{
                    fontFamily: "initial",
                    height: "50px",
                    marginTop: "0px",
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonationDetails;
