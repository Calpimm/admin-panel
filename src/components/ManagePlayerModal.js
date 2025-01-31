import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

function ManagePlayerModal({ isOpen, onRequestClose, player, deletePlayer, banPlayer }) {
  const [banDuration, setBanDuration] = useState('');
  const [reason, setReason] = useState('');

  const handleBan = () => {
    if (!banDuration || !reason) {
      toast.error("Please enter both ban duration and reason.");
      return;
    }
    banPlayer(player.playerId, banDuration, reason);
  };

  if (!isOpen) {
    return null;
  }

  const banUntil = player.bannedUntil ? new Date(player.bannedUntil).toLocaleString() : 'Not banned';

  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <DialogTitle>Manage Player</DialogTitle>
      <DialogContent>
        <p>Player ID: {player.playerId}</p>
        <p>Username: {player.username}</p>
        <p>Email: {player.email}</p>
        <p>Score: {player.score}</p>
        <p>Verified: {player.verified ? 'Yes' : 'No'}</p>
        <p>Player Account Date: {player.createdAt}</p>
        <p>Banned Until: {banUntil}</p> {/* Ban bitiş zamanı */}
        <TextField
          label="Ban Duration (minutes)"
          type="number"
          value={banDuration}
          onChange={(e) => setBanDuration(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Reason for Ban"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => deletePlayer(player.playerId)}
          variant="contained"
          color="secondary"
        >
          Delete Player
        </Button>
        <Button
          onClick={handleBan}
          variant="contained"
          color="primary"
        >
          Ban Player
        </Button>
        <Button onClick={onRequestClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManagePlayerModal;
