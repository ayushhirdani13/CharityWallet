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
      const res = await Axios.get("/ngo/");

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
        <div class="container-fluid">
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

            {/*             
            <div class="row py-4">
                <div class="col-lg-6 col-12">
                    <img src="https://picsum.photos/1600/900" class="img-fluid border rounded-3 shadow-lg " alt="Example image" loading="lazy"/>
                    <h1 class="text-center fw-bold fs-3 mt-2">Sankalp NGOs</h1>
                    <div class="concolor33 py-1 px-1  rounded-4 text-center"> 
                        <p class="mt-2">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <img src="https://picsum.photos/1600/900" class="img-fluid border rounded-3 shadow-lg " alt="Example image" loading="lazy"/>
                    <h1 class="text-center fw-bold fs-3 mt-2">Sankalp NGOs</h1>
                    <div class="concolor33 py-1 px-1  rounded-4 text-center"> 
                        <p class="mt-2">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </div>
                </div>
            </div>

            <div class="row py-4">
                <div class="col-lg-6 col-12">
                    <img src="https://picsum.photos/1600/900" class="img-fluid border rounded-3 shadow-lg " alt="Example image" loading="lazy"/>
                    <h1 class="text-center fw-bold fs-3 mt-2">Sankalp NGOs</h1>
                    <div class="concolor33 py-1 px-1  rounded-4 text-center"> 
                        <p class="mt-2">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <img src="https://picsum.photos/1600/900" class="img-fluid border rounded-3 shadow-lg " alt="Example image" loading="lazy"/>
                    <h1 class="text-center fw-bold fs-3 mt-2">Sankalp NGOs</h1>
                    <div class="concolor33 py-1 px-1  rounded-4 text-center"> 
                        <p class="mt-2">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </div>
                </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
export default ExploreNgohome;