import React from "react";
import '../Styles/profile_dashboard.css';
import pic1 from "../image/logo1.png";
import img1 from "../image/image1.png";
import img2 from "../image/image2.png";
import img3 from "../image/image3.png";
import img4 from "../image/image4.png";
import img5 from "../image/image5.png";
import img6 from "../image/image6.png";
import img7 from "../image/image7.png";

export default function Profile_Dashboard() {
    return( 
        <div className="container">
            <div className="row">
                <div className="c1 col">
                    <button className="b1">Edit+</button>
                </div>
                <div className="c1 col">
                    <div className="card-container1">
                        <div className="cd-bd1">
                            HOPE INTERNATIONAL
                        </div>
                        <div className="cd-bd2">
                            Aiming to create a world that will never fall short of hopes and charity.
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card-container4">
                                    <div className="cd-bd3">
                                        Sardar Patel Marg, CH -Road
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card-container4">
                                    <div className="cd-bd4">
                                        Gandhinagar
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lt">
                            Previous Work
                        </div>
                        <div className="cd-bd8">
                            <img src={img1} alt="" className="cd-img1"/>
                            <img src={img2} alt="" className="cd-img2"/>
                            <img src={img3} alt="" className="cd-img3"/>
                            <img src={img4} alt="" className="cd-img4"/>
                            <img src={img5} alt="" className="cd-img5"/>
                            <img src={img6} alt="" className="cd-img6"/>
                            <img src={img7} alt="" className="cd-img7"/>
                            <button type="button" className="b2 btn-lg">See More</button>
                        </div>
                    </div>
                </div>
                <div className="c1 col">
                    <div className="card-container2">
                        <img src={pic1} alt="" className="ig1"/>
                        <div className="cd-bd5">
                            Bank Details 
                        </div>
                        <div className="cd-bd6">
                            For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it 
                        </div>
                        <div className="rt">
                            Donations till now
                        </div>
                        <div className="cd-bd7">
                            12,02,121 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}