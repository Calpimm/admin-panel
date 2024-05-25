import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ManagePlayerModal({ isOpen, onRequestClose, player, deletePlayer }) {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <DialogTitle>Manage Player</DialogTitle>
      <DialogContent>
        <p>Player ID: {player.playerId}</p>
        <p>Username: {player.username}</p>
        <p>Email: {player.email}</p>
        <p>Score: {player.score}</p>
        <p>Verified: {player.verified ? 'Yes' : 'No'}</p>
        <p>Palyer Account Date: {player.createdAt}</p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => deletePlayer(player.playerId)}
          variant="contained"
          color="secondary"
        >
          Delete Player
        </Button>
        <Button onClick={onRequestClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManagePlayerModal;
