import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Card, Col, Row } from 'antd';
import CamesCard from '../../components/camesCard/CamesCard';

import ReportTable from '../../components/reportTable.jsx/ReportTable';
import CamesGoesForm from '../../components/camesGoesForm/CamesGoesForm';
import GraphicPie from '../../components/graphic/GraphicPie';
import Footer from '../../components/footer/Footer';

export const ComesGoesPage = () => {
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
           <div className='form mt-6'>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <CamesGoesForm/>
                </Card>
              </Col>
              <Col span={12}>
              <GraphicPie/>
                </Col>
            </Row>
           </div>
           <div className='data-table mt-5'>
        <ReportTable/>
      </div>
        </div>
        <div className='footer flex justify-center mt-20 bg-[#919497] text-white'>
      <Footer/>
      </div>
    </>
  )
}
export default ComesGoesPage;