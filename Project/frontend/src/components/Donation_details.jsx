// import React, { useState } from "react";
// import "../Styles/Don_details.css";
// import '../Styles/boot.css';
// import DonarAmount from "../Pages/donarAmount";


// function donationDetails() {


//     const [User, setUser] = useState({
//         name: "",
//         email: "",
//         address: "",

//     });

//     const [IsValid, setIsValid] = useState(false);


//     function handlechange(event) {
//         const { name, value } = event.target;

//         setUser((prev) => {
//             return { ...prev, [name]: value };
//         });
//     }


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         (() => {


//             // Fetch all the forms we want to apply custom Bootstrap validation styles to
//             const forms = document.querySelectorAll('.needs-validation')

//             // Loop over them and prevent submission
//             Array.from(forms).forEach(form => {
//                 form.addEventListener('submit', event => {
//                     if (!form.checkValidity()) {
//                         event.preventDefault()
//                         event.stopPropagation()
//                     }

//                     form.classList.add('was-validated')
//                 }, false)
//             })
//         })()

//         if (event.currentTarget.checkValidity()) {
//             setIsValid(true);
//         }

//     };


//     return (
//         <>

//             <div className="container">
//                 <div className="card">
//                     <div className="card-header">
//                         <span>Enter Donar Details</span>
//                     </div>

//                     <div className="card-body">
//                         <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//                             <div className="details_section" >

//                                 <div className="form-floating mb-3 ">
//                                     <input  name="name" type="text" class="form-control" id="floatingInput" placeholder="Name" onChange={handlechange} required />
//                                     <label for="floatingInput" class="form-label">Name</label>
//                                     <div className="invalid-feedback">
//                                         Name is required
//                                     </div>
//                                 </div>
//                                 <div className="form-floating mb-3">
//                                     <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={handlechange} name="email" required />
//                                     <label for="floatingInput">Email</label>
//                                     <div className="invalid-feedback">
//                                         Invaild Email
//                                     </div>

//                                 </div>
//                                 <div className="form-floating mb-3">
//                                     <input type="text" class="form-control" id="floatingInput" placeholder="Address"  onChange={handlechange} name="address" required />
//                                     <label for="floatingInput">Address</label>
//                                     <div className="invalid-feedback">
//                                         Invaild Address
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className="pnext_section" >

//                                 <button class="btn" type="reset" style={{ width: '200px', borderRadius: '50px', height: '50px', height: '50px', marginTop: "0px" }}>Cancel</button>


//                                 <button  class="btn" type="submit" style={{ fontFamily: "initial", height: '50px', marginTop: "0px" }}>Next</button>





//                             </div>
//                         </form>
//                     </div>

//                 </div>

//             </div>

//             {IsValid && <DonarAmount donationDetails={donationDetails} />}

//         </>

//     )

// }

// export default donationDetails;

import React, { useState } from "react";
import "../Styles/Don_details.css";
import '../Styles/boot.css';
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";



function DonationDetails() {
    const [DonationDetails, setUser] = useState({
        name: "",
        email: "",
        address: "",
    });

    const [isValid, setIsValid] = useState(false);

    function handlechange(event) {
        const { name, value } = event.target;

        setUser((prev) => {
            return { ...prev, [name]: value };
        });
    }

    function handleChange()
    {
        if (isValid==true)
        window.location.href="/DonarAmount";
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add('was-validated');

        if (event.currentTarget.checkValidity()) {
            setIsValid(true);
        }
    };

    return (

        <>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <span>Enter Donar Details</span>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="details_section" >

                                <div className="form-floating mb-3 ">
                                    <input name="name" type="text" class="form-control" id="floatingInput" placeholder="Name" onChange={handlechange} required />
                                    <label for="floatingInput" class="form-label">Name</label>
                                    <div className="invalid-feedback">
                                        Name is required
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={handlechange} name="email" required />
                                    <label for="floatingInput">Email</label>
                                    <div className="invalid-feedback">
                                        Invaild Email
                                    </div>

                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Address" onChange={handlechange} name="address" required />
                                    <label for="floatingInput">Address</label>
                                    <div className="invalid-feedback">
                                        Invaild Address
                                    </div>
                                </div>

                            </div>
                            <div className="pnext_section" >

                                <button class="btn" type="reset" style={{ width: '200px', borderRadius: '50px', height: '50px', height: '50px', marginTop: "0px" }}>Cancel</button>


                                <button class="btn" onClick={handleChange}type="submit" style={{ fontFamily: "initial", height: '50px', marginTop: "0px" }} >Next</button>





                            </div>
                        </form>
                    </div>

                </div>

            </div>
           
        </>
    )

}

export default DonationDetails;