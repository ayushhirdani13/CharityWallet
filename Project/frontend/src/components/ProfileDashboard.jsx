import React from "react";
import { useSpring, animated } from "react-spring";
import "../Styles/profile_d_res.css";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
// import { use } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/profile_d_res.css";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HashLoader from "react-spinners/HashLoader";
import { Box } from "@mui/material";
import CampaignCard from "./CampaignCardEditable";
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
function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

function Profile_Dashboard() {
  const { alias } = useParams();
  const [loading, setloading] = useState(true);
  const [gallery, setGallery] = useState({});
  const [logo, setLogo] = useState({});
  const [Campaign, setCampaign] = useState({});
  const [loading1, setloading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [error1, setErrors1] = useState({});
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userType");
    navigate("/home");
    window.location.reload();
  };
  const [Ngo, setNgo] = useState({});
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get("http://localhost:5000/ngo/myNgo", {
        withCredentials: true,
      }).catch((err) => {
        console.log(err.response.data);
        setErrors1(err.response.data.message);
        setOpen(true);
      });

      setNgo(res.data.ngo);

      setloading(false);
      const res1 = await Axios.get(
        `http://localhost:5000/ngo/campaigns?ngoAlias=${res.data.ngo.alias}`
      );

      setCampaign(res1.data.campaigns);

      setLoading2(false);

      const res2 = await Axios.get(
        `http://localhost:5000/ngo/gallery?ngoAlias=${res.data.ngo.alias}`
      );
      // const res1=await Axios.get('http://localhost:5000/ngo/logo?ngoAlias=sample_ngo')
      //   console.log(res);
      setGallery(res2.data.gallery);

      const res3 = await Axios.get(
        `http://localhost:5000/ngo/logo?ngoAlias=${res.data.ngo.alias}`
      );
      setLogo(res3.data.logo);
      setloading1(false);
    };

    // setCampaign(res1.data.campaigns);

    getabs();
  }, []);

  function handelchange() {
    window.location.href = "/Createcampaign";
  }
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
          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            maxWidth={"xl"}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
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
      ) : (
        <div
          className="container"
          style={{ height: "max-content", maxWidth: "100%" }}
        >
          <Box>
            {Ngo.verified === true ? (
              <Box sx={{ display: "flex" }}>
                <VerifiedUserIcon fontSize="large" color="success" />
                <span style={{ fontSize: "25px" }}>Is verified</span>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <VerifiedUserIcon fontSize="large" sx={{ color: "red" }} />
                <span style={{ fontSize: "25px" }}>Is not Verified</span>
              </Box>
            )}
          </Box>
          <div className="row">
            <div className="col-8 px-0">
              <div className="py-2 border border-primary my-5 rounded-4">
                <h1
                  style={{
                    fontSize: "100px",
                    margin: "0px",
                    fontWeight: "600",
                  }}
                  className="text-center "
                >
                  {Ngo.name}
                </h1>
              </div>

              <div className="py-2 border border-primary my-5 rounded-4">
                <h3
                  style={{ fontSize: "40px", margin: "0px", fontWeight: "300" }}
                  className="  text-center "
                >
                  {Ngo.vision}
                </h3>
              </div>

              <div className="row mt-5">
                <div className="col-12 col-lg-8">
                  <div className="py-2 border border-primary  rounded-4">
                    <h3
                      style={{
                        fontSize: "30px",
                        margin: "0px",
                        fontWeight: "600",
                      }}
                      className="  text-center "
                    >
                      {Ngo.address.city}, {Ngo.address.pincode}
                    </h3>
                  </div>
                </div>
                <div className="col-12 col-lg-4 mt-5 mt-lg-0">
                  <div className="py-2 border border-primary  rounded-4">
                    <h3
                      style={{
                        fontSize: "30px",
                        margin: "0px",
                        fontWeight: "600",
                      }}
                      className="text-center "
                    >
                      {Ngo.address.state}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4 d-flex align-items-center justify-content-center">
              <img
                src={`data:image/jpeg;base64,${logo}`}
                className="img-fluid border rounded-4 shadow-lg"
                alt="Example image"
                loading="lazy"
                style={{ height: "400px", width: "400px" }}
              />
            </div>
          </div>

          <div className="row my-4 ">
            <div className="col-12 px-0">
              <h1 className="my-2 fw-normal text-center text-white rounded-4 pwclr text-black py-3">
                Previous Work
              </h1>
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-lg-8">
              <div className="row pt-4 px-4 my-5 rounded-4 pdclr">
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
                      <div className="col-3 mb-4 mx-auto">
                        <Box>
                          <img
                            src={`data:image/jpeg;base64,${ga}`}
                            className="img-fluid border rounded-4 shadow-lg "
                            alt="Example image"
                            loading="lazy"
                            style={{ height: "200px", width: "200px" }}
                          />
                        </Box>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-primary btn-clr btn-lg px-5 "
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{
                        height: "50px",
                        width: "300px",
                        marginBottom: "50px",
                      }}
                    >
                      Show gallery
                    </button>

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
                                    alt="Example image"
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
                                      alt="Example image"
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
                                  <span
                                    className="visually-hidden
                                  "
                                  >
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
            </div>

            <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center px-4 mb-5">
              <div
                tyle={{ width: "100%", height: "100%" }}
                className=" border border-primary rounded-4 hw-adj d-flex justify-content-center align-items-center  max-content"
              >
                <p
                  style={{
                    fontSize: "30px",
                    margin: "0px",
                    fontWeight: "600",
                  }}
                  className="  text-center "
                >
                  {Ngo.description}
                </p>
              </div>
              <h5 className="py-3 mb-0">Donation Live Count</h5>
              <div className="p-2  text-center rounded-5 dbclr px-5">
                <p className="fs-1 mb-0">
                  <Number n={1202121} />
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Link to="/Createcampaign">
              <button
                type="button"
                className="btn btn-primary btn-clr btn-lg px-5 me-md-2"
                onClick={() => (window.location.href = "/Createcampaign")}
              >
                Create Campaign
              </button>
            </Link>

            <Link to="/edit_profile_ngo">
              <button
                type="button"
                className="btn btn-primary btn-clr btn-lg px-5 me-md-2"
                onClick={() => (window.location.href = "/edit_profile_ngo")}
              >
                Edit Profile
              </button>
            </Link>
          </div>

          <div className="col-12 p-0 clr rounded-4 mx-md-auto">
            <div className="overflow-auto h75">
              <div className="container-fluid ">
                {loading2 === true ? (
                  <>
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
                  Campaign.map((campaigns) => (
                    <CampaignCard
                      key={campaigns.id}
                      title={campaigns.title}
                      vision={campaigns.vision}
                      alias={campaigns.alias}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile_Dashboard;
