import React from 'react';
import { useState } from "react";
import { useLocation } from 'react-router';
import "../Styles/Don_amount.css";
import '../Styles/boot.css';
import { Numbers } from '@mui/icons-material';



function DonationAmount() {
   const location =useLocation();
   const data=location.state;

//    console.log(data);
      const [DonationAmount, setUser] = useState({...data,donationAmount:Numbers,});
      console.log(DonationAmount);
    
    const [Amount, setAmount] = useState();
    const [isValidAmount, setIsValidAmount] = useState(true);
    const handleAmountChange = (donationAmount) => {
   
        

        console.log(DonationAmount);
        setIsValidAmount(true);
        setAmount(donationAmount);
        console.log(donationAmount);

    };

    const handleContinue = () => {
        // setAmount("");
        // setIsValidAmount(true);
    };

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

    function handlechange(event) {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);
        console.log(DonationAmount);
        setUser(prev=>{return({...data,...prev,[name]:value});});
        
    }

    function handleChange()
    {
        if (Amount>10)
        window.location.href="/DonarMethod";
    }

 async function handleSubmit(event){
        event.preventDefault();

        // console.log(Amount);
        // Ensure the amount is at least 10 before submitting
        if (Amount < 10) {
            setIsValidAmount(false);
            return;
        }
        // (() => {


        //     // Fetch all the forms we want to apply custom Bootstrap validation styles to
        //     const forms = document.querySelectorAll('.needs-validation')

        //     // Loop over them and prevent submission
        //     Array.from(forms).forEach(form => {
        //         form.addEventListener('submit', event => {
        //             if (!form.checkValidity()) {
        //                 event.preventDefault()
        //                 event.stopPropagation()
        //             }

        //             form.classList.add('was-validated')
        //         }, false)
        //     })
        // })()

        // Clear the input after submission if needed
        setAmount("");

        try {
      
            const response = await fetch(
              "/ngo/donate?ngoAlias=sample_ngo",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(DonationAmount),
              }
            );
            const data = await response.json(); // Parse the response JSON
            console.log(data);
            // if (data.success) {
             
            //   setDisabled(true);
            //   setErrors(validationerrors);
            // } else {
            //   setErrors1(data.message);
            //   setOpen(true);
            // }
    
            if (!response.ok) {
              throw new Error(`Request failed with status: ${response.status}`);
            }
          } catch (error) {
            console.error(error);
          }

    };

    return (
        <>
           
            <div className="container" style={{ marginTop: '100px' }}>
                <div className="card">
                    <div className="card-header">
                        <span>Enter Amount</span>
                    </div>
                    <div className="card-body" style={{ height: 'max-content', width: '100%', justifycontent: 'center' }}>
                        <div className="ThankU_section">
                            <p>
                                Thank you for considering supporting our cause.
                                Every donation  aids our efforts to assist the underprivileged.
                                So donate and make the world a better place. Any amount is welcome.
                                Just choose your donation below to get started.
                            </p>
                        </div>
                        <div className="DonationAmount_section">
                            {/* <div class="input-group mb-3 mt-3">
                                <span class="input-group-text">₹</span>
                                <div className="form-floating">
                                    <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Amount" defaultValue={amount} name='amount' onChange={handlechange} required />
                                    <label for="floatingInputGroup1">Amount</label>
                                    <div className="invalid-feedback">
                                    {isValidAmount ? 'Invalid Amount' : 'Amount must be at least 10'}
                                    </div>
                                </div>
                            </div> */}
                            <div className="form-floating">   
                                <label for="validationCustomAmount" class="form-label"></label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">₹</span>
                                    <input type="number" class="form-control" id="validationCustomAmount" aria-describedby="inputGroupPrepend" placeholder="donationAmount" defaultValue={Amount} name="donationAmount" onChange={handlechange}  required/>
                                        <div class="invalid-feedback">
                                        Minimum amount should be 10.
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="DonationButton_section" >

                            <div className='btn-group'
                                aria-label="donation options"
                                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                            >
                                {[10, 25, 50, 100, 250].map((value) => (
                                    <div className='btn'

                                        key={value}
                                        variant="success"
                                        onClick={() => handleAmountChange(value)}
                                        style={{ borderRadius: '20px', margin: '0px' }}
                                    >
                                        ₹{value}
                                    </div>
                                ))}
                                <div className='btn'
                                    variant="success"
                                    onClick={() => handleAmountChange("0")}
                                    style={{ borderRadius: '20px', margin: '0px' }}
                                >
                                    Custom Amount
                                </div>
                            </div>
                        </div>

                        <div className="proceedtonext_section" style={{ display: 'flex', flexdirection: 'row', gap: '35px', marginBottom: '30px' }}>

                            <input class="btn btn-outline" type="reset" value="Cancel" id="buttoncancel"
                                onClick={handleContinue} />


                            {/* <Link to="/d1">
                                <button class="btn btn-outline" type="submit" id="buttonnext" >Next</button>
                            </Link> */}
                            <button
                                className="btn btn-outline"
                                type="submit"
                                id="buttonnext"
                                onClick={(e)=>(handleSubmit(e))}
                            >
                                Next
                            </button>


                        </div>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default DonationAmount;