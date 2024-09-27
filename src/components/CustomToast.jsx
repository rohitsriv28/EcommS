import toast from "react-hot-toast";

export const ShowToast = (type, message) => {
  return toast[type](message, {
    style: {
      border: "1px solid #000",
      backgroundColor: "#FFF",
      padding: "12px",
      color: "#000",
      fontSize: "14px",
    },
    iconTheme: {
      primary: "#000",
      secondary: "#FFF",
    },
    duration: 3000,
  });
};
