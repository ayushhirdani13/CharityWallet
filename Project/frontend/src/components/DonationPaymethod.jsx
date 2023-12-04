import React, { useState } from "react";
import Card from "../image/card_img.png";
import "../Styles/Don_paymethod.css";
import "../Styles/boot.css";
import { useLocation } from "react-router";
import axios from "axios";

function Donationmethod() {
  const location = useLocation();
  const Type = location.state.Type;

  const [DonationDetails, setUser] = useState(location.state.DonationDetails);

  const [isValid, setIsValid] = useState(false);

  function handlechange(event) {
    const { name, value } = event.target;

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //   function handleChange() {
  //     if (isValid === true) window.location.href = "/";
  //   }

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     event.currentTarget.classList.add("was-validated");

  //     if (event.currentTarget.checkValidity()) {
  //         setIsValid(true);
  //     }
  //   };
  async function handleDonation(e) {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API}/${Type.type}/donate?${Type.type}Alias=${Type.alias}`,
        DonationDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // Parse the response JSON
        if (res.data.success) {
          setIsValid(true);
          //   alert(res.data.message);
          window.location.href = "/";
        }
      })
      .catch((err) => {});
  }

  return (
    <>
      <div className="container" style={{ height: "max content" }}>
        <div className="card">
          <div className="card-header">
            <span> Payment Methods </span>
          </div>
          <div
            className="card-body"
            style={{
              height: "max-content",
              display: "flex",
              flexDirection: "coloum",
              justifyContent: "center",
            }}
          >
            {/* <div className="d-inline-flex gap-1" > */}
            <div className="upipay" style={{ width: "100%" }}>
              <p
                className="d-flex gap-1 "
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  data-bs-target="#upiCollapse"
                  aria-expanded="false"
                  aria-controls="upiCollapse"
                  style={{ height: "50px", width: "250px" }}
                >
                  Pay by UPI
                </button>
              </p>
              <div className="row">
                <div
                  class="collapse multi-collapse"
                  id="upiCollapse"
                  style={{ flexDirection: "column" }}
                >
                  <div
                    class="card card-body"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div
                      className="container-md"
                      style={{ justifyContent: "center" }}
                    >
                      <form
                        onSubmit={handleDonation}
                        className="needs-validation"
                        noValidate
                      >
                        <div className="UPI_section">
                          <h3 class="title">UPI Payment</h3>
                          <div className="form-floating my-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatinginput11"
                              placeholder="Kush"
                              name="fullname"
                              onChange={handlechange}
                              required
                            />
                            <label for="floatinginput11">Full Name</label>
                            <div className="invalid-feedback">
                              Invaild Name.
                            </div>
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="email"
                              class="form-control"
                              id="floatingInput2"
                              placeholder="name@example.com"
                              name="email"
                              onChange={handlechange}
                              required
                            />
                            <label for="floatingInput2">Email address</label>
                            <div className="invalid-feedback">
                              Invaild Email.
                            </div>
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput3"
                              placeholder="bank@upi"
                              onChange={handlechange}
                              name="upi"
                              required
                            />
                            <label for="floatingInput3">UPI ID</label>
                            <div className="invalid-feedback">
                              Invaild UPI ID.
                            </div>
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="number"
                              class="form-control"
                              id="floatingInput4"
                              placeholder="1000"
                              onChange={handlechange}
                              name="amount"
                              required
                            />
                            <label for="floatingInput4">Donation Amount</label>
                            <div className="invalid-feedback">
                              Invaild Amount.
                            </div>
                          </div>
                          <div className="procd_section">
                            <button
                              className="btn btn-outline "
                              data-bs-toggle={isValid ? "modal" : "hello"}
                              data-bs-target="#upipaycomplete"
                              //   onClick={handleChange}
                            >
                              Submit
                            </button>
                            <div
                              class="modal fade"
                              id="upipaycomplete"
                              tabindex="-1"
                              aria-labelledby="upipaycomplete"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1
                                      class="modal-title fs-5"
                                      id="exampleModalLabel"
                                    >
                                      Payment Succesfull
                                    </h1>
                                  </div>
                                  <div className="modal-body">
                                    <p>
                                      Thank You! <br /> Your Contribution
                                      Matters a lot.
                                    </p>

                                    <button
                                      type="button"
                                      class="btn btn-outline"
                                      data-bs-dismiss="modal"
                                    >
                                      OK
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cardpay" style={{ width: "100%" }}>
              <p
                className="d-flex gap-1 "
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#cardCollapse"
                  aria-expanded="false"
                  aria-controls="cardCollapse"
                  style={{ height: "50px", width: "250px" }}
                >
                  Pay by Credit/Debit Card
                </button>
              </p>
              <div className="row">
                <div
                  class="collapse multi-collapse"
                  id="cardCollapse"
                  style={{ flexDirection: "column" }}
                >
                  <div
                    class="card card-body"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div
                      className="container-md"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <form
                        onSubmit={handleDonation}
                        className="needs-validation"
                        noValidate
                      >
                        <div
                          className="row"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "0px",
                          }}
                        >
                          <div
                            className="col"
                            style={{ width: "100%", flex: "1" }}
                          >
                            <h3 class="title">Billing address</h3>
                            <div className="form-floating my-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatinginput1"
                                placeholder="Kush"
                                required
                              />
                              <label for="floatinginput1">Full Name</label>
                              <div className="invalid-feedback">
                                Invaild Name.
                              </div>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="email"
                                class="form-control"
                                id="floatinginput2"
                                placeholder="example@gmail.com"
                                required
                              />
                              <label for="floatinginput2">Email</label>
                              <div className="invalid-feedback">
                                Invaild Email.
                              </div>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatinginput3"
                                placeholder="Area-near-landmark"
                                required
                              />
                              <label for="floatinginput3">Address</label>
                              <div className="invalid-feedback">
                                Invaild Address.
                              </div>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatinginput4"
                                placeholder="Surat"
                                required
                              />
                              <label for="floatinginput4">City</label>
                              <div className="invalid-feedback">
                                Invaild City.
                              </div>
                            </div>
                            <div
                              className="row"
                              style={{
                                display: "flex",
                                gap: "10px",
                                marginLeft: "0px",
                              }}
                            >
                              <div
                                className="col"
                                style={{
                                  flex: "1",
                                  width: "100%",
                                  padding: "0px",
                                }}
                              >
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatinginput5"
                                    placeholder="State"
                                    required
                                  />
                                  <label for="floatinginput5">State</label>
                                  <div className="invalid-feedback">
                                    Invaild State.
                                  </div>
                                </div>
                              </div>
                              <div
                                className="col "
                                style={{
                                  flex: "1",
                                  width: "100%",
                                  padding: "0px",
                                }}
                              >
                                <div
                                  className="form-floating "
                                  style={{ width: "100%" }}
                                >
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatinginput6"
                                    placeholder="382XXX"
                                    required
                                  />
                                  <label for="floatinginput6">Zip Code</label>
                                  <div className="invalid-feedback">
                                    Invaild Zip code.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col"
                            style={{ width: "100%", flex: "1" }}
                          >
                            <h3 class="title">Payment</h3>
                            <div className="form-floating mb-3 mt-1">
                              <span>
                                Cards Accepted:
                                <img src={Card} alt="" />
                              </span>
                            </div>
                            <div className="form-floating mb-3 mt-1">
                              <input
                                type="text"
                                class="form-control"
                                id="floatinginput7"
                                placeholder="Kush"
                                required
                              />
                              <label for="floatinginput7">
                                Card-Holder Name
                              </label>
                              <div className="invalid-feedback">
                                Invaild Name.
                              </div>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                class="form-control"
                                id="floatinginput8"
                                placeholder="382XXXXXXXXXXXXX"
                                required
                              />
                              <label for="floatinginput8">Card Number</label>
                              <div className="invalid-feedback">
                                Invaild Number.
                              </div>
                            </div>
                            <div
                              className="row"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "row",
                                width: "100%",
                                marginLeft: "0px",
                                gap: "10px",
                              }}
                            >
                              <div className="col" style={{ padding: "0px" }}>
                                <div className="form-floating mb-3">
                                  <input
                                    type="month"
                                    class="form-control"
                                    id="floatinginput9"
                                    placeholder="382XXX"
                                    required
                                  />
                                  <label for="floatinginput9">
                                    Exp Month/Year
                                  </label>
                                  <div className="invalid-feedback">
                                    Invaild Month/Year.
                                  </div>
                                </div>
                              </div>
                              <div className="col" style={{ padding: "0px" }}>
                                <div
                                  className="form-floating"
                                  style={{ width: "100%" }}
                                >
                                  <input
                                    type="password mb-3"
                                    class="form-control"
                                    id="floatinginput10"
                                    placeholder="382XXX"
                                    required
                                  />
                                  <label for="floatinginput10">CVV</label>
                                  <div className="invalid-feedback">
                                    Invaild CVV.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="row"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "0px",
                          }}
                        >
                          <button
                            style={{ marginTop: "20px", height: "50px" }}
                            className="btn btn-outline-primary "
                            type="submit"
                            data-bs-toggle={isValid ? "modal" : "hello"}
                            data-bs-target="#cardpaycomplete"
                          >
                            Submit
                          </button>
                          <div
                            class="modal fade"
                            id="cardpaycomplete"
                            tabindex="-1"
                            aria-labelledby="cardpaycomplete"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog modal-dialog-centered">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h1
                                    class="modal-title fs-5"
                                    id="exampleModalLabel"
                                  >
                                    Payment Succesfull
                                  </h1>
                                  {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                </div>
                                <div className="modal-body">
                                  <p>
                                    Thank You! <br /> Your Contribution Matters
                                    a lot.
                                  </p>

                                  <button
                                    type="button"
                                    class="btn btn-outline"
                                    data-bs-dismiss="modal"
                                  >
                                    OK
                                  </button>
                                </div>
                              </div>
                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Donationmethod;
