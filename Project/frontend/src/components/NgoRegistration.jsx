import React from "react";
import logo from "../image/logo.svg"
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const s1={
  marginRight:"0px"
};


const s2={
  height:"800px",
  width:"700px"
};


function NgoRegistration()
{
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return <div className="login">
      <div className="loginfrom">
        <div style ={s1} className="box-login">
        <from style={s2}>

          <h1 style={{margin:"9px"}}>Registration From</h1>


        <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Ngo Name</InputLabel>
        <FilledInput sx={{width:"620px"}} id="component-filled" Value="Composed TextField" />
      </FormControl>


      <div>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Contact Number</InputLabel>
        <FilledInput sx={{width:"300px", marginRight:"20px"}}id="component-filled" Value="Composed TextField" />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Email</InputLabel>
        <FilledInput sx={{width:"300px"}}id="component-filled" Value="Composed TextField" />
      </FormControl>
      </div>
      <TextField
          sx={{width:"620px"}}
          id="filled-multiline-static"
          label="Address1"
          multiline
          rows={2}
          variant="filled"
        />
        <TextField
          sx={{width:"620px"}}
          id="filled-multiline-static"
          label="Address2"
          multiline
          rows={2}
          variant="filled"
        />
           <div style={{display:"flex", gap:"10px"}}>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">City</InputLabel>
        <FilledInput sx={{width:"200px"}}id="component-filled" Value="Composed TextField" />
      </FormControl>
      
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">State</InputLabel>
        <FilledInput sx={{width:"200px"}}id="component-filled" Value="Composed TextField" />
      </FormControl>

      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Area PIN</InputLabel>
        <FilledInput sx={{width:"200px"}}id="component-filled" Value="Composed TextField" />
      </FormControl>
      </div>

      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">NGO License number</InputLabel>
        <FilledInput sx={{width:"620px"}}id="component-filled" Value="Composed TextField" />
      </FormControl>

        <div>
        <FormControl sx={{ m:1, width:"300px" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput 
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment sx={{marginLeft:"10px"}} position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m:1, width:"300px" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password"> Confirm Password</InputLabel>
          <FilledInput 
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment sx={{marginLeft:"10px"}} position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </div>


       <div style={{display:"flex",gap:"40px"}}>
         <Link to=""><button>Submit</button></Link> 
         <Link to="/ngosignin"><button>Sign in</button></Link> 
         </div>
          {/* <button className="btn2">Donor</button> */}
          </from>
        </div>
      </div>
      </div>
          ;
}

export default NgoRegistration;