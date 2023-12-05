import { React, useState, useEffect } from "react";
import "../Styles/campaignhome_res.css";
import Axios from "axios";
import CampaignCard from "./CampaignCard";
import HashLoader from "react-spinners/HashLoader";
import { Box } from "@mui/material";

function Campaignhome() {
  const [Campaign, setCampaign] = useState({});
  const [loading, setloading] = useState(true);
  // const[logo,setlogo]=useState(null);
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(`${process.env.REACT_APP_API}/campaign/`);
      setCampaign(res.data);
      //    setlogo(res1.data);
      setloading(false);
    };
    getabs();
  }, []);
  const Campaigndetails = Campaign.campaigns;

  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(Campaigndetails);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = Campaigndetails.filter((campaigns) =>
      campaigns.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 class="fw-bold text-center hsize33 py-4">Explore Campaign</h1>

            <input
              onChange={handleInputChange}
              type="search"
              class="form-control rounded-4"
              placeholder="Search..."
              aria-label="Search"
            />

            <div class="row py-4">
              {searchItem === ""
                ? Campaigndetails.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      title={campaign.title}
                      vision={campaign.vision}
                      alias={campaign.alias}
                    />
                    // </Link>
                  ))
                : filteredUsers.map((ngoterm) => (
                    <CampaignCard
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
export default Campaignhome;
