import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// ----- API METHODS -----
const authAPI = {
  login: (data) => axios.post('/login', data),       // proxy to backend /api/auth/login
  register: (data) => axios.post('/register', data), // proxy to backend /api/auth/register
  getProfile: () => axios.get('/profile', {          // proxy to backend /api/auth/profile
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }),
};

// ----- INITIAL STATE -----
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
};

// ----- REDUCER -----
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { user: null, token: null, loading: false };
    default:
      return state;
  }
};

// ----- CONTEXT -----
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user profile if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.getProfile()
        .then((response) => {
          dispatch({ type: 'SET_USER', payload: { user: response.data.user, token } });
        })
        .catch(() => {
          localStorage.removeItem('token');
          dispatch({ type: 'LOGOUT' });
        });
    }
  }, []);

  // ----- LOGIN -----
  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authAPI.login({ email, password });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type: 'SET_USER', payload: { user, token } });
      toast.success('Login successful!');
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // ----- REGISTER -----
  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authAPI.register(userData);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type: 'SET_USER', payload: { user, token } });
      toast.success('Registration successful!');
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // ----- LOGOUT -----
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  // ----- UPDATE USER -----
  const updateUser = (user) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ----- CUSTOM HOOK -----
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
