import React, { useState } from 'react';
import { Card, Modal, Input, Button, message } from 'antd';
import axios from 'axios';

const Gider = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseValue, setExpenseValue] = useState('');
  const [description, setDescription] = useState('Aylık Net Gider');

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/transactions', {
        amount: expenseValue,
        type: 'gider', // 'gider' olarak sabit olarak gönderiliyor
        date: new Date().toISOString().slice(0, 10),
        description: description // Açıklama alanı eklendi
      });

      if (response.status === 201) {
        message.success('Aylık net gider kaydedildi.');
        setExpenseValue(''); // Formu sıfırla
        setDescription('Aylık Net Gider'); // Açıklama alanını sıfırla
        setModalVisible(false); // Modali kapat
      } else {
        message.error('Bir hata oluştu, lütfen tekrar deneyin. (HTTP Durumu: ' + response.status + ')');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data); // Sunucu tarafından dönen hata mesajı
        message.error('Sunucu hatası: ' + error.response.data.message); // Hatanın kullanıcıya gösterilmesi
      } else if (error.request) {
        console.error('No Response:', error.request);
        message.error('Sunucuya ulaşılamıyor, lütfen bağlantınızı kontrol edin.');
      } else {
        console.error('Error:', error.message);
        message.error('Bir hata oluştu, lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <Card
      title="Aylık Net Gider Ekle"
      style={{ width: 300 }}
      onClick={() => setModalVisible(true)}
    >
      {expenseValue ? (
        <p>Mevcut Gider: {expenseValue}</p>
      ) : (
        <p>Gider yok</p>
      )}
      <Modal
        title="Aylık Net Gider Ekle"
        visible={modalVisible}
        onCancel={() => setModalVisible(true)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(true)}>
            İptal
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Kaydet
          </Button>,
        ]}
      >
        <Input
          type="number"
          placeholder="Miktar girin"
          value={expenseValue}
          onChange={(e) => setExpenseValue(e.target.value)}
        />
        <Input.TextArea
          placeholder="Açıklama girin"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
    </Card>
  );
};

export default Gider;
