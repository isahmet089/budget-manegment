import React, { useEffect, useState } from 'react';
import { Card, Col, Row, message } from 'antd';
import { DollarCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, StarOutlined } from '@ant-design/icons';
import "./CamesCard.css"

const CamesCard = () => {
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpense: 0, netTotal: 0 });
  const [evaluation, setEvaluation] = useState('');

  const fetchTransactionsAndCalculateTotals = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/transactions');
      if (response.ok) {
        const transactions = await response.json();
        const totalIncome = transactions
          .filter(transaction => transaction.type === 'gelir')
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalExpense = transactions
          .filter(transaction => transaction.type === 'gider')
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        const netTotal = totalIncome - totalExpense;

        setTotals({ totalIncome, totalExpense, netTotal });

        evaluateNetStatus(netTotal);
      } else {
        message.error('İşlemler alınırken bir hata oluştu.');
      }
    } catch (error) {
      message.error('İşlemler alınırken bir hata oluştu.');
      console.error('Error:', error);
    }
  };

  const evaluateNetStatus = (netTotal) => {
    if (netTotal > 1000) {
      setEvaluation('Çok İyi');
    } else if (netTotal > 0) {
      setEvaluation('İyi');
    } else if (netTotal > -500) {
      setEvaluation('Kötü');
    } else {
      setEvaluation('Çok Kötü');
    }
  };

  useEffect(() => {
    fetchTransactionsAndCalculateTotals();
  },);

  return (
    <div className="totals-container">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Toplam Gelir" bordered={false} className="income-card">
            <DollarCircleOutlined style={{ fontSize: '24px', color: '#4caf50' }} />
            <span className="text-4xl font-bold">{totals.totalIncome}₺</span>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Toplam Gider" bordered={false} className="expense-card">
            <ArrowDownOutlined style={{ fontSize: '24px', color: '#f44336' }} />
            <span className="text-4xl font-bold">{totals.totalExpense}₺</span>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Net Toplam" bordered={false} className="net-total-card">
            <StarOutlined style={{ fontSize: '24px', color: '#2196f3' }} />
            <span className="text-4xl font-bold">{totals.netTotal}₺</span>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Durum Değerlendirmesi" bordered={false} className="evaluation-card">
          <ArrowUpOutlined style={{ fontSize: '24px', color: '#2196f3' }} />
            <span className="evaluation-text text-4xl">{evaluation}</span>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CamesCard;
