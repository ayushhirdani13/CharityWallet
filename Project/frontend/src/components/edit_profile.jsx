import React, { useState } from "react";
import "../Styles/edit_profile.css";
import pic1 from "../image/logo1.png";
import img1 from "../image/upload_image.png";

export default function Edit_Profile() {
  const [gallery, setgallery] = useState([]);

  function handlechange(event) {
    const { name, value, files } = event.target;

    setgallery(event.target.files);
  }
  console.log(gallery);
  async function handlelogo(e) {
    e.preventDefault();

    try {
      const formdata = new FormData();
      // formdata.append('gallery',);
      // gallery.forEach((file, index) => {
      //   formdata.append(`gallery[${index}]`, file)

      // })
      
      for(let i=0;i<gallery.length;i++)
      {
       
        formdata.append('gallery',gallery[i]);
      }

     
      console.log(formdata);
    
      const response = await fetch("/ngo/myNgo/gallery", {
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

      console.log(data); // Log the response data
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <div className="container">
      <div className="row">
        <div className="col1 col">
          <div className="card-container1">
            <div className="card-body1">
              <input
                type="text"
                className="form-control1"
                placeholder="NGO Name"
              />
            </div>
            <div className="card-body2">
              <input
                type="text"
                className="form-control2"
                placeholder="Vision"
              />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="card-container3">
                  <div className="card-body3">
                    <input
                      type="text"
                      className="form-control3"
                      placeholder="Address"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card-container4">
                  <div className="card-body4">
                    <input
                      type="text"
                      className="form-control4"
                      placeholder="City"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="left">Previous Work</div>
            <div className="card-body8">
              <img src={img1} alt="" className="img1" />
              <input
                name="gallery"
                multiple
                onChange={handlechange}
                type="file"
                className="card-image1"
              />
              <img src={img1} alt="" className="img2" />
              <input type="file"
              onChange={handlechange} 
              className="card-image2" />
              <img src={img1} alt="" className="img3" />
              <input type="file" className="card-image3" />
              <img src={img1} alt="" className="img4" />
              <input type="file" className="card-image4" />
              <img src={img1} alt="" className="img5" />
              <input type="file" className="card-image5" />
              <img src={img1} alt="" className="img6" />
              <input type="file" className="card-image6" />
              <button
                type="submit"
                className="button2 btn-lg"
                onClick={(event) => {
                  console.log(event);
                  handlelogo(event);
                }}
              >
                Add Work Button
              </button>
            </div>
          </div>
        </div>
        <div className="col2 col-3">
          <img src={pic1} alt="" className="image1" />
          <div className="card-container2">
            <div className="card-body5">
              <input
                type="text"
                className="form-control5"
                placeholder="Bank Details"
              />
            </div>
            <div className="card-body6">
              {/* <input type="text-textareas2" className="form-control6" placeholder="Add more description of your work"/> */}
              <textarea
                className="form-control6"
                placeholder="Add more description of your work"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
