import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link to="#" onClick={handleClickOpen}>
        authenticity
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: '100%' }}
      >
        <DialogTitle id="alert-dialog-title">authenticity</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A certificate of authenticity (COA) is a document from an
            authoritative source that verifies the artwork’s authenticity. While
            many COAs are signed by the artist, others will be signed by the
            representing gallery or the printmaker who collaborated with the
            artist on the work. For secondary market works, authorized estates
            or foundations are often the issuing party. COAs typically include
            the name of the artist, the details (title, date, medium,
            dimensions) of the work in question, and whenever possible an image
            of the work.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
