import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import CamesCard from '../../components/camesCard/CamesCard';
import ReportTable from '../../components/reportTable.jsx/ReportTable';
import CalendarComp from '../../components/calendarComp/CalendarComp';
import Footer from '../../components/footer/Footer';







const HomePage = () => {
  
  return (
   
    <>
    <Sidebar/>
      <div className='main-navbar'>
      <Navbar />  
      </div>
     <div className='main-content'>
    
    <div className='cards mt-2'>
    <CamesCard/>  
  </div>
  <div className='graphic mt-5'>
      <CalendarComp/>
     </div>
      <div className='data-table mt-10'>
        <ReportTable/>
      </div>
      
      </div>
      <div className='footer flex justify-center mt-20 bg-[#919497] text-white'>
      <Footer/>
      </div>
      
      </>
   
  );
};

export default HomePage;
