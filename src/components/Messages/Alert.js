import Swal from "sweetalert2";
import "./Alert.css";
// Toast alert
export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

// Handle API Error
export const handleApiError = (
  error,
  defaultMessage = "Something Went Wrong, try again!"
) => {
  let ifError = "";
  if (error.response && error.response.data) {
    const errorMessage = Object.values(error.response.data).flat().join("\n");
    ifError = errorMessage;
  } else {
    error ? (ifError = error) : (ifError = defaultMessage);
  }
  if (ifError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${ifError}`,
    });
  }
};

// Show success message
export const handleSuccessMessage = (title, message) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
  });
};

// Show success message
export const handleWarningMessage = (title, message) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: message,
  });
};
