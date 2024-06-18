import Swal from 'sweetalert2';

export const errorAlert = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg ? msg : "Something went wrong!",
    showConfirmButton: false,
    timer: 1500,

  });
};
export const sucessAlret = (msg) => {

  Swal.fire({
    icon: "success",
    title: msg ? msg : "success",
    showConfirmButton: false,
    timer: 1500,
    showConfirmButton: false,

  });
};