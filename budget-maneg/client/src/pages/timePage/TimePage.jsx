import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import ReportTable from '../../components/reportTable.jsx/ReportTable';
import GraphicVertical from '../../components/graphic/GraphicVertical';
import Footer from '../../components/footer/Footer';

export const TimePage = () => {
  return (
    <>
    <Sidebar/>
     <div className='main-navbar'>
        <Navbar/>
     </div>
     <div className='main-content'>
      <div className='line'>
        <GraphicVertical/>
      </div>
      <ReportTable/>
     </div>
     <div className='footer flex justify-center mt-20 bg-[#919497] text-white fixed-bot'>
      <Footer/>
      </div>
    </>
  )
}
export default TimePage;
