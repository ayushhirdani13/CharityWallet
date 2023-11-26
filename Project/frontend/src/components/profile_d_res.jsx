import React from 'react';
import {useSpring,animated} from 'react-spring';
import '../Styles/profile_d_res.css';
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

function Profile_Dashboard(){
    return(
        <div class="container">

            <div class="row">
                <div class="col-8 px-0">

                    <div class="py-2 border border-primary my-5 rounded-4">
                        <h1 class="fs-5 fs-lg-1 text-center fw-light">Hope International</h1>
                    </div>
                    
                    <div class="py-2 border border-primary my-5 rounded-4">
                        <h3 class="fs-5 fs-lg-3  text-center fw-light">Aiming to create a world that will never fall short of hape and charity</h3>
                    </div>
                    
                    <div class="row mt-5">
                        <div class="col-12 col-lg-8">
                            <div class="py-2 border border-primary  rounded-4">
                                <h3 class="fs-5 fs-lg-3  text-center fw-light">Sardar Patel Marg, CH-Road</h3>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4 mt-5 mt-lg-0" >
                            <div class="py-2 border border-primary  rounded-4">
                                <h3 class="fs-5 fs-lg-3 text-center fw-light">Gandhinagar</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-4 d-flex align-items-center justify-content-center">
                    <img src="https://picsum.photos/300/300" class="img-fluid border rounded-4 shadow-lg mt-5" alt="Example image" loading="lazy"/>

                </div>    
            </div>

            <div class="row my-4 ">
                <div class="col-12 px-0">
                    <h1 class="my-2 fw-normal text-center rounded-4 pwclr text-black py-3">Previous Work</h1> 
                </div>
            </div>

            <div class="row ">
                <div class="col-12 col-lg-8">
                    <div class="row pt-4 px-4 my-5 rounded-4 pdclr">
                        <div class="col-3 mb-4 mx-auto"><img src="https://picsum.photos/1600/1600" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/></div>
                        <div class="col-3 mb-4 mx-auto"><img src="https://picsum.photos/1600/1600" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/></div>
                        <div class="col-3 mb-4 mx-auto"><img src="https://picsum.photos/1600/1600" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/></div>
                        <div class="col-3 mb-4 mx-auto"><img src="https://picsum.photos/1600/1600" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/></div>
                        <div class="col-3 mb-4 mx-auto"><img src="https://picsum.photos/1600/1600" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/></div>
                        <div class="col-3 mb-4 mx-auto"><img src="https://picsum.photos/1600/1600" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/></div>
                        <div class="col-3 mb-4 mx-auto"><img src="https://picsum.photos/1600/1600" class="img-fluid border rounded-4 shadow-lg " alt="Example image" loading="lazy"/></div>
                        <div class="col-3 mb-4 d-flex align-items-center justify-content-center mx-auto"><button type="button" class="btn btn-light rounded-circle btn-adj fs-4 fw-normal">See More</button></div>
                    </div> 
                </div>

                <div class="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center px-4">
                    <div class="py-2 border border-primary rounded-4 hw-adj d-flex justify-content-center align-items-center py-5 max-content">
                        <p class="text-center fw-light px-2 ">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </div>
                    <h5 class="py-3 mb-0">Donation Live Count</h5>
                    <div class="p-2  text-center rounded-5 dbclr px-5">
                        <p class="fs-1 mb-0"><Number n={1202121} /></p>
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2 d-md-flex ">
                <button type="button" class="btn btn-primary btn-clr btn-lg px-5 me-md-2">Create Campaign</button>
                <button type="button" class="btn btn-primary btn-clr btn-lg px-5 me-md-2">Edit Profile</button>
            </div>

            <div class="col-xl-12 col-md-7 p-0 clr rounded-4 mx-md-auto">
                <div class="overflow-auto h75">
                    <div class="container-fluid ">
                
                    
                    <div class="row justify-content-center">  
                        <div class="col-11 px-4">
                            <div class=" row flex-lg-row align-items-center g-5 py-2 px-4 my-3 post_11 rounded-4">
                            <div class="col-12 col-xxl-6 p-0 mt-0">
                                <img src="https://picsum.photos/640/360" class="d-block mx-lg-auto img-fluid rounded-4" alt="Bootstrap Themes" width="500" height="500" loading="lazy"/>
                            </div>
                            <div class="col-12 col-xxl-6 mt-0 ">
                                
                                <h1 class="lh-1 my-3 rounded-4 text-center text-white bg-dark py-2 font fs-1">Objective </h1>
                                <div class="bgd-clr p-3 rounded-4">
                                <p class="text-center">Quickly design and customize responsive mobile-first sites with Bootstrap,of is are the an ahehaklfh uoisdgfuis the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <button type="button" class="btn btn-primary btn-clr btn-lg px-5 me-md-2">Edit</button>
                                    
                                </div>
                                </div>

                            </div>
                            </div>
                        </div>  
                    </div>

                    
                    <div class="row justify-content-center">
                        <div class="col-11 px-2 ">
                            <div class=" row flex-lg-row align-items-center g-5 py-4 px-4 my-3 post_11 rounded-4">
                            <div class="col-12 col-xxl-6 p-0 mt-0">
                                <img src="https://picsum.photos/640/360" class="d-block mx-lg-auto img-fluid rounded-4" alt="Bootstrap Themes" width="500" height="500" loading="lazy"/>
                            </div>
                            <div class="col-12 col-xxl-6 mt-0 ">
                                <h1 class="lh-1 my-3 rounded-4 text-center text-white bg-dark py-2 font fs-1">Objective </h1>
                                <div class="bgd-clr p-3 rounded-4">
                                <p class="text-center">Quickly design and customize responsive mobile-first sites with Bootstrap,of is are the an ahehaklfh uoisdgfuis the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <button type="button" class="btn btn-primary text-white btn-clr btn-lg px-5 me-md-2">Edit</button>
                                    
                                </div>
                                </div>

                            </div>
                            </div>
                        </div>  
                    </div> 
                
                    
                    <div class="row justify-content-center">
                        <div class="col-11 px-2 ">
                        <div class=" row flex-lg-row align-items-center g-5 py-4 px-4 my-3 post_11 rounded-4">
                            <div class="col-12 col-xxl-6 p-0 mt-0">
                            <img src="https://picsum.photos/640/360" class="d-block mx-lg-auto img-fluid rounded-4" alt="Bootstrap Themes" width="500" height="500" loading="lazy"/>
                            </div>
                            <div class="col-12 col-xxl-6 mt-0 ">
                            <h1 class="lh-1 my-3 rounded-4 text-center text-white bg-dark py-2 font fs-1">Objective </h1>
                            <div class="bgd-clr p-3 rounded-4">
                                <p class="text-center">Quickly design and customize responsive mobile-first sites with Bootstrap,of is are the an ahehaklfh uoisdgfuis the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button type="button" class="btn btn-primary text-white btn-clr btn-lg px-5 me-md-2">Edit</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>  
                    </div>

                    </div>
                </div>
            </div>

       

        </div>
    
        );
    }
    
    export default Profile_Dashboard;