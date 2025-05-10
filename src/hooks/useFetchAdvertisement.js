import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useFetchAdvertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/advertisements/")
      .then((res) => setAdvertisements(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return { advertisements, loading };
};

export default useFetchAdvertisement;
