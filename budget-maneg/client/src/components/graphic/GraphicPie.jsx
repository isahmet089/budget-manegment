import { Pie } from '@ant-design/charts';
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
export const GraphicPie = () => {
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpense: 0, netTotal: 0 });
  
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
      } else {
        message.error('İşlemler alınırken bir hata oluştu.');
      }
    } catch (error) {
      message.error('İşlemler alınırken bir hata oluştu.');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTransactionsAndCalculateTotals();
  }, []);
  const config = {
    data: [
      { type: 'Net', value: totals.netTotal },
      { type: 'Gelir', value: totals.totalIncome },
      { type: 'Gider', value: totals.totalExpense },
      { type: 'Gider', value: 18 },
    
    ],
    angleField: 'value',
    colorField: 'type',
    paddingRight: 80,
    label: {
      text: 'value',
      position: 'outside',
    },
    legend: { 
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};
ReactDOM.render(<GraphicPie />, document.getElementById('root'));
export default GraphicPie;