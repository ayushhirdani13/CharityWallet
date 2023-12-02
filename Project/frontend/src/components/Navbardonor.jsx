import React from 'react';
import logo from "../image/logo.svg";
import "../Styles/Navbar.css";
function Navbar(prop){
    return(

        <div class="container-fluid py-2 px-0 customstyle fix-top text-center" style={{background:prop.color,position:"relative"}}>
        <header class="d-flex flex-wrap justify-content-center   " >
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img style={{height:"80px",width:"200px"}} src={logo} alt="logo" /> 
        </a>
              
        <ul class="nav nav-pills ">
            <li class="align-item-center d-flex "><a href="/home" class="nav-link px-4 text-black  fs-4 mt-2">Home</a></li>
            
            <li class="nav-item dropdown align-item-center d-flex ">
                <a class="nav-link dropdown-toggle text-black text-center px-4 fs-4 mt-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Donate
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item text-center" href="/ExploreNgo">NGO</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item text-center" href="/Campaignhome">Campaign</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item text-center" href="/Emergency">Emergency Help</a></li>
                </ul>
            </li>

            <li class="align-item-center d-flex "><a href="" class="nav-link px-4 text-black  fs-4 mt-2">Donation Records</a></li>

            <li class="align-item-center d-flex "><a href="/AboutUs" class="nav-link px-4 text-black  fs-4 mt-2">About  Us</a></li>
        </ul>
        </header>
    </div>
        );
    }
    
    export default Navbar;