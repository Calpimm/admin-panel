import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Table, TableHead, TableRow, TableCell, TableBody, Button, Tooltip } from '@mui/material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import ManageModeratorModal from './ManageModeratorModal';
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

const ModeratorsTable = () => {
  const [moderators, setModerators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModerator, setSelectedModerator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchModerators();
  }, []);

  const fetchModerators = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/moderators`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });
      const data = await response.json();

      if (response.ok) {
        setModerators(data || []);
      } else {
        toast.error('Error fetching moderators:', data.message);
      }
    } catch (error) {
      toast.error('Fetch error:', error);
    }
  };

  const deleteModerator = async (moderatorId) => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/moderators/${moderatorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully deleted. ✅');
        fetchModerators();
        closeModal();
      } else {
        toast.error('Error deleting moderator:', data.message);
      }
    } catch (error) {
      toast.error('Delete fetch error:', error);
    }
  };

  const banModerator = async (moderatorId, duration, reason) => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ban-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify({ userId: moderatorId, userType: 'moderator', banDuration: duration, reason })
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Moderator banned successfully. ✅');
        fetchModerators();
        closeModal();
      } else {
        toast.error('Error banning moderator:', data.message);
      }
    } catch (error) {
      toast.error('Ban error:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const openModal = (moderator) => {
    setSelectedModerator(moderator);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModerator(null);
  };

  const filteredModerators = moderators.filter(moderator =>
    moderator.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold mb-4"
      >
        Moderators
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4"
      >
        <TextField
          fullWidth
          label="Search moderators"
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
              <TableCell>Moderator ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Banned Until</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredModerators.length > 0 ? (
              filteredModerators.map(moderator => (
                <TableRow key={moderator._id}>
                  <TableCell>{moderator._id}</TableCell>
                  <TableCell>{moderator.username}</TableCell>
                  <TableCell>{moderator.role}</TableCell>
                  <StyledTableCell className={moderator.bannedUntil ? 'banned' : ''}>
                    {moderator.bannedUntil ? new Date(moderator.bannedUntil).toLocaleString() : 'Not banned'}
                  </StyledTableCell>
                  <TableCell>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => openModal(moderator)}
                      component={motion.div}
                      whileHover={{ scale: 1.1 }}
                    >
                      Manage
                      <Exclamation>
                        ⚠️
                      </Exclamation>
                    </StyledButton>
                    {moderator.bannedUntil && (
                      <Tooltip title="Banned">
                        <BlockIcon color="error" style={{ marginLeft: '10px' }} />
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No moderators found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
      <ManageModeratorModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        moderator={selectedModerator}
        deleteModerator={deleteModerator}
        banModerator={banModerator}
      />
    </>
  );
};

export default ModeratorsTable;
