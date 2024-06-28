import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Input, message, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import { Line } from '@ant-design/charts';
import UpdateData from '../updateData/UpdateData';
import MailSubmit from '../mailSubmit/MailSubmit';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ReportTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState(null); // Tarih filtresi için state

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      message.error('Veriler alınırken bir hata oluştu.');
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDelete = async (key) => {
    try {
      const response = await fetch(`http://localhost:5002/api/transactions/${key}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        message.success('İşlem başarıyla silindi.');
        fetchTransactions();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'İşlem silinirken bir hata oluştu.');
      }
    } catch (error) {
      message.error('İşlem silinirken bir hata oluştu.');
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdate = () => {
    fetchTransactions();
    setEditingTransaction(null);
  };

  const handleSendEmail = (email) => {
    console.log(`E-posta gönderilecek adres: ${email}`);
    message.success(`E-posta başarıyla gönderildi: ${email}`);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(filterText.toLowerCase()) &&
    (!filterType || transaction.type.toLowerCase() === filterType.toLowerCase()) &&
    (!filterDate || moment(transaction.date).isSame(filterDate, 'day')) // Tarih filtresi kontrolü
  );

  const columns = [
    { title: 'Tarih', dataIndex: 'date', key: 'date', render: (text) => moment(text).format('YYYY-MM-DD') },
    {
      title: 'Tür', dataIndex: 'type', key: 'type', render: type => (
        <Tag color={type === 'gelir' ? 'green' : 'volcano'}>
          {type === 'gelir' ? 'Gelir' : 'Gider'}
        </Tag>
      )
    },
    { title: 'Miktar', dataIndex: 'amount', key: 'amount', render: amount => `${amount}₺` },
    { title: 'Açıklama', dataIndex: 'description', key: 'description' },
    {
      title: 'İşlem', key: 'action', render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Güncelle</Button>
          <Button onClick={() => handleDelete(record._id)} danger>Sil</Button>
          <MailSubmit onSend={handleSendEmail} />
        </Space>
      )
    }
  ];

  const lineChartData = transactions.map(transaction => ({
    date: moment(transaction.date).format('YYYY-MM-DD'),
    amount: transaction.amount,
    type: transaction.type
  }));

  const lineConfig = {
    data: lineChartData,
    xField: 'date',
    yField: 'amount',
    seriesField: 'type',
    height: 400,
    color: ({ type }) => (type === 'gider' ? 'red' : 'green'),
  };

  return (
    <div>
      <Input
        placeholder="Ara..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      
      />    
      <Select
        placeholder="Tür Seçin"
        style={{ width: 120, marginRight: 10 }}
        onChange={(value) => setFilterType(value)}
        value={filterType}
      >
        <Option value="">Hepsi</Option>
        <Option value="gelir">Gelir</Option>
        <Option value="gider">Gider</Option>
      </Select> 
      <RangePicker className='m-5'
        onChange={(dates) => {
          if (dates) {
            setFilterDate(dates[0]);
          } else {
            setFilterDate(null);
          }
        }}
        style={{ marginBottom: 20 }}
      />
      <MailSubmit/>
      <Table columns={columns} dataSource={filteredTransactions} rowKey="_id" />
      <Line {...lineConfig} />

      <UpdateData
        transaction={editingTransaction}
        onUpdate={handleUpdate}
        onCancel={() => setEditingTransaction(null)}
      />
    </div>
  );
};

export default ReportTable;
