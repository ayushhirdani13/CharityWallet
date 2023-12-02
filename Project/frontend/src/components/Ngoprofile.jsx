import React from "react";
import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";
import Axios from "axios";
// import { use } from "react-router-dom";
import { useParams } from "react-router-dom";
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

function Ngoprofile() {
  const { alias } = useParams();
  const [loading, setloading] = useState(true);

  const [Ngo, setNgo] = useState({});
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(
        `http://localhost:5000/ngo/dashboard?alias=${alias}`
      );
      setNgo(res.data);
      setloading(false);
    };
    getabs();
  }, []);

  const [gallery, setGallery] = useState({});
  const [loading1, setloading1] = useState(true);
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(
        `http://localhost:5000/ngo/gallery?ngoAlias=${alias}`
      );
      // const res1=await Axios.get('http://localhost:5000/ngo/logo?ngoAlias=sample_ngo')
      //   console.log(res);
      setGallery(res.data.gallery);
      //    setlogo(res1.data);
      setloading1(false);
    };
    getabs();
  }, []);
  //   console.log(gallery[0]);

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
        <div class="container">
          <div class="row">
            <div class="col-8 px-0">
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
                      {Ngo.data.address.city},{Ngo.data.address.pincode}
                    </h3>
                  </div>
                </div>
                <div class="col-12 col-lg-4 mt-5 mt-lg-0">
                  <div class="py-2 border border-primary  rounded-4">
                    <h3 class="fs-5 fs-lg-3 text-center fw-light">
                      {Ngo.data.address.state}r
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

export default Ngoprofile;
