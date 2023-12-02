import React, { useState } from "react";
// import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import "../Styles/Don_details.css";
import '../Styles/boot.css';



function Forgotpassword() {
    // const history = useHistory(); // Create a history object

    const [Forgotpassword, setUser] = useState({
        
        email: "",
        password: "",
        conpassword:"",

    });
   
    function handlechange(event) {
        const { name, value } = event.target;

        setUser((prev) => {
            return { ...prev, [name]: value };
        });
    }
   

    const handleSubmit = (event) => {
        event.preventDefault();
        (() => {
            

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
        })()
       
    };

    
    return (
        <>
            
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <span>Change Password</span>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="details_section" >                               
                                <div className="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={handlechange} name="email" required />
                                    <label for="floatingInput">Email</label>
                                    <div className="invalid-feedback">
                                        Invaild Email
                                    </div>
                                </div>
                                <div className="form-floating mb-3 ">
                                    <input  name="name" type="text" class="form-control" id="floatingInput" placeholder="password" onChange={handlechange} required />
                                    <label for="floatingInput" class="form-label">Change Password</label>
                                    <div className="invalid-feedback">
                                       
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="conpassword"  onChange={handlechange} name="address" required />
                                    <label for="floatingInput">Confirm Password</label>
                                    <div className="invalid-feedback">
                                       
                                    </div>
                                </div>

                            </div>
                            <div className="pnext_section" >

                                <button class="btn" type="reset" style={{ width: '200px', borderRadius: '50px', height: '50px', height: '50px', marginTop: "0px" }}>Cancel</button>


                                <button  class="btn" type="submit" style={{ fontFamily: "initial", height: '50px', marginTop: "0px" }}>Change Password</button>

                               



                            </div>
                        </form>
                    </div>

                </div>

            </div>
           


        </>

    )

}

export default Forgotpassword;