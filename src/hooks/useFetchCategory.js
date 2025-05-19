import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useFetchCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return { loading, categories };
};

export default useFetchCategory;
