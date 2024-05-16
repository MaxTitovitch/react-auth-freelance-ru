import { Routes, Route } from 'react-router-dom';
import Index from "../pages/Index/Index";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import EmailConfirmation from "../pages/EmailConfirmation/EmailConfirmation";
import EmailConfirmed from "../pages/EmailConfirmed/EmailConfirmed";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ChangePasswordRequest from "../pages/ChangePasswordRequest/ChangePasswordRequest";

// Компонент - маршрутизатор приложения
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/change-password-request" element={<ChangePasswordRequest />} />
        </Routes>
    );
}

export default Router;
