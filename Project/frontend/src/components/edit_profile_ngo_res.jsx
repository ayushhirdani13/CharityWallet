import React, { useState } from 'react';
import '../Styles/edit_profile_ngo_res.css';

function Edit_profile_ngo(){
    const [gallery, setgallery] = useState([]);
    const [logo,setlogo]=useState(null);
  function handlechange(event) {

    setgallery(event.target.files);
  }
  function handleChange(event) {

    setlogo(event.target.files[0]);
  }

  console.log(gallery);
  async function handleGallery(e) {
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

  async function handlelogo(e) {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append('logo',logo);
      console.log(formdata);
    
      const response = await fetch("/ngo/myNgo/uploadLogo", {
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
     if(data.sucss)
      console.log(data); // Log the response data
    } catch (error) {
      console.log(error);
    }
  }
    return(
        <div class="container">

        <div class="row">
            <div class="col-8 px-0">

                <div class="py-2 my-5 rounded-4">
                    <input type="text" class="form-control border border-dark text-center" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="NGO Name"/>
                </div>
                
                <div class="py-2 my-5 rounded-4">
                    <input type="text" class="form-control border border-dark text-center" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Vision"/>
                </div>
                
                <div class="row mt-5">
                    <div class="col-12 col-lg-8">
                        <div class="py-2 rounded-4">
                            <input type="text" class="form-control border border-dark text-center" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Address"/>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 mt-5 mt-lg-0" >
                        <div class="py-2 rounded-4">
                            <input type="text" class="form-control border border-dark text-center" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="City"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-4 d-flex align-items-center justify-content-center">
                
                <form action="upload.php" method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                        <input type="file" class="form-control" id="image" name="image" accept="image/*" required/>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary pwclr"
                        onClick={(e)=>{
                            handlelogo(e);}}>Upload</button>
                    </div>
                </form>
            </div>    
        </div>

        <div class="row my-4 ">
            <div class="col-12 px-0">
                  <h1 class="my-2 fw-normal text-center rounded-4 pwclr text-white py-3">Previous Work</h1> 
            </div>
        </div>

        <div class="row ">
            <div class="col-12 col-lg-8">
                <div class="row py-4 px-4 my-5 rounded-4 pdclr">
                    <form action="upload.php" method="POST" enctype="multipart/form-data">
                        <div class="mb-3">
                            <input type="file" class="form-control" id="image" name="image" accept="image/*" required/>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary pwclr" 
                            onClick={(e)=>{handleGallery(e);
                            }}>Upload</button>
                        </div>
                    </form>
                </div> 
            </div>

            <div class="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center px-4">
                <div class=" rounded-4 hw-adj2 d-flex justify-content-center align-items-center  max-content">
                    <textarea class="form-control hxp100 border border-dark text-center" placeholder="Description" id="floatingTextarea2"></textarea>
                </div>
                
            </div>
        </div>

       

        </div>
     
        );
    }
    
    export default Edit_profile_ngo ;