import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import axios from 'axios';

const GraphicVertical = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/transactions');
        if (response.status === 200) {
          const transactions = response.data;
          console.log('API den gelen veriler:', transactions);

          // 2024 yılının aylarını içeren veriyi hazırlama
          const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(2024, index).toLocaleString('tr-TR', { month: 'long' }),
            income: 0,
            expense: 0,
          }));

          transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.date);
            if (transactionDate.getFullYear() === 2024) {
              const monthIndex = transactionDate.getMonth();
              if (transaction.type === 'gelir') {
                monthlyData[monthIndex].income += transaction.amount;
              } else if (transaction.type === 'gider') {
                monthlyData[monthIndex].expense += transaction.amount;
              }
            }
          });

          console.log('İşlenen aylık veriler:', monthlyData);
          setData(monthlyData);
        } else {
          console.error('Veriler alınamadı.');
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []);

  return data.length > 0 ? <ColumnChart data={data} /> : <p>Yükleniyor...</p>;
};

const ColumnChart = ({ data }) => {
  const config = {
    data: data.flatMap(item => [
      { type: 'Gelir', month: item.month, value: item.income },
      { type: 'Gider', month: item.month, value: item.expense },
    ]),
    isGroup: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    marginRatio: 0.2,
    color: ['#73d13d', '#ff4d4f'], // Gelir yeşil (#73d13d), gider kırmızı (#ff4d4f)
    label: {
      position: 'top',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };

  return <Column {...config} />;
};

export default GraphicVertical;
