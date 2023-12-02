import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Styles/aftercreatecampaign_res.css";
import HashLoader from "react-spinners/HashLoader";
function Aftercreatecampaign() {
  const { alias } = useParams();
  const [loading, setloading] = useState(true);
  console.log(alias);

  const [Campaign, setCampaign] = useState({});
  const [donationData,setdonationData]=useState({
    type:"campaign",
    alias:alias,
  })
  let navigate=useNavigate();
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(
        `/campaign/dashboard?campaignAlias=${alias}`
      );

      console.log(res);
      setCampaign(res);

      setloading(false);
    };
    getabs();
  }, []);

  const Campaigndetails = Campaign.data;

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
          <div class="py-2 border border-primary my-2 rounded-4">
            <h1 class="text-center fw-bold ">{Campaigndetails.title}</h1>
          </div>

          <div></div>
          <div class="row py-4">
            <div class="col-8">
              <img
                src={`http://localhost:5000/campaign/${alias}`}
                class="img-fluid border rounded-3 shadow-lg "
                alt="Example image"
                loading="lazy"
              />
            </div>

            <div class="col-4 d-flex flex-column justify-content-center align-items-center ">
              <div class="py-2 px-4 d-flex align-items-center  border border-primary my-2 rounded-4 dinput22">
                <p class="text-center">
                  {Campaigndetails.description}
                </p>
              </div>
            </div>
          </div>

          <div class="row ">
            <div class="col-8 ">
              <h3 class="px-2 py-1 mb-0 fw-bold"> Vision </h3>
            </div>
            <div class="col-4 ">
              <div class="container">
                <h1 class="fs-5 text-center mb-0 p-3">
                  No. of people Benefited Till now
                </h1>
              </div>
            </div>
          </div>

          <div class="row pb-4">
            <div class="col-8">
              <div class="py-2 px-4 d-flex align-items-center  border border-primary my-2 rounded-4 vinput22">
                <p class="text-center">
                  {Campaigndetails.vision}
                </p>
              </div>
            </div>
            <div class="col-4 d-flex justify-content-center align-items-center">
              <div class="p-2 hinput text-center rounded-5 color22">
                <p class="fs-1 mb-3">--NIL--</p>
              </div>
            </div>
          </div>
          <div>
          <div className="pb-3 d-flex justify-content-center">
              <button
                onClick={() => {
                  navigate("/donor_details", { state:donationData });
                }}
                type="button"
                class="btn btn-primary px-5 btn-lg btn-clr rounded-4"
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

export default Aftercreatecampaign;
