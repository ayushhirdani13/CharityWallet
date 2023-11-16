import React from "react";
import '../Styles/edit_profile.css';
import pic1 from "../image/logo1.png";
import img1 from "../image/upload_image.png";

export default function Edit_Profile() {
    return( 
        <div className="container">
            <div className="row">
                <div className="col1 col">
                    <div className="card-container1">
                        <div className="card-body1">
                            <input type="text" className="form-control1" placeholder="NGO Name"/>
                        </div>
                        <div className="card-body2">
                            <input type="text" className="form-control2" placeholder="Vision"/>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card-container3">
                                    <div className="card-body3">
                                        <input type="text" className="form-control3" placeholder="Address"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card-container4">
                                    <div className="card-body4">
                                        <input type="text" className="form-control4" placeholder="City"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="left">
                            Previous Work
                        </div>
                        <div className="card-body8">
                            <img src={img1} alt='' className="img1"/>
                            <input type="file" className="card-image1"/>
                            <img src={img1} alt='' className="img2"/>
                            <input type="file" className="card-image2"/>
                            <img src={img1} alt='' className="img3"/>
                            <input type="file" className="card-image3"/>
                            <img src={img1} alt='' className="img4"/>
                            <input type="file" className="card-image4"/>
                            <img src={img1} alt='' className="img5"/>
                            <input type="file" className="card-image5"/>
                            <img src={img1} alt='' className="img6"/>
                            <input type="file" className="card-image6"/>
                            <button type="button" className="button2 btn-lg">Add Work Button</button>
                        </div>
                    </div>
                </div>
                <div className="col2 col-3">
                    <img src={pic1} alt="" className="image1"/>
                    <div className="card-container2">
                        <div className="card-body5">
                            <input type="text" className="form-control5" placeholder="Bank Details"/> 
                        </div>
                        <div className="card-body6">
                            {/* <input type="text-textareas2" className="form-control6" placeholder="Add more description of your work"/> */}
                            <textarea className="form-control6" placeholder="Add more description of your work" rows="4"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}