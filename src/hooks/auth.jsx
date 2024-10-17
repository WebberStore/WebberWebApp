import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../store/data/user';
import { getCurrentUser } from '../services';

const protectedRoutes = ['payment', 'payment-confirmation', 'dashboard', 'orders', 'tickets'];

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const checkUser = () => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (!token && protectedRoutes.includes(window.location.pathname.split('/')[1])) {
      navigate('/login');
    }
    if (token) {
      getCurrentUser().then(res=>{
        dispatch(setAuthUser(res));
      })
    }
  };

  useEffect(() => {
    checkUser();
  }, [location]);
};

export default useAuth;
