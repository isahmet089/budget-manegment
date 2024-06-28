import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, CalendarOutlined, FileTextOutlined, FormOutlined, LogoutOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import './Sidebar.css';
const Sidebar = () => {
  return (
    <div className="sidebar">
   
      <Menu className='mt-20' mode="inline" theme="dark" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          <Link to="/">Anasayfa</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FileTextOutlined />}>
          <Link to="/addPage">Gelir ve Giderler</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FormOutlined />}> 
          <Link to="/time">Zaman Çizelgesi</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<TableOutlined />}>  
          <Link to="/reports">Raporlar</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<CalendarOutlined/>}>
          <Link to="/calendar">Takvim</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<UserOutlined />}>
          <Link to="/profile">Profil</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<LogoutOutlined />}>
          <Link to="/Login">Çıkış</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
