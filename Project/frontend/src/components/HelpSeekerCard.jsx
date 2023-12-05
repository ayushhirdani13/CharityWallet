import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Medical from "../image/medical.jpg";
function HelpSeekerCard(props) {
  let navigate = useNavigate();
  const donationData = useState({
    type: "fundraiser",
    alias: props.alias,
    name: props.title,
  });
  return (
    <>
      <div class="row justify-content-center">
        <div class="col-11 px-4">
          <div class=" row flex-lg-row align-items-center g-5 py-2 px-4 my-3 post_11 rounded-4">
            <div class="col-12 col-xxl-6 p-0 mt-0">
              <img
                src={Medical}
                class="d-block mx-lg-auto img-fluid rounded-4"
                alt="Bootstrap Themes"
                width="500px"
                height="500px"
                loading="lazy"
              />
            </div>
            <div class="col-12 col-xxl-6 mt-0 ">
              <h1 class="lh-1 my-3 rounded-4 text-center text-white bg-dark py-2 font fs-1">
                {props.title}
              </h1>
              <div class="bgd-clr p-3 rounded-4">
                <p class="text-center">{props.issue}</p>
                <div className="pb-3 d-flex justify-content-center">
                  <div>
                    <button
                      onClick={() => {
                        navigate("/donor_details", { state: donationData });
                      }}
                      type="button"
                      class="btn btn-primary px-5 mx-1 btn-lg btn-clr rounded-4"
                    >
                      Donate
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        window.location.href = `/Fundraiser_dashboard/${props.alias}`;
                      }}
                      type="button"
                      class="btn btn-primary px-5 mx-1 btn-lg btn-clr rounded-4"
                    >
                      Dashboard
                    </button>
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
export default HelpSeekerCard;
