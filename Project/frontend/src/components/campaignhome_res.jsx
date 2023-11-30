import {React,useState,useEffect} from 'react';
import '../Styles/campaignhome_res.css';
import Axios from 'axios';
import Ngocard from './Ngocard';
import Campaingncard from './CampainCard';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import HashLoader from 'react-spinners/HashLoader';
import {Link} from "react-router-dom";
import { Box } from '@mui/material';

function Campaignhome(){

    
    const[Campaign,setCampaign]=useState({});
    const[loading,setloading]=useState(true);
    const[logo,setlogo]=useState(null);
    useEffect(() => {
        const getabs=async ()=>{ 
            const res= await Axios.get('http://localhost:5000/campaign/')
            // const res1=await Axios.get('http://localhost:5000/ngo/logo?ngoAlias=sample_ngo')
                   setCampaign(res.data);
                //    setlogo(res1.data);
                   setloading(false);
                   }
                   getabs();

                //    setloading(false);
        // Axios.get('http://localhost:5000/ngo/')
        // .then(Ngo=>setNgo(Ngo.data))
      }, [])
     
      console.log(Campaign);
      const Campaigndetails=Campaign.campaigns;

      const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(Campaigndetails)

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = Campaigndetails.filter((Ngode) =>
    Ngode.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
   
  }

     
    return(
<>
{loading===true?(
            <Box sx={{height:"80%", display:"flex",justifyContent:"center",alignItems:"center"}}>
        <HashLoader size="150px"loading={true} color="#36d7b7" />
        </Box>
        ):(<div class="container-fluid">
        
        <div class="container px-5"> 
           {/* <img src='http://localhost:5000/ngo/logo?ngoAlias=sample_ngo' alt="logo"/> */}
            <h1 class="fw-bold text-center hsize33 py-4">Explore Campaign</h1>
            
            <input onChange={handleInputChange} type="search" class="form-control rounded-4" placeholder="Search..." aria-label="Search"/> 

            
            
            <div class="row py-4">
                {searchItem===''?(Campaigndetails.map(Campaignterm=>(
                    // <Link to={`/ExploreNgo/${ngoterm.name}`}>
                    <Campaingncard
                    key={Campaignterm.id}
                    title={Campaignterm.title}
                    vision={Campaignterm.vision} 
                    alias={Campaignterm.alias}
                   
                    />
                    // </Link>
                ))):(filteredUsers.map(ngoterm=>(
                    <Campaingncard
                    key={ngoterm.id}
                    name={ngoterm.name}
                    description={ngoterm.description} 
                    image={ngoterm.alias}
                    />
                )))}
                 
            </div>


    



        </div>
    </div>)}
       
    </>

    );
}
 export default Campaignhome;