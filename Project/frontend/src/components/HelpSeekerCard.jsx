import React from "react";


function HelpSeekerCard(props)
{
    return(
        <>
        <div class="row justify-content-center">
                  <div class="col-11 px-4">
                    <div class=" row flex-lg-row align-items-center g-5 py-2 px-4 my-3 post_11 rounded-4">
                      <div class="col-12 col-xxl-6 p-0 mt-0">
                        <img
                          src="https://picsum.photos/640/360"
                          class="d-block mx-lg-auto img-fluid rounded-4"
                          alt="Bootstrap Themes"
                          width="500px"
                          height="500px"
                          loading="lazy"
                        />
                      </div>
                      <div class="col-12 col-xxl-6 mt-0 ">
                        <h1 class="lh-1 my-3 rounded-4 text-center text-white bg-dark py-2 font fs-1">
                         {props.title}
                        </h1>
                        <div class="bgd-clr p-3 rounded-4">
                          <p class="text-center">
                           {props.issue}
                          </p>
                          <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button
                            onClick={()=>(window.location.href="/donor_details")}
                              type="button"
                              class="btn btn-primary btn-clr btn-lg px-5 me-md-2"
                            >
                              Donate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </>
    );
}
export default HelpSeekerCard;