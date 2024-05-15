import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import AuthLayout from './layouts/AuthLayout/AuthLayout';

// Инициализация приложения, с в т.ч. роутером
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthLayout />
        </BrowserRouter>
    </React.StrictMode>
);