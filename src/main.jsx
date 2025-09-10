import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../src/assets/css/tailwind.css'
import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/reset.css';
import "./assets/css/style.css";

import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
