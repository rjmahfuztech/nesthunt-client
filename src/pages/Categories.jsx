import { EditPencil, PlusCircle, Trash } from "iconoir-react";
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";
import { Link } from "react-router";
import UpdateCategory from "../components/Category/UpdateCategory";
import {
  handleApiError,
  handleConfirmationWarning,
  handleSuccessMessage,
  Toast,
} from "../components/Messages/Alert";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);

  // Table head
  const TABLE_HEAD = ["Name", "Description", "Edit", "Delete"];
  // Load categories
  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // Get a specific category
  const updateCategory = (id) => {
    const getCategory = categories.find((item) => item.id === id);
    setCategory(getCategory);
  };

  // Delete a category
  const deleteCategory = (id) => {
    // delete warning
    handleConfirmationWarning("delete").then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.delete(`/categories/${id}/`);
          if (res.status == 204) {
            // update the local state
            setCategories((prevCategories) =>
              prevCategories.filter((item) => item.id !== id)
            );
            // success alert
            handleSuccessMessage(
              "Category Deleted",
              "Your category has been successfully deleted."
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
      {category ? (
        <UpdateCategory
          category={category}
          setCategory={setCategory}
          setCategories={setCategories}
        />
      ) : (
        <div className="w-full bg-white p-2">
          <div className="mb-8 flex items-center justify-between gap-4 md:gap-8">
            <div>
              <Typography type="h6">Category list</Typography>
              <Typography className="mt-1">
                See information about all categories
              </Typography>
            </div>
            <Button
              as={Link}
              to="/dashboard/category/add"
              className="flex items-center gap-3"
              size="sm"
            >
              <PlusCircle strokeWidth={2} className="h-4 w-4" /> Add Category
            </Button>
          </div>
          {/* Category table  */}
          {categories.length === 0 ? (
            <h2 className="text-gray-500 text-lg font-semibold text-center mt-20">
              No Category available
            </h2>
          ) : (
            <div className="mt-4 w-full overflow-x-auto rounded-lg border border-surface">
              <table className="w-full">
                <thead className="border-b border-surface bg-surface-light text-lg font-medium text-black dark:bg-surface-dark">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="px-2.5 py-2 text-start font-medium"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="group text-sm text-black dark:text-white">
                  {categories.map(({ id, name, description }, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-surface last:border-0"
                      >
                        <td className="p-3 min-w-32">
                          <Typography type="small">{name}</Typography>
                        </td>
                        <td className="p-3 min-w-80">
                          <Typography type="small">{description}</Typography>
                        </td>
                        {/* Edit  */}
                        <td className="p-3">
                          <Tooltip>
                            <Tooltip.Trigger
                              as={IconButton}
                              onClick={() => updateCategory(id)}
                              variant="ghost"
                              color="secondary"
                            >
                              <EditPencil className="h-5 w-5 text-green-500 dark:text-white" />
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                              Edit Category
                              <Tooltip.Arrow />
                            </Tooltip.Content>
                          </Tooltip>
                        </td>
                        {/* Delete  */}
                        <td className="p-3">
                          <Tooltip>
                            <Tooltip.Trigger
                              as={IconButton}
                              onClick={() => deleteCategory(id)}
                              variant="ghost"
                              color="secondary"
                            >
                              <Trash className="h-5 w-5 text-red-500 dark:text-white" />
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                              Delete Category
                              <Tooltip.Arrow />
                            </Tooltip.Content>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Categories;
