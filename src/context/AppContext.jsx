import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [filter, setFilter] = useState(null);
  const { register, handleSubmit, control } = useForm();
  const [rentPrice, setRentPrice] = useState([null, null]);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const dataWithRentAmount = {
      ...data,
      minAmount: rentPrice[0] == 0 ? null : rentPrice[0],
      maxAmount: rentPrice[1] == 50000 ? null : rentPrice[1],
    };

    setFilter(dataWithRentAmount);
    // navigate to rentals page
    navigate("/rentals");
  };

  const allContext = {
    filter,
    register,
    handleSubmit,
    onSubmit,
    control,
    setRentPrice,
  };

  return (
    <AppContext.Provider value={allContext}>{children}</AppContext.Provider>
  );
};

export default AppContext;
