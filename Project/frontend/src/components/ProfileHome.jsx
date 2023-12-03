import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import "../Styles/profile_home_res.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}
function Profile_home() {
  const naviGate = useNavigate();
  function handleSignout() {
    sessionStorage.setItem("loggedIn", false);

    naviGate("/");
    window.location.reload();
  }
  const [ngo, SetNgo] = useState({});
  const [campaign, setCampaign] = useState({});
  const [fundraiser, setFundraiser] = useState({});
  const [ngoLogo, setNgoLogo] = useState({});
  const [campaignCover, setCampaignCover] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/misc/current`)
      .then((res) => {
        SetNgo(res.data.ngo);
        setCampaign(res.data.campaign);
        setFundraiser(res.data.fundraiser);
      })

      .catch((err) => {});
  }, []);
  useEffect(() => {
    if (ngo.logo) {
      axios
        .get(`${process.env.REACT_APP_API}/ngo/logo?ngoAlias=${ngo.alias}`)
        .then((res1) => {
          setNgoLogo(res1.data.logo);
        })
        .catch((err) => {});
    }

    if (campaign.cover) {
      axios
        .get(
          `${process.env.REACT_APP_API}/campaign/cover?campaignAlias=${campaign.alias}`
        )
        .then((res1) => {
          setCampaignCover(res1.data.cover);
        })
        .catch((err) => {});
    }
  }, [ngo, campaign]);
  return (
    <div
      className="container-fluid bg_color_123"
      style={{ borderTopLeftRadius: "50px", borderTopRightRadius: "50px" }}
    >
      <div className="d-grid gap-2 py-10 d-md-flex justify-content-md-end">
        {sessionStorage.getItem("loggedIn") === true ? (
          <button
            type="button"
            onClick={handleSignout}
            className="btn btn-primary btn-clr text-white mt-4 mx-4 btn-lg text-end"
          >
            SignOut
          </button>
        ) : (
          <Link to="/signin">
            <button
              type="button"
              className="btn btn-primary btn-clr text-white mt-4 mx-4 btn-lg text-end"
            >
              Sign In
            </button>
          </Link>
        )}
      </div>

      <div className="row">
        <div className="col-6 py-5 my-auto">
          <h1 className="text-center mb-3 raleway fs-1 fw-bold">
            STREAMLINE YOUR
          </h1>
          <h1 className="text-center mb-3 raleway fs-1 fw-bold">DONATION,</h1>
          <h1 className="text-center mb-3 transform fs-larger">TRANSFORM</h1>
          <h1 className="text-center mb-3 transform fs-larger">LIVES.</h1>
        </div>

        <div className="col-6 py-5 px-lg-5">
          <div
            id="carouselExampleIndicators"
            className="carousel slide mx-lg-5"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={`data:image/jpeg;base64,${ngoLogo}`}
                  className="img-fluid border rounded-4 shadow-lg "
                  alt="NGO"
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={`data:image/jpeg;base64,${campaignCover}`}
                  className="img-fluid border rounded-4 shadow-lg "
                  alt="Campaign"
                  loading="lazy"
                />
              </div>
              {/* <div className="carousel-item">
                            <img src="https://picsum.photos/1600/900" className="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/>
                        </div> */}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
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

      <hr className="border border-dark mt-5" />

      <div className="row pt-3 pb-5">
        <div className="col-8 py-lg-5 px-lg-5 px-3">
          <div className="row justify-content-center">
            <div className="col-11 px-2">
              <div className=" row flex-lg-row align-items-center g-5 py-3 px-lg-5 px-3 mx-lg-5 my-3 post_123 rounded-4">
                <div className="col-12 col-xxl-6 p-0 mt-0">
                  <img
                    src="https://picsum.photos/1600/1500"
                    className="d-block mx-lg-auto img-fluid rounded-4"
                    alt="Bootstrap Themes"
                    width="700"
                    height="500"
                    loading="lazy"
                  />
                </div>
                <div className="col-12 col-xxl-6 mt-0 ">
                  <h1 className="lh-1 my-3 rounded-4 text-center text-white bg-dark py-2 font fs-1">
                    {fundraiser !== null ? fundraiser.title : `Sample Title`}
                  </h1>
                  <div className="bgd-clr p-3 rounded-4">
                    <p className="text-center">
                      {fundraiser !== null
                        ? fundraiser.description
                        : `Sample Fundraiser Description`}
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-clr btn-lg px-5 me-md-2"
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4 p-1 d-flex">
          <div className="p-0 m-0 border border-dark vr"></div>
          <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <h1 className="text-center px-xl-5 ">
              No of Donation we Facilitated
            </h1>
            <h1 className="text-center raleway100 mb-5">
              <Number n={56470} />
            </h1>
            <h1 className="text-center px-xl-5 ">
              No of Donation we Facilitated
            </h1>
            <h1 className="text-center raleway100  mb-5">
              <Number n={56470} />
            </h1>
            <h1 className="text-center px-xl-5  ">
              No of Donation we Facilitated
            </h1>
            <h1 className="text-center raleway100  mb-5">
              <Number n={56470} />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile_home;
