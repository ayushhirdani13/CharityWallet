import React from 'react'
import Navbar from "./Navbar";
import Footer from "./footer";


function View_records() {
    return (
        <>
            <Navbar></Navbar>
            <div className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <span> View Donar Records </span>
                    </div>
                    <div className='card-body'>
                        <div className='viewrec' style={{width:'100%', height:'max content'}}>
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
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Hope Foundation</td>
                                            <td>6000</td>
                                            <td>12-12-2023</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Bachpan</td>
                                            <td>5000</td>
                                            <td>15-10-2024</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Hope Foundation</td>
                                            <td>6000</td>
                                            <td>12-12-2023</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Bachpan</td>
                                            <td>5000</td>
                                            <td>15-10-2024</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Hope Foundation</td>
                                            <td>6000</td>
                                            <td>12-12-2023</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Bachpan</td>
                                            <td>5000</td>
                                            <td>15-10-2024</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Hope Foundation</td>
                                            <td>6000</td>
                                            <td>12-12-2023</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Bachpan</td>
                                            <td>5000</td>
                                            <td>15-10-2024</td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            <Footer></Footer>

        </>
    )
}

export default View_records
