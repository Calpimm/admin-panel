import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import backgroundImage from '../assets/images/LoginBack.jpg';
import Preloader from './Preloader';


const Background = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const MotionBox = styled(motion.div)`
  background: rgba(0, 0, 0, 0.6); /* Şeffaf koyu arka plan */
  padding: 40px;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.7); /* Beyaz kenarlık */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px); /* Blur efekti */
  margin: 0 auto; /* Center the box horizontally */
  width: 40%;
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
`;

const LoginContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  .MuiFilledInput-root {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7);
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.7);
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  .MuiFilledInput-underline:before {
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }
  .MuiFilledInput-underline:hover:before {
    border-bottom: 2px solid white;
  }
`;

const DraggableButton = styled(motion(Button))`
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: 2px solid white !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.bannedUntil && new Date(data.bannedUntil) > new Date()) {
          setError('Your account is banned until ' + new Date(data.bannedUntil).toLocaleString());
          setLoading(false);
          return;
        }
        
        sessionStorage.setItem('adminToken', data.token);
        sessionStorage.setItem('role', data.role); // Add user role to session storage
        if (data.role === 'admin') {
          navigate('/');
        } else {
          navigate('/moderator');
        }
        window.location.reload();
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Background />
          <LoginContainer>
            <MotionBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoginForm component="form">
                <Typography variant="h4" component="h1" gutterBottom color="white">
                  Admin Login
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="filled"
                />
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                />
                <Box position="relative" width="100%">
                  <DraggableButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                    drag
                    dragConstraints={{ left: -400, right: 400, top: -350, bottom: 350 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Login
                  </DraggableButton>
                </Box>
              </LoginForm>
            </MotionBox>
          </LoginContainer>
        </>
      )}
    </>
  );
};

export default Login;
