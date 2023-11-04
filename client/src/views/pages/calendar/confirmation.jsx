import React, { useState } from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  const [open, setOpen] = useState(true);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setOpen(false);
  };

  return (
    open && (
      <div className="confirmation-modal">
        <div className="modal-content">
          <p>{message}</p>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
