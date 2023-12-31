// import { WindowSharp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Axios from "axios";
import NgoLogo from "../image/ngo.jpg";
import HashLoader from "react-spinners/HashLoader";
function NgoCard(props) {
  const [logo, setLogo] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getabs = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_API}/ngo/logo?ngoAlias=${props.alias}`
      );
      setLogo(res.data.logo);
      setLoading(false);
    };
    getabs().catch((error) => {
      setLoading(false);
    });
  });

  return (
    <div class="col-lg-6 col-12 mt-5">
      <Box
        component={Link}
        to={`/ExploreNgo/${props.alias}`}
        sx={{ color: "black" }}
      >
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
          <>
            {Object.keys(logo).length === 0 ? (
              <img
                src={NgoLogo}
                style={{height:"400px",width:"100%"}}
                class="img-fluid border rounded-3 shadow-lg "
                alt="jsx"
                loading="lazy"
              />
            ) : (
              <img
              
                src={`data:image/jpeg;base64,${logo}`}
                style={{height:"400px",width:"100%"}}
                class="img-fluid border rounded-3 shadow-lg "
                alt="jsx"
                loading="lazy"
              />
            )}
          </>
        )}
        <h1 class="text-center fw-bold fs-3 mt-2">{props.name}</h1>
        <div class="concolor33 py-1 px-1  rounded-4 text-center">
          <p class="mt-2">{props.description}</p>
        </div>
      </Box>
    </div>
  );
}

export default NgoCard;
