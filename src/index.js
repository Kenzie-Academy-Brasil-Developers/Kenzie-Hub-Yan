import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Global from './styles/global'
import RoutesMain from './routes/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Global />
            <RoutesMain />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
