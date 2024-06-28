import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import CalendarComp from '../../components/calendarComp/CalendarComp';
import Footer from '../../components/footer/Footer';

export const CalendarPage = () => {
  return (
    <>
        <Sidebar/>
        <div className='main-navbar'>
            <Navbar/>
        </div>
        <div className='main-content'>
          <CalendarComp></CalendarComp>
        </div>
        <div className='footer flex justify-center mt-20 bg-[#919497] text-white'>
      <Footer/>
      </div>
    </>
  )
}
export default CalendarPage;
