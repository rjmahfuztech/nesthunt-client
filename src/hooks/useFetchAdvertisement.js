import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useFetchAdvertisement = ({
  category,
  searchQuery,
  bathroom,
  bedroom,
  minAmount,
  maxAmount,
  currentPage,
}) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      setLoading(true);
      const url = `/advertisements/?page=${currentPage}&category_id=${category}&search=${searchQuery}&bedroom=${bedroom}&bathroom=${bathroom}&rental_amount__gt=${minAmount}&rental_amount__lt=${maxAmount}`;
      try {
        const response = await apiClient.get(url);
        const data = await response.data;
        setAdvertisements(data.results);
        if (data.results.length === 10)
          setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, [
    currentPage,
    category,
    searchQuery,
    bathroom,
    bedroom,
    minAmount,
    maxAmount,
  ]);

  return { advertisements, loading, totalPages };
};

export default useFetchAdvertisement;
