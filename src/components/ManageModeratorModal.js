import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

function ManageModeratorModal({ isOpen, onRequestClose, moderator, deleteModerator, banModerator }) {
  const [banDuration, setBanDuration] = useState('');
  const [reason, setReason] = useState('');

  const handleBan = () => {
    if (!banDuration || !reason) {
      toast.error("Please enter both ban duration and reason.");
      return;
    }
    banModerator(moderator._id, banDuration, reason);
  };

  if (!isOpen) {
    return null;
  }

  const banUntil = moderator.bannedUntil ? new Date(moderator.bannedUntil).toLocaleString() : 'Not banned';

  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <DialogTitle>Manage Moderator</DialogTitle>
      <DialogContent>
        <p>Moderator ID: {moderator._id}</p>
        <p>Username: {moderator.username}</p>
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
          onClick={() => deleteModerator(moderator._id)}
          variant="contained"
          color="secondary"
        >
          Delete Moderator
        </Button>
        <Button
          onClick={handleBan}
          variant="contained"
          color="primary"
        >
          Ban Moderator
        </Button>
        <Button onClick={onRequestClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManageModeratorModal;
