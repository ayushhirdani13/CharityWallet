import React from 'react';
import {useSpring,animated} from 'react-spring';
import '../Styles/profile_home_res.css';
import { Link, useNavigate } from 'react-router-dom';
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
function Profile_home(){
    const naviGate=useNavigate();
    function handleSignout()
    {
        sessionStorage.removeItem("loggedIn");
        
        naviGate("/home");
        window.location.reload();

    }
    return(
        <div class="container-fluid bg_color_123" style={{borderTopLeftRadius:"50px",borderTopRightRadius:"50px"}}>

            <div class="d-grid gap-2 py-10 d-md-flex justify-content-md-end">
                {sessionStorage.getItem("loggedIn")?(
                <button type='button' onClick={handleSignout} class="btn btn-primary btn-clr text-white mt-4 mx-4 btn-lg text-end">SignOut</button>
                ):( <Link to="/signin">
                <button type='button' class="btn btn-primary btn-clr text-white mt-4 mx-4 btn-lg text-end">Sign In</button>
                </Link>)}
                
            </div>

            <div class="row">
                <div class="col-6 py-5 my-auto">
                    <h1 class="text-center mb-3 raleway fs-1 fw-bold">STREAMLINE YOUR</h1>
                    <h1 class="text-center mb-3 raleway fs-1 fw-bold">DONATION,</h1>
                    <h1 class="text-center mb-3 transform fs-larger">TRANSFORM</h1>
                    <h1 class="text-center mb-3 transform fs-larger">LIVES.</h1>
                </div>

                <div class="col-6 py-5 px-lg-5">
                    <div id="carouselExampleIndicators" class="carousel slide mx-lg-5">
                        <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
                        </div>
                        <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://picsum.photos/1600/900" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/>
                        </div>
                        <div class="carousel-item">
                            <img src="https://picsum.photos/1600/900" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/>
                        </div>
                        {/* <div class="carousel-item">
                            <img src="https://picsum.photos/1600/900" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/>
                        </div> */}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

            
            <hr class="border border-dark mt-5"/>

            <div class="row pt-3 pb-5">
                
                
                
                
                <div class="col-8 py-lg-5 px-lg-5 px-3">
                    <div class="row justify-content-center">  
                        <div class="col-11 px-2">
                            <div class=" row flex-lg-row align-items-center g-5 py-3 px-lg-5 px-3 mx-lg-5 my-3 post_123 rounded-4">
                                <div class="col-12 col-xxl-6 p-0 mt-0">
                                    <img src="https://picsum.photos/1600/1500" class="d-block mx-lg-auto img-fluid rounded-4" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                                </div>
                                <div class="col-12 col-xxl-6 mt-0 ">
                                
                                    <h1 class="lh-1 my-3 rounded-4 text-center text-white bg-dark py-2 font fs-1">Objective </h1>
                                    <div class="bgd-clr p-3 rounded-4">
                                        <p class="text-center">Quickly design and customize responsive mobile-first sites with Bootstrap,of is are the an ahehaklfh uoisdgfuis the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                        <button type="button" class="btn btn-primary btn-clr btn-lg px-5 me-md-2">Donate</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>  
                    </div>    
                </div>
                
                
                
                <div class="col-4 p-1 d-flex">
                    <div class="p-0 m-0 border border-dark vr"></div>
                    <div class="d-flex flex-column justify-content-center align-items-center w-100">
                        <h1 class="text-center px-xl-5 ">No of Donation we Facilitated</h1>
                        <h1 class="text-center raleway100 mb-5"><Number n={56470} /></h1>
                        <h1 class="text-center px-xl-5 ">No of Donation we Facilitated</h1>
                        <h1 class="text-center raleway100  mb-5"><Number n={56470} /></h1>
                        <h1 class="text-center px-xl-5  ">No of Donation we Facilitated</h1>
                        <h1 class="text-center raleway100  mb-5"><Number n={56470} /></h1>
                </div>
            </div>
            
            

    </div>
    </div>
        );
    }
    
    export default Profile_home;