import { useState } from "react";
import React from "react";
import Axios from "axios";
import "../Styles/createcampaign_res.css";
import { useNavigate } from "react-router";

Axios.defaults.withCredentials = true;

function CreateCampaign() {
  const navigate = useNavigate();
  const [Campaign, setcampaign] = useState({
    title: "",
    vision: "",
    description: "",
    cover: null,
  });

  function handlechange(event) {
    let { name, value, files } = event.target;
    if (name === "cover") {
      setcampaign((prev) => {
        const file = files[0];
        return { ...prev, [name]: file };
      });
    } else {
      setcampaign((prev) => {
        return { ...prev, [name]: value };
      });
    }
  }

  // function handelCoverImg(event) {
  //   setCoverImage(event.target.files[0]);
  // }
  const type = sessionStorage.getItem("userType");
  const [error, setErrors] = useState({});

  async function handleCampaign(e) {
    e.preventDefault();
    const validerror = {};

    if (!Campaign.title.trim()) {
      validerror.title = "Title is Required.";
    }
    if (!Campaign.vision.trim()) {
      validerror.vision = "Vision is Required.";
    }

    setErrors(validerror);

    if (Object.keys(error).length === 0) {
      await Axios.post(
        `${process.env.REACT_APP_API}/${type.toLowerCase()}/addCampaign`,
        Campaign,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      )
        .then((response) => {
          const data = response.data;
          if (data.success) {
            if (type === "NGO") {
              navigate("/Ngoprofile");
            } else {
              navigate("/organizer_dashboard");
            }
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      
    }
  }

  return (
    <div class="container" style={{ height: "max-content", maxWidth: "100%" }}>
      <div class="py-4">
        <h3 class=" py-3 mb-0 fw-bold"> Title </h3>
        <input
          error={!error.title}
          name="title"
          onChange={handlechange}
          type="text"
          class="form-control tinput44 rounded-3"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Add Title"
        />
        {error.title && <div className="error-message">{error.title}</div>}
      </div>

      <div class="row ">
        <div class="col-8">
          <div class="container py-5 px-0">
            <h3 class="fw-bold">Upload Image</h3>

            <div class="mb-3">
              <label for="image" class="form-label">
                Choose an image:
              </label>
              <input
                onChange={handlechange}
                type="file"
                class="form-control"
                id="image"
                name="cover"
                accept="image/*"
                required
              />
            </div>
            {/* <button onClick={(e)=>{uploadCoverImg(e)}}type="submit" class="btn btn-primary">
                Upload
              </button> */}
          </div>
        </div>
        <div class="col-4 d-flex flex-column justify-content-center align-items-center ">
          <h3 class=" py-3 mb-0 fw-bold"> Description </h3>
          <textarea
            onChange={handlechange}
            name="description"
            class="form-control hinput44 rounded-4 "
            placeholder="Add Description"
            id="floatingTextarea2"
          ></textarea>
        </div>
      </div>

      <div class="row ">
        <div class="col-8 ">
          <h3 class=" py-3 mb-0 fw-bold"> Vision </h3>
          <textarea
            name="vision"
            onChange={handlechange}
            class="form-control border border-dark rounded-4"
            placeholder="Add Vision"
            id="floatingTextarea2"
          ></textarea>
          {error.vision && <div className="error-message">{error.vision}</div>}
          <button
            onClick={(event) => {
              handleCampaign(event);
            }}
            type="button"
            class="btn btn-primary px-5 btn-lg rounded-4 mt-3"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCampaign;
