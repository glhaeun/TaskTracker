import { ToastContainer, toast } from "react-toastify";

export const handleToast = (title) => {
    const message = `Successfully ${title}`; // Customize the message using the title
  
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  