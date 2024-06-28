import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Card, Col, Row } from 'antd';
import CamesCard from '../../components/camesCard/CamesCard';
import GraphicVertical from '../../components/graphic/GraphicVertical';
import GraphicPie from '../../components/graphic/GraphicPie';
import ReportTable from '../../components/reportTable.jsx/ReportTable';
import Footer from '../../components/footer/Footer';

export const ReportPage = () => {
  return (
    <>
    <Sidebar/>
    <div className='main-navbar'>
        <Navbar/>
    </div>
    <div className='main-content'>
        <div className='cards'>
        <CamesCard/>
        </div>
    <div className='graphic mt-8'>
      <Row gutter={16}>
      
        <Col span={12}>
        <div className='text-center font-bold text-3xl'><span>Gelir Gider Tablosu</span></div>
        <Card className='mt-5'><GraphicVertical/></Card> 
        </Col>
        <Col span={12}>
        <div className='text-center font-bold text-3xl'><span>Katagori Gelir Gider</span></div>
        <Card className='mt-5' ><GraphicPie/></Card> 
        </Col>
      </Row>  
    </div>
      <div className='table-data mt-10 text-center'>
        <span className='text-center text-3xl font-bold'> Raporlar</span>
        <ReportTable className="mt-10"/>
      </div>
    </div>
    <div className='footer flex justify-center mt-20 bg-[#919497] text-white'>
      <Footer/>
      </div>
    </>
    
  )
}
export default ReportPage;