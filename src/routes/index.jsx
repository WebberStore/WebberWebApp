import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks';
import { Home, Login, Register, Verify, ForgotPassword, ResetPassword, Users, Contact, Dashboard, Profile, Orders, Tickets, TicketDetail, Cart, ProductForm, ProductDetail, NotFound, Payment, PaymentConfirmation } from '../pages';

const AnimatedRoutes = () => {
  useAuth();

  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
