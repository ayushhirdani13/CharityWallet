import React from "react";
import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";
import axios from "axios";
// import { use } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import NgoLogo from "../image/ngo.jpg";
import "../Styles/profile_d_res.css";
import Ngoimag from "../image/ngo.jpg";
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
      const res = await axios.get(
        `${process.env.REACT_APP_API}/ngo/dashboard?ngoAlias=${alias}`
      );
      setNgo(res.data);
      setloading(false);
    };
    getabs();
  }, [alias]);

  const [gallery, setGallery] = useState([]);
  const [logo, setLogo] = useState(null);
  const [loading1, setloading1] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getGallery = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/ngo/gallery?ngoAlias=${alias}`
        );
        if (res.success) {
          setGallery(res.data.gallery);
        }
      } catch (err) {}
      setloading1(false);
    };
    getGallery();
  }, [alias]);
  useEffect(() => {
    const getLogo = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/ngo/logo?ngoAlias=${alias}`
        );
        if (res.success) {
          setLogo(res.data.logo);
        }
      } catch (err) {}
    };
    getLogo();
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
        <div className="container pb-5" style={{ height: "max-content" }}>
          <div className="row">
            <div className="col-6 col-lg-8 px-0">
              <div className="py-2 border border-primary my-5 rounded-4">
                <h1 className="fs-5 fs-lg-1 text-center fw-light" style={{color: 'black',
fontSize: '16',
fontFamily: 'Raleway',
fontWeight: '400'}}>
                  {Ngo.data.name}
                </h1>
              </div>

              <div className="py-2 border border-primary my-5 rounded-4">
                <h3 className="fs-5 fs-lg-3  text-center fw-light" style={{color: 'black',
fontSize: '16',
fontFamily: 'Merriweather',
fontWeight: '400'}}>
                  {Ngo.data.vision}
                </h3>
              </div>

              <div className="row mt-5">
                <div className="col-12 col-lg-8">
                  <div className="py-2 border border-primary  rounded-4">
                    <h3 className="fs-5 fs-lg-3  text-center fw-light"style={{color: 'black',
fontSize: '20',
fontFamily: 'Merriweather',
fontWeight: '500'}}>
                      {Ngo.data.address.city}, {Ngo.data.address.pincode}
                    </h3>
                  </div>
                </div>
                <div className="col-12 col-lg-4 mt-5 mt-lg-0">
                  <div className="py-2 border border-primary  rounded-4">
                    <h3 className="fs-5 fs-lg-3 text-center fw-light"style={{color: 'black',
fontSize: '16',
fontFamily: 'Merriweather',
fontWeight: '400'}}>
                      {Ngo.data.address.state}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-4 d-flex flex-column align-items-center justify-content-center">
              {logo ? (
                <img
                  src={`data:image/jpeg;base64,${logo}`}
                  className="img-fluid border rounded-4 shadow-lg mt-4"
                  alt="logo"
                  loading="lazy"
                  style={{ height: "400px", width: "400px" }}
                />
              ) : (
                <img
                  src={NgoLogo}
                  className="img-fluid border rounded-4 shadow-lg mt-4"
                  alt="logo"
                  loading="lazy"
                  style={{ height: "400px", width: "400px" }}
                />
              )}
            </div>
          </div>

          <div className="row my-4 ">
            <div className="col-12 px-0">
              <h1 className="my-2 fw-normal text-center rounded-4 pwclr text-white py-3">
                Previous Work
              </h1>
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-lg-8">
              <div className="row py-4 px-4 my-5 rounded-4 pdclr">
                {loading1 === true && gallery.length !== 0 ? (
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
                      <div className="col-3 mb-4 mx-auto">
                        <Box>
                          <img
                            src={`data:image/jpeg;base64,${ga}`}
                            className="img-fluid border rounded-4 shadow-lg "
                            alt="gallery"
                            loading="lazy"
                            style={{height:"100px", width:"200px"}}
                          />
                        </Box>
                      </div>
                    ))}
                    <div className="d-flex justify-content-center ">
                      {gallery.length ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg btn-clr rounded-4 px-5"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Show gallery
                        </button>
                      ) : (
                        <p>No Gallery for this NGO</p>
                      )}
                    </div>
                    <div
                      className="modal"
                      id="exampleModal"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                      tabIndex="-1"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Gallery</h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div
                              id="carouselExample"
                              className="carousel slide"
                            >
                              <div className="carousel-inner">
                                <div className="carousel-item active">
                                  {/* <div className="col-3 mb-4 mx-auto"> */}
                                  <img
                                    src={`data:image/jpeg;base64,${gallery[0]}`}
                                    className="d-block w-100"
                                    alt="gallery"
                                    loading="lazy"
                                    style={{ height: "700px", width: "600px" }}
                                  />
                                  {/* </div> */}
                                </div>
                                {gallery.map((ga) => (
                                  <div className="carousel-item">
                                    {/* <div className="col-3 mb-4 mx-auto"> */}
                                    <img
                                      src={`data:image/jpeg;base64,${ga}`}
                                      className="d-block w-100"
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
                                  className="carousel-control-prev"
                                  type="button"
                                  data-bs-target="#carouselExample"
                                  data-bs-slide="prev"
                                >
                                  <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span className="visually-hidden">
                                    Previous
                                  </span>
                                </button>
                                <button
                                  className="carousel-control-next"
                                  type="button"
                                  data-bs-target="#carouselExample"
                                  data-bs-slide="next"
                                >
                                  <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span className="visually-hidden">Next</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
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
                        name: Ngo.name,
                      },
                    });
                  }}
                  type="button"
                  className="btn btn-primary px-5 btn-lg btn-clr rounded-4"
                >
                  Donate
                </button>
              </div>
            </div>

            <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center px-4">
              <div className="py-2 border border-primary rounded-4 hw-adj d-flex justify-content-center align-items-center py-5 max-content">
                <p className="text-center fw-light px-2 ">
                  {Ngo.data.description}
                </p>
              </div>
              <h5 className="py-3 mb-0">Donation Live Count</h5>
              <div className="p-2  text-center rounded-5 dbclr px-5">
                <div className="fs-1 mb-0">
                  <Number n={Ngo.donationsTillNow} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NgoProfile;
