import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './ProfilePage.css';

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Footer from '../../components/footer/Footer';

export const ProfilePage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form Values: ', values);
    message.success('Profil bilgileriniz güncellendi!');
  };

  return (
    <>     
    <Sidebar/>
        <div className='main-navbar'>
            <Navbar/>
        </div>
        <div className='main-content'>
        <div className="profil-sekmesi " style={{ maxWidth: '600px', padding: '20px', }}>
      <h1 className=''>Profil Bilgileri</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          firstName: 'Ahmet',
          lastName: 'Özcan',
          email: 'ahmet.ozcan@example.com',
          password: '********'
        }}
      >
        <Form.Item
          label="Ad"
          name="firstName"
          rules={[{ required: true, message: 'Lütfen adınızı girin!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Ad" />
        </Form.Item>

        <Form.Item
          label="Soyad"
          name="lastName"
          rules={[{ required: true, message: 'Lütfen soyadınızı girin!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Soyad" />
        </Form.Item>

        <Form.Item
          label="E-posta"
          name="email"
          rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-posta" />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Kaydet</Button>
        </Form.Item>
      </Form>
    </div>
        </div>
        <div className='footer flex justify-center mt-80 bg-[#919497] text-white '>
      <Footer/>
      </div>
    </>
  )
}
export default ProfilePage;
