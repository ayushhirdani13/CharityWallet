import React from "react";
import "../Styles/AboutUs.css";
function AboutUs() {
  return (
    <div class="container-fluid bcolor_11 py-5">
      <div class="heading text-center text py-4">
        <h1>ABOUT US</h1>
      </div>

      <div class="container">
        <h3 class="px-3 mb-4">Vision</h3>
        <div class="px-3 py-2  rounded-4 bgcolor_11">
          <h4>Empowering Generosity: Connecting Hearts Worldwide.</h4>
          <p>
            Our charity wallet website is dedicated to facilitating and
            promoting charitable giving by providing a secure platform that
            connects donors and organizations. With user-friendly features,
            real-time tracking, and transparency, we aim to inspire and empower
            individuals to make a positive impact on the world by supporting
            various causes. Together, we can create a brighter future for those
            in need.
          </p>
        </div>
      </div>

      <div class="container my-4">
        <h3 class="px-3 mb-4">Mentors</h3>

        <div class="row">
          <div class="col-lg-6 col-12 d-flex">
            <img
              src="https://picsum.photos/200/200"
              class="d-block rounded-4 "
              alt="Bootstrap Themes"
              height="200px"
              width="200px"
              loading="lazy"
            />
            <div class="px-2 mx-4 bgcolor_11 rounded-4 w-100_11 py-5 my-auto">
              <p> Name:</p>
              <p> About:</p>
            </div>
          </div>

          <div class="col-lg-6 col-12 d-flex">
            <img
              src="https://picsum.photos/200/200"
              class="d-block rounded-4 "
              alt="Bootstrap Themes"
              height="200px"
              width="200px"
              loading="lazy"
            />
            <div class="px-2 mx-4 bgcolor_11 rounded-4 w-100_11 py-5 my-auto">
              <p> Name:</p>
              <p> About:</p>
            </div>
          </div>
        </div>

        <hr class="horizontal-row_11" />

        <div class="container">
          <div class="row">
            <div class="col-8 ">
              <h3 class="text-center">Meet the Team</h3>

              <div class="row">
                <div class="col-6 my-auto">
                  <p>1. Kush D Patel</p>
                  <p>2. Hirmi Bhupendra Patel</p>
                  <p>3. Timbadiya Shrusti Vipulbhai</p>
                  <p>4. Sankalp Bohidar</p>
                  <p>5. Chauhan Ruturajsinh Bharatsingh</p>
                  <p>6. Hirdani Ayush Rajeshkumar</p>
                  <p>7. Priyank Dinkar Hudka</p>
                  <p>8. Vaishnav Chinmay Suril</p>
                  <p>9. Darshan Girishkumar Sanghavi</p>
                </div>

                <div class="col-6 my-auto">
                  <p class="text-center">202101137@daiict.ac.in</p>
                  <p class="text-center">202101151@daiict.ac.in</p>
                  <p class="text-center">202101141@daiict.ac.in</p>
                  <p class="text-center">202101122@daiict.ac.in</p>
                  <p class="text-center">202101146@daiict.ac.in</p>
                  <p class="text-center">202101139@daiict.ac.in</p>
                  <p class="text-center">202101125@daiict.ac.in</p>
                  <p class="text-center">202101157@daiict.ac.in</p>
                  <p class="text-center">202101150@daiict.ac.in</p>
                </div>
              </div>
            </div>

            <div class="col-4 my-auto">
              <h3 class="text-center my-auto">Leave a Comment</h3>
              <div class="form-floating py-2 my-3">
                <textarea
                  class="form-control rounded-4  my"
                  placeholder="Name"
                  id="floatingTextarea"
                ></textarea>
                <label for="floatingTextarea">Name</label>
              </div>

              <div class="form-floating py-2 my-2">
                <input
                  type="email"
                  class="form-control rounded-4"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Email address</label>
              </div>

              <div class="form-floating py-2 my-2">
                <textarea
                  class="form-control rounded-4 h100_11"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                ></textarea>
                <label for="floatingTextarea2">Comments</label>
              </div>

              <div class="d-flex justify-content-center py-2 my-2">
                <button type="button" class="btn btn-lg btn-primary mx-auto">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
