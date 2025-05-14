import { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { Link } from "react-router";
import { TrashSolid } from "iconoir-react";
import {
  handleApiError,
  handleDeleteWarning,
  handleSuccessMessage,
} from "../components/Messages/Alert";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/favourites/")
      .then((res) => setFavorites(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // Delete favorite
  const deleteFavorite = (id) => {
    // delete warning
    handleDeleteWarning().then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.delete(`/favourites/${id}/`);
          if (res.status == 204) {
            // update the local state
            setFavorites((prevFavorites) =>
              prevFavorites.filter((item) => item.id !== id)
            );
            // success alert
            handleSuccessMessage(
              "Favorite Deleted",
              "Your Favorite has been successfully deleted."
            );
          }
        } catch (error) {
          handleApiError(error);
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center h-80 items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <>
      {favorites.length === 0 ? (
        <h2 className="text-gray-500 text-lg font-semibold text-center my-20">
          You don't have any favorite saved.
        </h2>
      ) : (
        <div>
          <div className="mb-10">
            <Typography type="h5">My Favorite list</Typography>
            <Typography className="mt-1">
              A list of your favorite advertisements
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="p-4 w-full shadow !bg-white hover:shadow-md rounded-md transition-all flex gap-2 justify-between"
              >
                <Link to={`/rentals/${favorite.advertisement.id}`}>
                  <Tooltip>
                    <Tooltip.Trigger
                      as={IconButton}
                      variant="ghost"
                      color="secondary"
                    >
                      <h1 className="text-lg text-blue-700 hover:text-blue-900 underline transition-colors">
                        {favorite.advertisement.title}
                      </h1>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      Click to see full details
                      <Tooltip.Arrow />
                    </Tooltip.Content>
                  </Tooltip>
                </Link>
                <Tooltip>
                  <Tooltip.Trigger
                    as={IconButton}
                    onClick={() => deleteFavorite(favorite.id)}
                    variant="ghost"
                    color="secondary"
                  >
                    <TrashSolid className="h-6 w-6 text-red-500 dark:text-white" />
                  </Tooltip.Trigger>
                  <Tooltip.Content className="text-red-600">
                    Remove Favorite
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;
