import React from "react";
import logo from "../image/logo.svg";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import { useFormControl } from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { CheckBox } from "@mui/icons-material";

import {Link} from "react-router-dom";
import { responsiveFontSizes } from "@mui/material";




function NgoSignIn()
{
  return <div className="login">
  <div className="logoimg">
  <img src={logo} alt="logo" />
   </div> 
   <div className="loginfrom">
   <div className="box-login" >
     <from style={{height:"500px"}}>
       <h1>Sign in</h1>
       <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Email</InputLabel>
        <FilledInput sx={{width:"300px"}}id="component-filled" Value="Composed TextField" />
      </FormControl>

      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Password</InputLabel>
        <FilledInput sx={{width:"300px"}}id="component-filled" Value="Composed TextField" />
      </FormControl>
       {/* <input></input>
       <input></input> */}
      {/* <div><input type="checkbox" placeholder="rem"/>
      <span>remide</span>
      </div> */}
    
       <button style={{borderRadius:"50px"}} >Sign in</button>
       <button style={{borderRadius:"50px"}}>Forgot Password</button>
    
      <div>
        <span>Don't have an account?
          <Link style={{fontSize:"20px"}}
          to="/Registration">
            Sign up
            </Link> 
          </span> 
        
      </div>
    
       </from>
       {/* <form noValidate autoComplete="off">
  <FormControl sx={{ width: '25ch' }}>
    <OutlinedInput placeholder="Please enter text" />
    <MyFormHelperText />
  </FormControl>
</form> */}
     
   </div>
   </div>
   </div>;
}

export default NgoSignIn;