// src/utils/Auth.js
export const isAuthenticated = () => {
    const token = sessionStorage.getItem('adminToken');
    return !!token;
  };
  
  export const requireAuth = (nextState, replace) => {
    if (!isAuthenticated()) {
      replace({ pathname: '/login' });
    }
  };
  