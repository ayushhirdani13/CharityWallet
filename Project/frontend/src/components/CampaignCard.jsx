import { WindowSharp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import axios from "axios";

function CampaignCard(props) {
  const [cover, setCover] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/campaign/cover?campaignAlias=${props.alias}`)
      .then((res) => {
        setCover(res.data.cover);
      })
      .catch((err) => {});
  }, [props.alias]);
  return (
    <div class="col-lg-6 col-12 mt-5">
      <Box
        component={Link}
        to={`/Campaignhome/${props.alias}`}
        sx={{ color: "black" }}
      >
        <img
          src={`data:image/jpeg;base64,${cover}`}
          class="img-fluid border rounded-3 shadow-lg "
          alt="Example image"
          loading="lazy"
        />
        <h1 class="text-center fw-bold fs-3 mt-2">{props.title}</h1>
        <div class="concolor33 py-1 px-1  rounded-4 text-center">
          <p class="mt-2">{props.vision}</p>
        </div>
      </Box>
    </div>
  );
}

export default CampaignCard;
