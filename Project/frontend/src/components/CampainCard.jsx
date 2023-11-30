import { WindowSharp } from "@mui/icons-material";
import React from "react";
import {Link} from "react-router-dom"
import { Box, Button } from "@mui/material";

function Campaingncard(props)
{
    return( 
        
      
        <div class="col-lg-6 col-12 mt-5" >
        <Box component={Link} to={`/Campaignhome/${props.alias}`} sx={{color:"black",}}>
        <img src={`http://localhost:5000/ngo/logo?ngoAlias=${props.alias}`} class="img-fluid border rounded-3 shadow-lg " alt="Example image" loading="lazy"/>
        <h1 class="text-center fw-bold fs-3 mt-2">{props.title}</h1>
        <div class="concolor33 py-1 px-1  rounded-4 text-center"> 
            <p class="mt-2">{props.vision}</p></div>
         </Box>
    </div>
   
   
    );
}

export default Campaingncard;