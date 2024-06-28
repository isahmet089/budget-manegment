import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/reset.css'; // Ant Design CSS dosyasını içe aktarın
import './index.css'; // Kendi stil dosyanızı da içe aktarabilirsiniz

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
