import React, { useState, useEffect } from "react";
import "../Styles/campaignhome.css";
import Axios from "axios";
import NgoCard from "./Ngocard";

import HashLoader from "react-spinners/HashLoader";

import { Box } from "@mui/material";
function ExploreNgohome() {
  const [Ngo, setNgo] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(`${process.env.REACT_APP_API}/ngo/`);

      setNgo(res.data);
      setloading(false);
    };
    getabs();
  }, []);

  const Ngode = Ngo.ngos;

  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(Ngode);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = Ngode.filter((Ngode) =>
      Ngode.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };

  return (
    <>
      {loading === true ? (
        <Box
          sx={{
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HashLoader size="150px" loading={true} color="#36d7b7" />
        </Box>
      ) : (
        <div class="container-fluid pb-5" style={{margin:"100px 0px 100px"}}>
          <div class="container px-5">
            {/* <img src='http://localhost:5000/ngo/logo?ngoAlias=sample_ngo' alt="logo"/> */}
            <h1 class="fw-bold text-center hsize33 py-4">Explore NGOs</h1>

            <input
              onChange={handleInputChange}
              type="search"
              class="form-control rounded-4"
              placeholder="Search..."
              aria-label="Search"
            />

            <div class="row py-4">
              {searchItem === ""
                ? Ngode.map((ngoterm) => (
                    // <Link to={`/ExploreNgo/${ngoterm.name}`}>
                    <NgoCard
                      key={ngoterm.id}
                      name={ngoterm.name}
                      description={ngoterm.description}
                      alias={ngoterm.alias}
                      id={ngoterm._id}
                    />
                    // </Link>
                  ))
                : filteredUsers.map((ngoterm) => (
                    <NgoCard
                      key={ngoterm.id}
                      name={ngoterm.name}
                      description={ngoterm.description}
                      image={ngoterm.alias}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ExploreNgohome;
