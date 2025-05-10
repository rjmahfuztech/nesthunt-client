import { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    authApiClient
      .get("/favourites/")
      .then((res) => setFavorites(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(favorites);
  return (
    <div>
      <div className="p-4 shadow md bg-white rounded-lg">
        <h1>this is favorite</h1>
      </div>
    </div>
  );
};

export default Favorites;
