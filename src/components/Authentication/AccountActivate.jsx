import React, { useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useNavigate, useParams } from "react-router";
import { handleApiError } from "../Messages/Alert";
import Swal from "sweetalert2";

const AccountActivate = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      apiClient.post("/auth/users/activation/", { uid, token });
      // success message and redirect to login
      Swal.fire({
        title: "Account Activated",
        text: "Your account has been successfully activated",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonText: "Login now",
        customClass: {
          confirmButton:
            "bg-black text-white hover:bg-gray-800 transition-colors px-4 py-2 rounded-md",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
    } catch (error) {
      handleApiError(
        error,
        "Something went wrong. Please check your activation link."
      );
    }
  }, []);
  return (
    <div className="p-4 rounded-lg bg-green-300 text-green-600 my-14">
      <h1 className="text-center text-3xl">Account activated.</h1>
      <h1 className="text-center text-2xl">
        Your account has been successfully activated.
      </h1>
    </div>
  );
};

export default AccountActivate;
