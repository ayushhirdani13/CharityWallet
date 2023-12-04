import React from "react";
import logo from "../image/logo.svg";
import "../Styles/Navbar.css";
function Navbar(prop) {
  return (
    <div
      className="container-fluid py-2 px-0 customstyle fix-top text-center"
      style={{ background: prop.color, position: "relative" }}
    >
      <header className="d-flex flex-wrap justify-content-center   ">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <img
            style={{ height: "80px", width: "200px" }}
            src={logo}
            alt="logo"
          />
        </a>

        <ul className="nav nav-pills ">
          <li className="align-item-center d-flex ">
            <a href="/" className="nav-link px-4 text-black  fs-4 mt-2">
              Home
            </a>
          </li>

          <li className="nav-item dropdown align-item-center d-flex ">
            <a
              className="nav-link dropdown-toggle text-black text-center px-4 fs-4 mt-2"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Donate
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item text-center" href="/ExploreNgo">
                  NGO
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-center" href="/Campaignhome">
                  Campaign
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-center" href="/Emergency">
                  Emergency Help
                </a>
              </li>
            </ul>
          </li>

          {sessionStorage.getItem("loggedIn") ? ( sessionStorage.getItem("userType")==="NGO"?(
            <li className="align-item-center d-flex ">
              <a
                href="/Ngoprofile"
                className="nav-link px-4 text-black  fs-4 mt-2"
              >
                Profile
              </a>
            </li>):( 
            sessionStorage.getItem("userType")==="Fundraiser"?(<li className="align-item-center d-flex ">
              <a
                href="/frprofile"
                className="nav-link px-4 text-black  fs-4 mt-2"
              >
                Profile
              </a>
            </li>):(<li className="align-item-center d-flex ">
              <a
                href="/organizer_dashboard"
                className="nav-link px-4 text-black  fs-4 mt-2"
              >
                Profile
              </a>
            </li>))
          ) : (
            <li className="align-item-center d-flex ">
              <a
                href="/donor_confirm"
                className="nav-link px-4 text-black  fs-4 mt-2"
              >
                Donation Records
              </a>
            </li>
          )}

          <li className="align-item-center d-flex ">
            <a href="/AboutUs" className="nav-link px-4 text-black  fs-4 mt-2">
              About Us
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Navbar;
