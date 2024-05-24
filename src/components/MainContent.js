import React, { useEffect, useState } from 'react';
import ManagePlayerModal from './ManagePlayerModal';
import { motion } from 'framer-motion';
import { Container, TextField, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import styled from 'styled-components';
import MailService from './MailService';
import ApiKeySection from './ApiKeySection'; // Yeni bileşeni import edin

const StyledButton = styled(Button)`
  position: relative;
  &:hover {
    background-color: #d32f2f !important;
    color: white !important;
  }
`;

const Exclamation = styled(motion.span)`
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1.5rem;
  color: white;
  opacity: 1;
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

const MainContent = ({ section, getApiKey, apiKey }) => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (section === 'players') {
      fetchPlayers();
    }
  }, [section]);

  const fetchPlayers = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/players`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });
      const data = await response.json();

      if (response.ok) {
        setPlayers(data || []);
      } else {
        console.error('Error fetching players:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const deletePlayer = async (playerId) => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/players/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });
      const data = await response.json();

      if (response.ok) {
        fetchPlayers();
        closeModal();
      } else {
        console.error('Error deleting player:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Delete fetch error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  const filteredPlayers = players.filter(player =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container style={{ marginTop: '80px' }}>
      {section === 'players' && (
        <>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold mb-4"
          >
            Players
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <TextField
              fullWidth
              label="Search players"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              className="mb-4"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Player ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map(player => (
                    <TableRow key={player.playerId}>
                      <TableCell>{player.playerId}</TableCell>
                      <TableCell>{player.username}</TableCell>
                      <TableCell>{player.email}</TableCell>
                      <TableCell>{player.score}</TableCell>
                      <TableCell>{player.verified ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <StyledButton
                          variant="contained"
                          color="primary"
                          onClick={() => openModal(player)}
                          component={motion.div}
                          whileHover={{ scale: 1.1 }}
                        >
                          Manage
                          <Exclamation>
                            ⚠️
                          </Exclamation>
                        </StyledButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No players found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>
          <ManagePlayerModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            player={selectedPlayer}
            deletePlayer={deletePlayer}
          />
        </>
      )}
      {section === 'apikey' && (
        <ApiKeySection getApiKey={getApiKey} apiKey={apiKey} /> // Yeni bileşeni burada kullanın
      )}
      {section === 'mailservice' && <MailService />}
    </Container>
  );
};

export default MainContent;
