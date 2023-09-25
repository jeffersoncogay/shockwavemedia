import React, { useEffect } from "react";

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        onClose();
      }, 3000); // Adjust the duration as needed (e.g., 3000ms or 3 seconds)
      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } rounded-lg fixed bottom-3 right-3 w-full p-4 w-auto min-w-[200px] transition-transform transform duration-300 ease-in-out border border-green-500 bg-green-500 bg-opacity-60 text-white`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
