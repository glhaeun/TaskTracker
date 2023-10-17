import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import authUtils from '../utils/authUtils';
import { setUser } from '../redux/features/userSlice';

const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        return <Navigate to="/login" />;
      } else {
        dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  return element;
};

export default ProtectedRoute;
