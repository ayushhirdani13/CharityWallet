import React, { useState } from "react";
import "../Styles/edit_profile_ngo_res.css";
import Axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
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

function Edit_profile_ngo() {
  const [editNgo, setEditNgo] = useState({
    contactNo: "",
    vision: "",
    description: "",
    logo: null,
    gallery: [],
  });
  const [open, setOpen] = React.useState(false);
const [error1, setErrors1] = useState({});


const handleClose = () => {
  setOpen(false);
  window.location.href="/edit_profile_ngo"
  window.location.reload();
};
  function handleEditngo(event) {
    const { name, value, files } = event.target;
    if (name === "logo") {
      setEditNgo((prev) => {
        const file = files[0];
        return { ...prev, [name]: file };
      });
    } else if (name === "gallery") {
      setEditNgo((prev) => {
        const imgs = files;
        return { ...prev, [name]: imgs };
      });
    } else {
      setEditNgo((prev) => {
        return { ...prev, [name]: value };
      });
    }
  }
  

  function handlesubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // Assuming 'editNgo' contains the data to be updated, including files
    for (const key in editNgo) {
      if (editNgo.hasOwnProperty(key)) {
        if (key === "gallery") {
          const files = editNgo[key];
          for (let i = 0; i < files.length; i++) {
            formData.append("gallery", files[i]);
          }
        } else if (key === "logo" && editNgo[key]) {
          formData.append("logo", editNgo[key]);
        } else {
          formData.append(key, editNgo[key]);
        }
      }
    }
    Axios.patch(`${process.env.REACT_APP_API}/ngo/myNgo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
           window.location.href = "/Ngoprofile"
            
        }
        else
        {
          setErrors1(response.data.message);
          setOpen(true);
        }
      }
      )
      .catch((error) => {
        console.error("There was an error!", error.message);
      });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-8 px-0">
          <div className="py-2 my-5 rounded-4">
            <input
              name="contactNo"
              onChange={handleEditngo}
              type="text"
              className="form-control border border-dark text-center"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="New Contact Number"
            />
          </div>

          <div className="py-2 my-5 rounded-4">
            <input
              name="vision"
              onChange={handleEditngo}
              type="text"
              className="form-control border border-dark text-center"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Vision"
            />
          </div>
        </div>
        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
          <div>
            <h1>Add Your Logo</h1>
          </div>
          {/* <form action="upload.php" method="POST" enctype="multipart/form-data"> */}
          <div className="mb-3">
            <input
              onChange={handleEditngo}
              type="file"
              className="form-control border border-dark"
              id="image"
              name="logo"
              accept="image/*"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            {/* <button
                type="submit"
                className="btn btn-primary pwclr mx-2 mx-sm-4"
                onClick={(e) => {
                  handlelogo(e);
                }}
              >
                Delete
              </button> */}
          </div>
          {/* </form> */}
        </div>

        <div className="row my-4 ">
          <div className="col-12 px-0">
            <h1 className="my-2 fw-normal text-center rounded-4 pwclr text-white py-3">
              Previous Work
            </h1>
          </div>
        </div>

        <div className="row ">
          <div className="col-12 col-lg-8">
            <div className="row py-4 px-4 my-5 rounded-4 pdclr">
              <div>
                <h1 className="text-center">Add To Your Gallery</h1>
              </div>
              {/* <form
                action="upload.php"
                method="POST"
                enctype="multipart/form-data"
              > */}
              <div className="mb-3">
                <input
                  multiple
                  onChange={handleEditngo}
                  type="file"
                  className="form-control border border-dark"
                  id="image"
                  name="gallery"
                  accept="image/*"
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                {/* <button
                    type="submit"
                    className="btn btn-primary pwclr mx-2 mx-sm-4"
                    onClick={(e) => {
                      handleGallery(e);
                    }}
                  >
                    Delete
                  </button> */}
              </div>
              {/* </form> */}
            </div>
          </div>

          <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center px-4">
            <div className=" rounded-4 hw-adj2 d-flex justify-content-center align-items-center  max-content">
              <textarea
                name="description"
                onChange={handleEditngo}
                className="form-control hxp100 border border-dark text-center"
                placeholder="Description"
                id="floatingTextarea2"
              ></textarea>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex mb-3">
            <button
              type="button"
              className="btn btn-primary btn-clr btn-lg px-5 me-md-2"
              onClick={(e) => handlesubmit(e)}
            >
              Save
            </button>
          </div>
        </div>
        <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              maxWidth={"xl"}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
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
  );
}

export default Edit_profile_ngo;
