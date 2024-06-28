// UpdateData.jsx
import React, { useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, message } from 'antd';
import moment from 'moment';

const UpdateData = ({ transaction, onUpdate, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const response = await fetch(`http://localhost:5002/api/transactions/${transaction._id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          ...values,
          date: values.date.format('YYYY-MM-DD')
        })
      });
      if (response.ok) {
        message.success('İşlem başarıyla güncellendi.');
        onUpdate();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'İşlem güncellenirken bir hata oluştu.');
      }
    } catch (error) {
      message.error('İşlem güncellenirken bir hata oluştu.');
      console.error('Error updating transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Veri Güncelle"
      visible={!!transaction}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          İptal
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} loading={loading}>
          Kaydet
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{
          amount: transaction?.amount,
          description: transaction?.description,
          date: moment(transaction?.date),
        }}
        layout="vertical"
      >
        <Form.Item name="amount" label="Miktar" rules={[{ required: true, message: 'Lütfen miktar girin!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Açıklama" rules={[{ required: true, message: 'Lütfen açıklama girin!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Tarih" rules={[{ required: true, message: 'Lütfen tarih seçin!' }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateData;
