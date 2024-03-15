import React from 'react';
import { toast } from 'react-toastify';

const ConfirmationToast = ({ message, onConfirm }) => {
  const confirmAction = () => {
    toast.dismiss();
    onConfirm();
  };

  return (
    <div>
      <div>{message}</div>
      <button onClick={confirmAction}>Confirm</button>
    </div>
  );
};

export default ConfirmationToast;
