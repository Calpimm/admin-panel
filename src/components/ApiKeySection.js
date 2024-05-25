import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, TextField, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CopyIcon from '@mui/icons-material/FileCopy';
import { toast } from 'react-toastify';

const endpoints = [
  { name: '/players', url: 'https://lamronapi.me/players' },
  { name: '/top-players', url: 'https://lamronapi.me/top-players' },
  { name: '/verify-email', url: 'https://lamronapi.me/verify-email' },
  { name: '/admin/get-api-key', url: 'https://lamronapi.me/admin/get-api-key' }
];

const StyledButton = styled(motion(Button))`
  margin-top: 10px;
  background-color: var(--btn-bg-color) !important;
  color: var(--text-color) !important;
  border: 2px solid white !important;
  &:hover {
    background-color: var(--btn-hover-bg-color) !important;
    box-shadow: 0 0 10px red;
  }
`;

const Exclamation = styled(motion.span)`
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1.5rem;
  color: white;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const SectionHeader = styled(Typography)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ApiKeySection = ({ getApiKey, apiKey }) => {
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [endpointStatuses, setEndpointStatuses] = useState([]);

  useEffect(() => {
    const fetchApiKey = async () => {
      const token = sessionStorage.getItem("adminToken");
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/get-api-key`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        if (response.ok) {
          getApiKey(data.apiKey);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchApiKey();
  }, [getApiKey]);

  const handleGenerateApiKey = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/generate-api-key`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (response.ok) {
        getApiKey(data.apiKey); // API anahtarını yenilemek için parent component'deki fonksiyonu çağırıyoruz
        toast.success('New api key generated');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);

    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess('API key copied to clipboard!');

    setTimeout(() => setCopySuccess(''), 2000); // 2 saniye sonra mesajı sil
  };

  const checkEndpointStatus = async (url) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("adminToken")}`,
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const checkAllEndpoints = async () => {
      const results = await Promise.all(endpoints.map(async (endpoint) => {
        const status = await checkEndpointStatus(endpoint.url);
        return { name: endpoint.name, status };
      }));
      setEndpointStatuses(results);
    };
    if (apiKey) {
      checkAllEndpoints();
    }
  }, [apiKey]);

  return (
    <Container className="mt-20">
      <SectionHeader variant="h5" component="h2" className="text-lg font-bold">
        API Key Management
        <Divider style={{ flexGrow: 1, marginLeft: 16 }} />
      </SectionHeader>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" component="p" className="mb-4">
            You can generate a new API key if needed. Please note that generating a new API key will invalidate the current key.
          </Typography>
          {apiKey && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={handleCopy}
              marginY={10}
              className="bg-light-input dark:bg-dark-input p-2 border border-light-border dark:border-dark-border rounded mt-2 flex items-center text-light-text dark:text-dark-text"
            >
              <TextField
                fullWidth
                label="Your Current API Key"
                variant="outlined"
                value={apiKey}
                InputProps={{
                  readOnly: true,
                }}
              />
              <CopyIcon style={{ cursor: 'pointer', marginLeft: 10 }} />
              {copySuccess && (
                <Typography variant="caption" className="ml-2 text-success">
                  {copySuccess}
                </Typography>
              )}
            </Box>
          )}
          <StyledButton
            onClick={handleGenerateApiKey}
            variant="contained"
            color="primary"
            whileHover={{ scale: 1.1 }}
            disabled={loading}
          >
            Generate New API Key
            <Exclamation>
              ⚠️
            </Exclamation>
          </StyledButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionHeader variant="h6" component="h3" className="text-lg font-bold">
            API Endpoint Status
            <Divider style={{ flexGrow: 1, marginLeft: 16 }} />
          </SectionHeader>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Endpoint</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {endpointStatuses.map(endpoint => (
                  <TableRow key={endpoint.name}>
                    <TableCell>{endpoint.name}</TableCell>
                    <TableCell align="center">
                      {endpoint.status ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircleIcon style={{ color: 'green' }} />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CancelIcon style={{ color: 'red' }} />
                        </motion.div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApiKeySection;
