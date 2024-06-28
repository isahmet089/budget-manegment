import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

const MailSubmit = ({ onSend }) => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleSend = () => {
    if (email.trim() === '') {
      message.error('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    if (onSend) {
      onSend(email);
    }
    setEmail('');
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Rapor Al
      </Button>
      <Modal
        title="Rapor Al"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            İptal
          </Button>,
          <Button key="submit" type="primary" onClick={handleSend}>
            Gönder
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="E-posta Adresi">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MailSubmit;
