import { useState } from "react";
import { useParams } from "react-router";
import React from "react";
import axios from "axios";
import "../Styles/createcampaign_res.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
axios.defaults.withCredentials = true;
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function EditCampaign() {
  const { alias } = useParams();

  const [editCampaign, setcampaign] = useState({
    title: "",
    vision: "",
    description: "",
    cover: null,
  });
  const [open, setOpen] = React.useState(false);
  const [error1, setErrors1] = useState({});

  const handleClose = () => {
    setOpen(false);
    window.location.href = `/edit_Campaign/${alias}`;
    window.location.reload();
  };
  // const [cover, setCoverImage] = useState(null);

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

  function handlesubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    for (const key in editCampaign) {
      if (editCampaign.hasOwnProperty(key)) {
        if (key === "cover") {
          formData.append("cover", editCampaign[key]);
        } else {
          formData.append(key, editCampaign[key]);
        }
      }
    }
    
  
    axios
      .patch(
        `${
          process.env.REACT_APP_API
        }/${type.toLowerCase()}/updateCampaign?campaignAlias=${alias}`,
        editCampaign,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const type = sessionStorage.getItem("userType");
      
        if (response.data.success) {
          type === "NGO"
            ? (window.location.href = "/Ngoprofile")
            : type === "Fundraiser"
            ? (window.location.href = "/frprofile")
            : (window.location.href = "/organizer_dashboard");
        }
        else
        {
          setErrors1(response.data.message);
          setOpen(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

 

  return (
    <div class="container pb-5" style={{ height: "max-content" }}>
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
              handlesubmit(event);
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
          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            maxWidth={"xl"}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              Error
            </DialogTitle>
            <DialogContent>
              <DialogContentText>{error1}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Re Enter</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default EditCampaign;
