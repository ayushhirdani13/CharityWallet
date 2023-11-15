import React from 'react'
import "../Styles/createcampaign.css";
function Createcampaign(){
    return(
        <div class="container">

            <div class="py-4">
                <h3 class=" py-3 mb-0 fw-bold"> Title </h3>   
                <input type="text" class="form-control tinput44 rounded-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Add Title"/>
            </div>
            
            <div>
                
            </div>
            <div class="row ">
                <div class="col-8">
                    <div class="container py-5 px-0">
                        <h3 class="fw-bold">Upload Image</h3>
                        
                        <form action="upload.php" method="POST" enctype="multipart/form-data">
                            <div class="mb-3">
                                <label for="image" class="form-label">Choose an image:</label>
                                <input type="file" class="form-control" id="image" name="image" accept="image/*" required/>
                            </div>
                            <button type="submit" class="btn btn-primary">Upload</button>
                        </form>
                    </div>
                </div>
                <div class="col-4 d-flex flex-column justify-content-center align-items-center ">
                    <h3 class=" py-3 mb-0 fw-bold"> Description </h3> 
                    <textarea class="form-control hinput44 rounded-4 " placeholder="Add Description" id="floatingTextarea2" ></textarea>
                </div>
            </div>
            
            <div class="row ">
                    <div class="col-8 ">
                        <h3 class=" py-3 mb-0 fw-bold"> Vision </h3>         
                    </div>
                    <div class="col-4 ">
                        <div class="container">
                            <h1 class="fs-5 text-center mb-0 p-3">No. of people Benefited Till now</h1>
                           
                        </div>
                    </div>
            </div>
            
            <div class="row pb-4">
                <div class="col-8">
                    
                    <textarea class="form-control vinput44 rounded-4" placeholder="Add Vision" id="floatingTextarea2" ></textarea>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center">

                    <div class="p-2 hinput44 text-center rounded-5 color44">
                        <p class="fs-1 mb-3"> 12,3478 </p>
                    </div>

                </div>
            </div>
        

        

        
        </div>
        
    

    


    );
}

export default Createcampaign;