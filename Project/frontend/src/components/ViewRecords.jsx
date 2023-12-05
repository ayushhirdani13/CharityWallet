import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function View_records() {
  const location = useLocation();
  const data = location.state;
  return (
    <>
      <div className="container-fluid py-5 px-5 d-flex justify-content-center">
        <div
          className="card"
          style={{ width: "60%", display: "flex", justifyContent: "center" }}
        >
          <div
            className="card-header"
            style={{ justifyContent: "center", display: "flex" }}
          >
            View Donor Records
          </div>
          <div className="card-body">
            <div
              className="viewrec"
              style={{ width: "100%", height: "max content" }}
            >
              <div class=" table-responsive">
                <table class="table  table-boardered border-primary ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Receiver Name</th>
                      <th scope="col">Donation Amount</th>
                      <th scope="col">Date</th>
                      <th scope="col">Transaction Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((donor, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {donor.receiverType === "NGO" ? (
                            <>
                              <Link
                                style={{ fontSize: "20px", color: "blue" }}
                                to={`/ExploreNgo/${donor.receiverId.alias}`}
                              >
                                <div>{donor.receiverId.name}</div>
                              </Link>
                            </>
                          ) : donor.receiverType === "Campaign" ? (
                            <Link
                              style={{ fontSize: "20px", color: "blue" }}
                              to={`/Campaignhome/${donor.receiverId.alias}`}
                            >
                              {" "}
                              <div> {donor.receiverId.title}</div>
                            </Link>
                          ) : (
                            <Link
                              style={{ fontSize: "20px", color: "blue" }}
                              to={`/Campaignhome/${donor.receiverId.alias}`}
                            >
                              {" "}
                              <div> {donor.receiverId.title}</div>
                            </Link>
                          )}
                        </td>
                        <td>{donor.donationAmount}</td>
                        <td>{donor.donationTime.slice(0, 10)}</td>
                        <td>{donor.transactionId}</td>
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
