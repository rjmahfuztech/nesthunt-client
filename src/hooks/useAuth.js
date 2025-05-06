import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

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

  return { loginUser, errorMessage, setErrorMessage, user, loading };
};

export default useAuth;
