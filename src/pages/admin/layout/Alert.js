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

export const confirmAlret = (text, title, confirmButtonText) => {
  return Swal.fire({
    text: text || "You won't be able to revert this!",
    title: title || "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText || "Yes, do it!"
  });
}

export const infoAlert = (msg,title,showConfirmButton,timer) => {
  Swal.fire({
    icon: "info",
    title: title ?  title :"Oops...",
    text: msg ? msg : "Something went wrong!",
    showConfirmButton: showConfirmButton || false,
    timer: timer || 1500,

  });
};