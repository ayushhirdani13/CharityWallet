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

  async function handleCampaign(e) {
    e.preventDefault();
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
          navigate("/Ngoprofile");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div class="container" style={{ height: "max-content", maxWidth: "100%" }}>
      <div class="py-4">
        <h3 class=" py-3 mb-0 fw-bold"> Title </h3>
        <input
          name="title"
          onChange={handlechange}
          type="text"
          class="form-control tinput44 rounded-3"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Add Title"
        />
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
        <div class="col-4 ">
          <div class="container p-2">
            <h1 class="fs-5 text-center mb-0 p-3">
              No. of people Benefited Till now
            </h1>
            <div class="p-2 border border-dark text-center rounded-5 color44">
              <p class="fs-1 mb-3"> 12,3478 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCampaign;
