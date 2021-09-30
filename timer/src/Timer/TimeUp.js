import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

let TimeUp = ({ open, handleClose }) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Time is up!!</DialogTitle>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default TimeUp;
