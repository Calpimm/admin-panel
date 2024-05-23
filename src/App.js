import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/login';
import './index.css'; // Import the CSS file

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
