import React, { useEffect } from "react";

const Toast = ({
  open,
  handleClose,
  message,
}: {
  open: boolean;
  handleClose: () => void;
  message: string;
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(handleClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 transform  z-50 w-full max-w-sm">
      <div
        className={`flex items-center justify-between p-4 rounded shadow bg-green-500 text-white`}
      >
        <span>{message}.</span>
        <button
          type="button"
          className="p-2 hover:text-gray-300"
          aria-label="close"
          onClick={handleClose}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
