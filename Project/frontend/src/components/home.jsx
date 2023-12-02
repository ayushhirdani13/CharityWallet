import React,{useState,useEffect} from "react";
import Axios from "axios";
import {useSpring,animated} from 'react-spring';
import "../Styles/home.css";
import { Card } from "../components/Card";
import logo1 from "../image/logo1.png";
import logo2 from "../image/image3.png";
import logo3 from "../image/image5.png";
import pic2_card from "../image/home_card2_pic.png";
 
function Number({n})
{
    const {number}=useSpring({
        from:{number:0},
        number:n,
        delay:200,
        config:{mass:1,tension:20,friction:10},
    });

    return(<animated.div>{number.to((n)=>n.toFixed(0))}</animated.div>);
}




function Home(){
  
  return (
    <div className="container-main " >
      <div className="container1" style={{borderRadius:"80px"}}>
        <div className="row g-2">
          <div className="col-6">
            <div className="p-3-border1">
            <label className="font1">STREAMLINE YOUR </label>
            <br/><label className="font1"  >DONATION,</label>
            <br/><label className="font2"  >Transform</label>
            <br/><label className="font2"  >Lives</label>
            </div>
          </div>
          <div className="col-6">
            <div className="p-3-border">
              <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={logo1} className="im" alt=""/>
                  </div>
                  <div className="carousel-item">
                    <img src={logo2} className="im" alt=""/>
                  </div>
                  <div className="carousel-item">
                    <img src={logo3} className="im" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="line1">
        <hr className="line1"></hr>
      </div>
      <div className="container2">
        <div className="row g-2">
          <div className="col-6">
              <div className="p-3-border3">
                <Card
                  imgSrc={pic2_card}
                  imgAlt="Card Image 1"
                  title="Help Nitya"
                  description="It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the rebuke, in the pleasure he wants to be a hair from the pain, let him flee from the pain..."
                  buttonText="Donation"
                  link="/donation" 
                />
              </div>
            </div>
            <div className="col-6">
              <div className="p-3-border4">
                <div className="container2">
                  <div className="text1">
                    <label>No. of Donations we<br/> Facilitated</label>
                  </div>
                  <div className="text2">
                    <label><Number n={56470} /></label>
                  </div>
                  <div className="text1">
                    <label>No. of NGOs<br/> Associated with us</label>
                  </div>
                  <div className="text2">
                  <label><Number n={780} /></label>
                  </div>
                  <div className="text1">
                    <label>No. of Campaigns<br/> we hosted</label>
                  </div>
                  <div className="text2">
                  <label><Number n={1240} /></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
