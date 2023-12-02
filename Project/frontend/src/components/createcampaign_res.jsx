import { useState } from "react";
import React from "react";
import Axios from "axios";
import "../Styles/createcampaign_res.css";

function Createcampaign() {
  const [Campaign, setcampaign] = useState({
    title: "",
    vision: "",
  });

  const [cover, setCoverImage] = useState(null);

  function handlechange(event) {
    const { name, value } = event.target;

    setcampaign((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handelCoverImg(event) {
    setCoverImage(event.target.files[0]);
  }

  async function handleCampaign(e) {
    e.preventDefault();

    try {
      const response = await fetch("ngo/myNgo/addCampaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Campaign),
      });

      console.log(response.message);
      if (!response.ok) {
        // Handle errors if the request is not successful
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response JSON

      console.log(data); // Log the response data
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadCoverImg(e) {
    e.preventDefault();
    try {
     let alias = Campaign.title.toLowerCase().replace(/ /g, "_");
      const formdata = new FormData();
      console.log(cover);
      console.log(alias);
      formdata.append('cover', cover);
      console.log(formdata);
      const response = await fetch(`ngo/myNgo/campaign/cover?campaignAlias=stop_child_labour`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formdata,
      });
      console.log(response);
      if (!response.ok) {
        // Handle errors if the request is not successful
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response JSON
     
    } catch (error) {
      console.error(error);
    }
  }

  console.log(Campaign);

  return (
    <div class="container">
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

      <div></div>
      <div class="row ">
        <div class="col-8">
          <div class="container py-5 px-0">
            <h3 class="fw-bold">Upload Image</h3>

              <div class="mb-3">
                <label for="image" class="form-label">
                  Choose an image:
                </label>
                <input
                  onChange={handelCoverImg}
                  type="file"
                  class="form-control"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                />
              </div>
              <button onClick={(e)=>{uploadCoverImg(e)}}type="submit" class="btn btn-primary">
                Upload
              </button>
            
          </div>
        </div>
        <div class="col-4 d-flex flex-column justify-content-center align-items-center ">
          <h3 class=" py-3 mb-0 fw-bold"> Description </h3>
          <textarea
            onChange={handlechange}
            class="form-control hinput44 rounded-4 "
            placeholder="Add Description"
            id="floatingTextarea2"
          ></textarea>
        </div>
      </div>

      <div class="row ">
        <div class="col-8 ">
          <h3 class=" py-3 mb-0 fw-bold"> Vision </h3>
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
          <textarea
            name="vision"
            onChange={handlechange}
            class="form-control vinput44 rounded-4"
            placeholder="Add Vision"
            id="floatingTextarea2"
          ></textarea>
        </div>
        <div class="col-4 d-flex justify-content-center align-items-center">
          <div class="p-2 hinput44 text-center rounded-5 color44">
            <p class="fs-1 mb-3"> 12,3478 </p>
          </div>
        </div>
        <div>
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

export default Createcampaign;
