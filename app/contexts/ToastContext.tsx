"use client";
import { createContext, useState } from "react";
import Toast from "../shared/Toast";
export const ToastContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleShow: (message: string) => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleShow = (message: string) => {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };
  return (
    <ToastContext.Provider value={{ handleShow }}>
      <Toast open={open} handleClose={() => setOpen(false)} message={message} />
      {children}
    </ToastContext.Provider>
  );
};
