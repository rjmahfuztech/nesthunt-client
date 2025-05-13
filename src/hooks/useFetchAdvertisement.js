import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useFetchAdvertisement = ({
  category,
  searchQuery,
  bathroom,
  bedroom,
  minAmount,
  maxAmount,
}) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      setLoading(true);
      const url = `/advertisements/?category_id=${category}&search=${searchQuery}&bedroom=${bedroom}&bathroom=${bathroom}&rental_amount__gt=${minAmount}&rental_amount__lt=${maxAmount}`;
      try {
        const response = await apiClient.get(url);
        setAdvertisements(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, [category, searchQuery, bathroom, bedroom, minAmount, maxAmount]);

  return { advertisements, loading };
};

export default useFetchAdvertisement;
