import React from "react";
import { useSpring, animated } from "react-spring";
import "../Styles/profile_d_res.css";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
// import { use } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../Styles/profile_d_res.css";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HashLoader from "react-spinners/HashLoader";
import { Box } from "@mui/material";
import CampaignCard from "./CampaingnCard";
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
  const [Campaign, setCampaign] = useState({});
  const [loading1, setloading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [Ngo, setNgo] = useState({});
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get("http://localhost:5000/ngo/myNgo", {
        withCredentials: true,
      });
     
      // console.log(res);

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
        </Box>
      ) : (
        <div
          class="container"
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
          <div class="row">
            <div class="col-8 px-0">
              <div class="py-2 border border-primary my-5 rounded-4">
                <h1 class="fs-5 fs-lg-1 text-center fw-light">{Ngo.name}</h1>
              </div>

              <div class="py-2 border border-primary my-5 rounded-4">
                <h3 class="fs-5 fs-lg-3  text-center fw-light">{Ngo.vision}</h3>
              </div>

              <div class="row mt-5">
                <div class="col-12 col-lg-8">
                  <div class="py-2 border border-primary  rounded-4">
                    <h3 class="fs-5 fs-lg-3  text-center fw-light">
                      {Ngo.address.city},{Ngo.address.pincode}
                    </h3>
                  </div>
                </div>
                <div class="col-12 col-lg-4 mt-5 mt-lg-0">
                  <div class="py-2 border border-primary  rounded-4">
                    <h3 class="fs-5 fs-lg-3 text-center fw-light">
                      {Ngo.address.state}r
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-4 d-flex align-items-center justify-content-center">
              <img
                src={`http://localhost:5000/ngo/logo?ngoAlias=${alias}`}
                class="img-fluid border rounded-4 shadow-lg mt-5"
                alt="Example image"
                loading="lazy"
              />
            </div>
          </div>

          <div class="row my-4 ">
            <div class="col-12 px-0">
              <h1 class="my-2 fw-normal text-center rounded-4 pwclr text-black py-3">
                Previous Work
              </h1>
            </div>
          </div>

          <div class="row ">
            <div class="col-12 col-lg-8">
              <div class="row pt-4 px-4 my-5 rounded-4 pdclr">
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
                  gallery.map((ga) => (
                    <div class="col-3 mb-4 mx-auto">
                      <img
                        src={`data:image/jpeg;base64,${ga}`}
                        class="img-fluid border rounded-4 shadow-lg "
                        alt="Example image"
                        loading="lazy"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div class="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center px-4">
              <div class="py-2 border border-primary rounded-4 hw-adj d-flex justify-content-center align-items-center py-5 max-content">
                <p class="text-center fw-light px-2 ">{Ngo.description}</p>
              </div>
              <h5 class="py-3 mb-0">Donation Live Count</h5>
              <div class="p-2  text-center rounded-5 dbclr px-5">
                <p class="fs-1 mb-0">
                  <Number n={1202121} />
                </p>
              </div>
            </div>
          </div>
          <div class="d-grid gap-2 d-md-flex mb-3">
            <Link to="/Createcampaign">
              <button
                type="button"
                class="btn btn-primary btn-clr btn-lg px-5 me-md-2"
                onClick={() => (window.location.href = "/Createcampaign")}
              >
                Create Campaign
              </button>
            </Link>

            <Link to="/edit_profile_ngo">
              <button
                type="button"
                class="btn btn-primary btn-clr btn-lg px-5 me-md-2"
                onClick={() => (window.location.href = "/edit_profile_org")}
              >
                Edit Profile
              </button>
            </Link>
          </div>

          <div class="col-xl-12 col-md-7 p-0 clr rounded-4 mx-md-auto">
            <div class="overflow-auto h75">
              <div class="container-fluid ">
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
                    <CampaignCard key={campaigns.id}
                       title={campaigns.title}
                       vision={campaigns.vision} />
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
