import { Button, Spinner } from "@material-tailwind/react";

const UpdateProfileButton = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="mt-4">
      {isEditing ? (
        <div className="flex gap-3 items-center justify-center">
          <Button
            disabled={isSubmitting}
            onClick={() => setIsEditing(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <Spinner size="sm" color="success" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      ) : (
        <Button isFullWidth onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default UpdateProfileButton;
