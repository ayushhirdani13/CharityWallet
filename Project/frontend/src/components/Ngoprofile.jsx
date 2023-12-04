import React from "react";
import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";
import Axios from "axios";
// import { use } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/profile_d_res.css";

import HashLoader from "react-spinners/HashLoader";
import { Box } from "@mui/material";
function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

function NgoProfile() {
  const { alias } = useParams();
  const [loading, setloading] = useState(true);

  const [Ngo, setNgo] = useState({});
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_API}/ngo/dashboard?ngoAlias=${alias}`
      );
      setNgo(res.data);
      setloading(false);
    };
    getabs();
  }, [alias]);

  const [gallery, setGallery] = useState({});
  const [logo, setLogo] = useState({});
  const [loading1, setloading1] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_API}/ngo/gallery?ngoAlias=${alias}`
      );
      // const res1=await Axios.get('http://localhost:5000/ngo/logo?ngoAlias=sample_ngo')
      setGallery(res.data.gallery);

      //    setlogo(res1.data);
      setloading1(false);
    };
    getabs();
  }, [alias]);
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_API}/ngo/logo?ngoAlias=${alias}`
      );
      // const res1=await Axios.get('http://localhost:5000/ngo/logo?ngoAlias=sample_ngo')
      setLogo(res.data.logo);
      //    setlogo(res1.data);
      // setloading2(false);
    };
    getabs();
  }, [alias]);

  return (
    <>
      {loading === true ? (
        <Box
          sx={{
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HashLoader size="150px" loading={true} color="#36d7b7" />
        </Box>
      ) : (
        <div class="container-fluid" style={{ height: "max-content" }}>
          <div class="row">
            <div class="col-6 col-lg-8 px-0">
              <div class="py-2 border border-primary my-5 rounded-4">
                <h1 class="fs-5 fs-lg-1 text-center fw-light">
                  {Ngo.data.name}
                </h1>
              </div>

              <div class="py-2 border border-primary my-5 rounded-4">
                <h3 class="fs-5 fs-lg-3  text-center fw-light">
                  {Ngo.data.vision}
                </h3>
              </div>

              <div class="row mt-5">
                <div class="col-12 col-lg-8">
                  <div class="py-2 border border-primary  rounded-4">
                    <h3 class="fs-5 fs-lg-3  text-center fw-light">
                      {Ngo.data.address.city}, {Ngo.data.address.pincode}
                    </h3>
                  </div>
                </div>
                <div class="col-12 col-lg-4 mt-5 mt-lg-0">
                  <div class="py-2 border border-primary  rounded-4">
                    <h3 class="fs-5 fs-lg-3 text-center fw-light">
                      {Ngo.data.address.state}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-6 col-lg-4 d-flex flex-column align-items-center justify-content-center">
              <img
                src={`data:image/jpeg;base64,${logo}`}
                class="img-fluid border rounded-4 shadow-lg mt-4"
                alt="logo"
                loading="lazy"
                style={{ height: "400px", width: "400px" }}
              />
            </div>
          </div>

          <div class="row my-4 ">
            <div class="col-12 px-0">
              <h1 class="my-2 fw-normal text-center rounded-4 pwclr text-white py-3">
                Previous Work
              </h1>
            </div>
          </div>

          <div class="row ">
            <div class="col-12 col-lg-8">
              <div class="row py-4 px-4 my-5 rounded-4 pdclr">
                {loading1 === true ? (
                  <>
                    {" "}
                    <Box
                      sx={{
                        height: "80%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <HashLoader size="50px" loading={true} color="#36d7b7" />
                    </Box>
                  </>
                ) : (
                  <>
                    {gallery.map((ga) => (
                      <div class="col-3 mb-4 mx-auto">
                        <Box>
                          <img
                            src={`data:image/jpeg;base64,${ga}`}
                            class="img-fluid border rounded-4 shadow-lg "
                            alt="gallery"
                            loading="lazy"
                          />
                        </Box>
                      </div>
                    ))}
                    <div class="d-flex justify-content-center ">
                      <button
                        type="button"
                        class="btn btn-primary btn-lg btn-clr rounded-4 px-5"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Show gallery
                      </button>
                    </div>
                    <div
                      class="modal"
                      id="exampleModal"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                      tabindex="-1"
                    >
                      <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Gallery</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div id="carouselExample" class="carousel slide">
                              <div class="carousel-inner">
                                <div class="carousel-item active">
                                  {/* <div class="col-3 mb-4 mx-auto"> */}
                                  <img
                                    src={`data:image/jpeg;base64,${gallery[0]}`}
                                    class="d-block w-100"
                                    alt="gallery"
                                    loading="lazy"
                                    style={{ height: "700px", width: "600px" }}
                                  />
                                  {/* </div> */}
                                </div>
                                {gallery.map((ga) => (
                                  <div class="carousel-item">
                                    {/* <div class="col-3 mb-4 mx-auto"> */}
                                    <img
                                      src={`data:image/jpeg;base64,${ga}`}
                                      class="d-block w-100"
                                      alt="gallery"
                                      loading="lazy"
                                      style={{
                                        height: "700px",
                                        width: "600px",
                                      }}
                                    />
                                    {/* </div> */}
                                  </div>
                                ))}
                                <button
                                  class="carousel-control-prev"
                                  type="button"
                                  data-bs-target="#carouselExample"
                                  data-bs-slide="prev"
                                >
                                  <span
                                    class="carousel-control-prev-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span class="visually-hidden">Previous</span>
                                </button>
                                <button
                                  class="carousel-control-next"
                                  type="button"
                                  data-bs-target="#carouselExample"
                                  data-bs-slide="next"
                                >
                                  <span
                                    class="carousel-control-next-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span class="visually-hidden">Next</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="pb-3 d-flex justify-content-center">
                <button
                  onClick={() => {
                    navigate("/donor_details", {
                      state: {
                        type: "ngo",
                        alias: alias,
                      },
                    });
                  }}
                  type="button"
                  class="btn btn-primary px-5 btn-lg btn-clr rounded-4"
                >
                  Donate
                </button>
              </div>
            </div>

            <div class="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center px-4">
              <div class="py-2 border border-primary rounded-4 hw-adj d-flex justify-content-center align-items-center py-5 max-content">
                <p class="text-center fw-light px-2 ">{Ngo.data.description}</p>
              </div>
              <h5 class="py-3 mb-0">Donation Live Count</h5>
              <div class="p-2  text-center rounded-5 dbclr px-5">
                <p class="fs-1 mb-0">
                  <Number n={1202121} />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NgoProfile;
