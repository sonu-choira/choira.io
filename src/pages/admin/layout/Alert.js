import Swal from 'sweetalert2';

export const errorAlert = (msg,title,showConfirmButton,timer) => {
  Swal.fire({
    icon: "error",
    title: title ?  title :"Oops...",
    text: msg ? msg : "Something went wrong!",
    showConfirmButton: showConfirmButton || false,
    timer: timer || 1500,

  });
};
export const sucessAlret = (msg, text, showConfirmButton,timer) => {

  Swal.fire({
    icon: "success",
    

    title: msg ? msg : "success",
    text : text ? text : "",
    showConfirmButton: showConfirmButton || false,
    timer: timer || 1500,

  });
};