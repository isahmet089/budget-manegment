import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Kullanıcı adını local storage'dan al
    const storedUser = localStorage.getItem('posUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username);
    }

    // Bildirimleri local storage'dan al veya varsayılan bildirimleri ayarla
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Varsayılan bildirimler
      const defaultNotifications = [
        { id: 1, text: 'Hoş geldiniz! Bütçe yönetim sistemine giriş yaptınız.' },
        { id: 2, text: 'Bugün gelirlerinizi kontrol ettiniz mi?' },
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem('notifications', JSON.stringify(defaultNotifications));
    }
  }, []);

  const content = (
    <div className="notification-content">
      {notifications.map(notification => (
        <div key={notification.id} className="notification-item">
          <p>{notification.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="profile fixed top-0 left-0 right-0 flex justify-between items-center p-4 text-white shadow-md z-50 bg-[#001529]">
      <div className='logo ml-5 text-2xl font-bold'>
        <Link to="/">BÜTÇE-YÖNETİMİ</Link>
      </div>
      <div className=' flex items-center'>
        <Popover placement="bottom" title="Bildirimler" content={content} trigger="hover">
          <Badge count={notifications.length}>
          <Avatar className="bg-blue-500" icon={<UserOutlined />} />
          </Badge>
        </Popover>
        <div className='name'>
          
          <span className="ml-2">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
