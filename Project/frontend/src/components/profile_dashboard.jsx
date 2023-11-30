import React from "react";
import { useEffect,useState } from "react";
import Axios from "axios";
// import { use } from "react-router-dom";
import { useParams } from "react-router-dom";
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

    const {alias} = useParams();
    console.log(alias);

    const[Ngo,setNgo]=useState({});
    useEffect(() => {
        const getabs=async ()=>{ 
            const res= await Axios.get(`http://localhost:5000/ngo/dashboard?alias=${alias}`)
            // const res1=await Axios.get('http://localhost:5000/ngo/logo?ngoAlias=sample_ngo')
                   setNgo(res.data);
                //    setlogo(res1.data);
                //    setloading(false);
                   }
                   getabs();

                //    setloading(false);
        // Axios.get('http://localhost:5000/ngo/')
        // .then(Ngo=>setNgo(Ngo.data))
      }, [])


console.log(Ngo);
    return( 
        // <div className="r5"style={{background:"linear-gradient(270deg, #7DB9E1 0.29%, rgba(216, 244, 250, 0.37) 98.4%)",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",}} >
        
        
        <div className="container-fluid rounded-4 py-5" style={{flex:"1",borderTopLeftRadius:"30px",borderTopRightRadius:"30px",width:"100%"}}>
           
            <div className="row">
                <div className="c1 col">
                    <button className="b1">Edit+</button>
                </div>
                <div className="c2 col">
                    <div className="card-container1">
                        <div className="cd-bd1">
                     {/* {state.props.name} */}
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
                <div className="c2 col">
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
        {/* </div> */}
        </div>
    );
}