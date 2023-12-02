import React from "react";
import { useLocation } from "react-router";

function View_records() {
  const location = useLocation();
  const data = location.state;
  return (
    <>
   
      <div className="container">
        <div className="card">
          <div className="card-header">
            <span> View Donar Records </span>
          </div>
          <div className="card-body">
            <div
              className="viewrec"
              style={{ width: "100%", height: "max content" }}
            >
              <div class="table-responsive">
                <table class="table  table-boardered border-primary ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">NGO Name</th>
                      <th scope="col">Donation Amount</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((donor,index) => (
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td>{donor.receiverId.name}</td>
                        <td>{donor.donationAmount}</td>
                        <td>{donor.donationTime}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default View_records;
