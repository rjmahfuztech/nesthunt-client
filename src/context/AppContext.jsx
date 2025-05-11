import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [filter, setFilter] = useState(null);
  const { register, handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFilter(data);
    // navigate to rentals page
    navigate("/rentals");
  };

  const allContext = {
    filter,
    register,
    handleSubmit,
    onSubmit,
    control,
  };

  return (
    <AppContext.Provider value={allContext}>{children}</AppContext.Provider>
  );
};

export default AppContext;
