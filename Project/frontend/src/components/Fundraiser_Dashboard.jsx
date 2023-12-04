import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Styles/aftercreatecampaign_res.css";
import HashLoader from "react-spinners/HashLoader";
import Medical from "../image/medical.jpg";
import axios from "axios";

function Fundraiser_dashboard() {
  const { alias } = useParams();
  const [loading, setloading] = useState(true);
  

  const [Fundraiser, setFundraiser] = useState({});

  let navigate = useNavigate();
  useEffect(() => {
    const getabs = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/fundraiser/dashboard?frAlias=${alias}`
      );

      setFundraiser(res.data);

      setloading(false);
    };
    getabs();
  }, [alias]);

  const Fundraiserdetails = Fundraiser.data;


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
        <div className="container">
          <div className="py-2 border border-primary my-2 rounded-4">
            <h1 className="text-center fw-bold ">{Fundraiserdetails.title}</h1>
          </div>

          <div></div>
          <div className="row py-4">
            <div className="col-8">
              <img
                src={Medical}
                className="img-fluid border rounded-3 shadow-lg "
                alt="medical"
                loading="lazy"
              />
            </div>

            <div className="col-4 d-flex flex-column justify-content-center align-items-center ">
              <h1 className="fs-5 text-center mb-0 p-3">Description</h1>
              <div className="py-2 px-4 d-flex align-items-center  border border-primary my-2 rounded-4 dinput22">
                <p className="text-center">{Fundraiserdetails.description}</p>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-8 ">
              <h3 className="px-2 py-1 mb-0 fw-bold"> Issue </h3>
            </div>
            <div className="col-4 ">
              <div className="container">
                <h1 className="fs-5 text-center mb-0 p-3">
                  Donations Till Now
                </h1>
               
              </div>
              
            </div>
          </div>

          <div className="row pb-4">
            <div className="col-8">
              <div className="py-2 px-4 d-flex align-items-center  border border-primary my-2 rounded-4 vinput22">
                <p className="text-center">{Fundraiserdetails.issue}</p>
              </div>
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <div className="p-2 hinput text-center rounded-5 color22">
                <p className="fs-1 mb-3">{Fundraiserdetails.donationTillNow}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="pb-3 d-flex justify-content-center">
              <button
                onClick={() => {
                  navigate("/donor_details", { state: {
                    type: "fundraiser",
                    alias: alias,
                  } });
                }}
                type="button"
                className="btn btn-primary px-5 btn-lg btn-clr rounded-4"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Fundraiser_dashboard;
