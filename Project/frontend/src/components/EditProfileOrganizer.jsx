import React from "react";
import "../Styles/edit_profile_org_res.css";

function Edit_profile_org() {
  return (
    <div class="container">
      <div class="row">
        <div class="col-8 px-0">
          <div class="py-2 my-5 rounded-4">
            <input
              type="text"
              class="form-control border border-dark text-center"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Organizer Name"
            />
          </div>

          <div class="py-2 my-5 rounded-4">
            <input
              type="text"
              class="form-control border border-dark text-center"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Vision"
            />
          </div>

          <div class="row mt-5">
            <div class="col-12 col-lg-8">
              <div class="py-2 rounded-4">
                <input
                  type="text"
                  class="form-control border border-dark text-center"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Address"
                />
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-5 mt-lg-0">
              <div class="py-2 rounded-4">
                <input
                  type="text"
                  class="form-control border border-dark text-center"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="City"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-4 d-flex align-items-center justify-content-center">
          <form action="upload.php" method="POST" enctype="multipart/form-data">
            <div class="mb-3">
              <input
                type="file"
                class="form-control"
                id="image"
                name="image"
                accept="image/*"
                required
              />
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary pwclr">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="row my-4 ">
        <div class="col-12 px-0">
          <h1 class="my-2 fw-normal text-center rounded-4 pwclr text-white py-3">
            Previous Work
          </h1>
        </div>
      </div>

      <div class="row ">
        <div class="col-12 col-lg-8">
          <div class="row py-4 px-4 my-5 rounded-4 pdclr">
            <form
              action="upload.php"
              method="POST"
              enctype="multipart/form-data"
            >
              <div class="mb-3">
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                />
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary pwclr">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center px-4">
          <div class=" rounded-4 hw-adj2 d-flex justify-content-center align-items-center  max-content">
            <textarea
              class="form-control hxp100 border border-dark text-center"
              placeholder="Description"
              id="floatingTextarea2"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit_profile_org;
