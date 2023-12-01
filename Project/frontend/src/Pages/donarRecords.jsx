import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Records from '../components/View_records';
function donarRecords() {
  return (
    <>
    <Navbar color="linear-gradient(270deg, #7DB9E1 0.29%, rgba(216, 244, 250, 0.37) 98.4%)"/>
    <Records/>
    <Footer/>
    </>
  )
}

export default donarRecords
