import { createContext, useContext } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const showToast = (message, type = "success", duration = 3000) => {
    toaster.create({
      title: message,
      type: type,
      duration: duration,
    });
  };

  const showSuccess = (message, duration = 3000) =>
    showToast(message, "success", duration);
  const showError = (message, duration = 3000) =>
    showToast(message, "error", duration);
  const showInfo = (message, duration = 3000) =>
    showToast(message, "info", duration);
  const showWarning = (message, duration = 3000) =>
    showToast(message, "warning", duration);

  return (
    <ToastContext.Provider
      value={{ showToast, showSuccess, showError, showInfo, showWarning }}
    >
      <Toaster />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
