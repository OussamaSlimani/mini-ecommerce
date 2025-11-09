import { useEffect } from "react";

const toastColors = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

const ShowToast = ({ type = "success", message = "", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 ${toastColors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`}
    >
      {message}
    </div>
  );
};

export default ShowToast;
