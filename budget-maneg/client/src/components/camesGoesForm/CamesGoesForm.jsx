import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Select, message } from 'antd';
import axios from 'axios';

const CamesGoesForm = ({ onFinish }) => {
  const { Option } = Select;
  const gelirKategorileri = ['Gelir', 'Gider'];
  const [form] = Form.useForm(); // Form'un referansını al

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5002/api/transactions', {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        type: values.type.toLowerCase() // Type değerini küçük harfe çeviriyoruz
      });

      if (response.status === 201) {
        message.success('Gelir-Gider kaydedildi.');
        form.resetFields(); // Formu sıfırla
        onFinish();
      } else {
        message.error('Bir hata oluştu, lütfen tekrar deneyin.');
      }
    } catch (error) {
    
      console.error('Error:', error);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} className="gelir-form" form={form}>
      <Form.Item
        label="Tarih"
        name="date"
        rules={[{ required: true, message: 'Lütfen tarihi seçin!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Kategori"
        name="type"
        rules={[{ required: true, message: 'Lütfen kategoriyi seçin!' }]}
      >
        <Select placeholder="Kategori seçin">
          {gelirKategorileri.map((kategori) => (
            <Option key={kategori} value={kategori.toLowerCase()}>
              {kategori}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Miktar"
        name="amount"
        rules={[{ required: true, message: 'Lütfen miktarı girin!' }]}
      >
        <InputNumber style={{ width: '100%' }} min={0} placeholder="Miktar girin" />
      </Form.Item>

      <Form.Item label="Açıklama" name="description">
        <Input.TextArea placeholder="Açıklama girin" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Gelir Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CamesGoesForm;
