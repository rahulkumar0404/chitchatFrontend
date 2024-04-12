import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
const ConfirmDeleteDialog = ({
  open,
  handleClose,
  deleteHandler,
  displayMessage,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>{displayMessage}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>NO</Button>
        <Button color="error" onClick={deleteHandler}>
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
