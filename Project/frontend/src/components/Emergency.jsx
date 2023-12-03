import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import HashLoader from "react-spinners/HashLoader";
import "../Styles/Emergency_res.css";
import HelpSeekerCard from "./HelpSeekerCard";
import Axios from "axios";
function Emergency() {
  const [helpseekers, setHelpSeekers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get("http://localhost:5000/fundraiser/");
      console.log(res.data.fundRaisers);
      setHelpSeekers(res.data.fundRaisers);
      setLoading(false);
    };
    getabs();
  }, []);
  return (
    <div class="container-fluid m-0 mt-5">
      <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-5 text-center font">
        Emergency Help Seekers
      </h1>
      <div class="container-fluid mt-4">
        <div class="row ">
          <div class="col-xl-8 col-md-7 p-0 clr rounded-4 mx-md-auto">
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
              <div class="overflow-auto h75">
                <div class="container-fluid ">
                  {helpseekers.map((fundraiser) => (
                    <HelpSeekerCard
                      key={fundraiser.id}
                      name={fundraiser.name}
                      title={fundraiser.title}
                      issue={fundraiser.issue}
                      alias={fundraiser.alias}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div class="col-xl-3 col-md-4 d-flex align-items-center my-5 rounded-4 clr mx-md-auto">
            <div class="row d-flex justify-content-center vh-95 py-5">
              <h1 class="text-center"> Need Help?</h1>
              <div class="col-md-12 col-11 d-flex justify-content-center">
                <button class="btn btn-primary btn-clr btn-sm  d-block d-md-none px-2 my-3 px-4 fs-3 rounded-4">
                  Create Fundraiser{" "}
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/fundraiser/Registration")
                  }
                  class="btn btn-primary btn-clr text-white btn-lg  d-none d-md-block px-4 my-3 fs-3 rounded-4"
                >
                  Create Fundraiser{" "}
                </button>
              </div>
              <div class="col-11  p-3  rounded-4 d-flex align-items-center post">
                <p class="text-center ">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emergency;
