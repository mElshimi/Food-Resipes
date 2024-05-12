import { createContext } from "react";
// import { toast } from "react-toastify";
export let ToastContext = createContext(0);

export default function ToastContextProvider(props) {
  let getToastValue = (type, message) => {
    return toast[type](message, {
      closeOnClick: true,
      position: "top-center",
      pauseOnHover: true,
      autoClose: 2000,
    });
  };
  return (
    <ToastContext.Provider value={{ getToastValue }}>
      {props.children}
    </ToastContext.Provider>
  );
}
