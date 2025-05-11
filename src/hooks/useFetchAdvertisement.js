import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useFetchAdvertisement = ({ category, location, bedroom, bathroom }) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      setLoading(true);
      const url = `/advertisements/?category=${category}&location=${location}&bedroom=${bedroom}&bathroom=${bathroom}`;
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
  }, [category, location, bedroom, bathroom]);

  return { advertisements, loading };
};

export default useFetchAdvertisement;
