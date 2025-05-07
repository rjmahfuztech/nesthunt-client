import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { handleApiError } from "../components/Messages/Alert";

const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [authTokens, setAuthTokens] = useState(() => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  });

  // Fetch User Profile
  useEffect(() => {
    const userProfile = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("/auth/users/me/", {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        });
        setUser(res.data);
      } catch (error) {
        console.log("user fetch error: ", error.response.data?.detail);
      } finally {
        setLoading(false);
      }
    };
    // getting user profile after successfully login
    if (authTokens) userProfile();
    else {
      setUser(null);
      setLoading(false);
    }
  }, [authTokens]);

  // Login User
  const loginUser = async (userData) => {
    setErrorMessage("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      if (response.status == 200) {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);

        return { success: true };
      }
    } catch (error) {
      setErrorMessage(error.response.data?.detail);
    }
  };
  // Register A User
  const registerUser = async (userData) => {
    setErrorMessage("");
    try {
      const response = await apiClient.post("/auth/users/", userData);
      if (response.status == 201)
        return {
          success: true,
          message:
            "Registration successful. A confirmation mail has been sent! Please check your E-mail.",
        };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = Object.values(error.response.data).flat().join("\n");
        setErrorMessage(errorMsg);
      } else setErrorMessage("Registration Failed! Try again.");
    }
  };

  // Resend account activation email
  const resendActivationEmail = async (email) => {
    try {
      const response = await apiClient.post("/auth/users/resend_activation/", {
        email,
      });
      if (response.status == 204) {
        return {
          success: true,
          message: "Activation E-mail resent. Please check your mail again.",
        };
      }
    } catch (error) {
      setErrorMessage(error.response.data?.detail);
    }
  };

  // Reset Password
  const resetPassword = async (email) => {
    try {
      const response = await apiClient.post(
        "/auth/users/reset_password/",
        email
      );
      if (response.status == 204) {
        return {
          success: true,
          message: "We have sent you a password recovery link to your email",
        };
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Reset Password Confirm
  const resetPasswordConfirm = async (uid, token, new_password) => {
    try {
      const response = await apiClient.post(
        "/auth/users/reset_password_confirm/",
        { uid, token, new_password }
      );
      if (response.status == 204) {
        return {
          success: true,
          message: "Your password has been successfully reseated.",
        };
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return {
    user,
    loading,
    errorMessage,
    setErrorMessage,
    loginUser,
    registerUser,
    resetPassword,
    resetPasswordConfirm,
    resendActivationEmail,
  };
};

export default useAuth;
