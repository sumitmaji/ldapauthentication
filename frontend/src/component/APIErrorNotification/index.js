import * as React from "react";
import useAPIError from "../../common/hooks/useAPIError";
import Modal from '@mui/material/Modal';
import Alert from "@mui/material/Alert";

export default function APIErrorNotification() {
  const { error, removeError } = useAPIError();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    removeError();
  };

  return (
    <>
      {error && error.message && (
        <Modal
          hideBackdrop
          open={true}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Alert onClose={handleSubmit} severity="error">
            <p>({error.message})</p>
          </Alert>
        </Modal>
      )}
    </>
  );
}
