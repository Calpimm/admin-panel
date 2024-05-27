import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Table, TableHead, TableRow, TableCell, TableBody, Button, Tooltip } from '@mui/material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import ManagePlayerModal from './ManagePlayerModal';
import { Block as BlockIcon } from '@mui/icons-material';

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
  display: none; /* Varsayılan olarak gizli */
  ${StyledButton}:hover & { /* Yalnızca hover durumunda görünür yap */
    display: block;
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const StyledTableCell = styled(TableCell)`
  &.banned {
    color: red;
  }
`;

const PlayersTable = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

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
        toast.error('Error fetching players:', data.message);
      }
    } catch (error) {
      toast.error('Fetch error:', error);
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
        toast.success('Successfully deleted. ✅');
        fetchPlayers();
        closeModal();
      } else {
        toast.error('Error deleting player:', data.message);
      }
    } catch (error) {
      toast.error('Delete fetch error:', error);
    }
  };

  const banPlayer = async (playerId, duration, reason) => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ban-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify({ userId: playerId, userType: 'player', banDuration: duration, reason })
      });
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Player banned successfully. ✅');
        fetchPlayers();
        closeModal();
      } else {
        toast.error('Error banning player:', data.message);
      }
    } catch (error) {
      toast.error('Ban error:', error);
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
              <TableCell>Banned Until</TableCell>
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
                  <StyledTableCell className={player.bannedUntil ? 'banned' : ''}>
                    {player.bannedUntil ? new Date(player.bannedUntil).toLocaleString() : 'Not banned'}
                  </StyledTableCell>
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
                    {player.bannedUntil && (
                      <Tooltip title="Banned">
                        <BlockIcon color="error" />
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
        banPlayer={banPlayer} // Ban fonksiyonunu buraya geçiyoruz
      />
    </>
  );
};

export default PlayersTable;
