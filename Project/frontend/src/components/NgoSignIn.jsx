import logo from "../image/logo.svg";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
// import { useFormControl } from '@mui/material/FormControl';
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CheckBox } from "@mui/icons-material";
import "../Styles/Sign_In.css";
import { Link, useNavigate } from "react-router-dom";
import { responsiveFontSizes } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';




function NgoSignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [Type,setType]=useState({
    type:"",});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setType({[name]:value});
  };


  const [errors,setErrors]=useState({});

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handlechange(event) {
    const { name, value } = event.target;
   
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }
  console.log(Type);
let navigate=useNavigate();
  async function handelsignin(e) {
    e.preventDefault();
    
    const validationerrors={};
    const error_email_patten= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    if(!Type.type.trim())
    {
      validationerrors.type="Type is required"
    }
    if(!user.email.trim())
    {
      validationerrors.email="Email is required";
    }
    else if(!error_email_patten.test(user.email))
    {
      validationerrors.email="Email is not valid";
    }

    if(!user.password.trim())
    {
      validationerrors.password="Password is required";
    }
    else if(user.password.length<8)
    {
      validationerrors.password="Password shold be at least 8 char";
    }

    setErrors(validationerrors);

    if(Object.keys(validationerrors).length===0)
{
  if(Type.type==="NGO")
  {
    try {
      const response = await fetch("/ngo/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json(); // Parse the response JSON
      const token =data?.payload?.token;
      console.log(token);
          console.log(data);
      // console.log(data);
      if(data.success)
      {
        //  window.location.href="/home";
      }
   
          if (!response.ok) {
            // Handle errors if the request is not successful
            throw new Error(`Request failed with status: ${response.status}`);
          }
    
         // Log the response data
         
        } catch (error) {
          console.error(error);
        }
        // alert(data.message);
        // window.location.href="/ngosignin";
      }
     
    
  
  else if(Type.type==="Fundraiser")
  {
    try {
      const response = await fetch("/fundraiser/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json(); // Parse the response JSON
      const token =data?.payload?.token;
      console.log(token);
      console.log(data);
     
      if(data.success)
      {
        window.location.href="/home";
      }
      else
      { }
        // alert(data.message);
        // window.location.href="/ngosignin";
        if (!response.ok) {
          // Handle errors if the request is not successful
          throw new Error(`Request failed with status: ${response.status}`);
        }
    
       // Log the response data
       
      } catch (error) {
        console.error(error);
      
      }
     
    }
   
  else
  {
    try {
      const response = await fetch("/organizer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json(); // Parse the response JSON
      
      console.log(data);
      if(data.success)
      {
        // window.location.href="/home";
      }
      else
      {
        alert(data.message);
        // window.location.href="/ngo/signin";
      }
     
      if (!response.ok) {
        // Handle errors if the request is not successful
        throw new Error(`Request failed with status: ${response.status}`);
      }

     // Log the response data
     
    } catch (error) {
      console.error(error);
    }
  }
}
}



  return (
    <div id="r1">
      <div className="logo1">
     <img id="l1" src={logo} alt="logo" /> 
     </div>
      <div className="signfrom">
        <div className="box-signin">
          <form className="f1"
            onSubmit={(event) => {
              console.log(event);
              handelsignin(event);
            }}
          >
            <h1>Sign in</h1>
        <FormControl error={errors.email} variant="filled" sx={{ m: 1, minWidth: 120,width:"90%",height:"60px",margin:"0px" } }>
        <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
        <Select
          name="type"
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={Type}
          onChange={handleChange}
        >
         
          <MenuItem value={"NGO"}>NGO</MenuItem>
          <MenuItem value={"Fundraiser"}>Fundraiser</MenuItem>
          <MenuItem value={"Oraganizer"}>Oraganizer</MenuItem>
        </Select>
        <FormHelperText>{errors.type}</FormHelperText>
      </FormControl>

            <TextField
            
              name="email"
             
              id="filled-error"
              // sx={{ height: "60px", width: "500px" }}
              label="Email"
              helperText={errors.email}
              
              variant="filled"
              onChange={handlechange}
              className="email"
             
            />
              
            <FormControl
            error={errors.password}
            className="password"
              sx={{ height: "60px" }}
              variant="filled"
              onChange={handlechange}
            >
              <InputLabel helperText={errors.password}htmlFor="filled-error">
                Password
              </InputLabel>
              <FilledInput
                error={errors.password}
                name="password"
                id="filled-error"
                
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment sx={{ marginLeft: "10px" }} position="end">
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
              <FormHelperText>{errors.password}</FormHelperText>
            </FormControl>
           
          <div className="button"> 
            <button className="btn1" type="submit" >
              Sign in
            </button>
            <button className="btn1" >Sign up</button>
            </div>
            <div>
              <span>
                Don't have an account? 
                <Link
                  style={{ fontSize: "20px", color: "blue" }}
                  to="/Registrationas"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      </div>
  );
}


export default NgoSignIn;
