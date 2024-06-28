import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

const CalendarComp = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/transactions'); // API endpointinizi güncelleyin
      if (!response.ok) {
        throw new Error('Veriler alınamadı');
      }
      const data = await response.json();
      const formattedEvents = data.map(transaction => ({
        title: `${transaction.type === 'gelir' ? 'Gelir' : 'Gider'}: ${transaction.amount}₺`,
        start: moment(transaction.date).format('YYYY-MM-DD'),
        description: transaction.description,
        color: transaction.type === 'gelir' ? 'green' : 'red'
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Veriler alınırken hata oluştu:', error);
      // Hata durumunu işleyin (ör. hata mesajı gösterin)
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        eventClick={(info) => {
          alert(`${info.event.title}\n${info.event.extendedProps.description}`);
        }}
      />
    </div>
  );
};

export default CalendarComp;
