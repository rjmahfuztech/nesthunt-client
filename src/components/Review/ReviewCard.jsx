import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Rating,
  Tooltip,
} from "@material-tailwind/react";
import defaultProfile from "../../assets/images/profile/profileDefault.jpeg";
import { EditPencil, Trash } from "iconoir-react";

const ReviewCard = ({ review }) => {
  return (
    <div>
      <Card className="w-full border-none shadow-none bg-[#F0F2F4] p-3 md:p-4 mt-6">
        <Card.Header className="mx-0 flex gap-4 pb-4 pt-0">
          <Avatar
            size="lg"
            shape="rounded"
            alt="Profile Pic"
            src={review.user.profile_image || defaultProfile}
          />
          <div className="ml-2 flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography type="h6">{review.user.name}</Typography>
              <Rating color="warning" value={review.rating} readonly />
            </div>
          </div>
        </Card.Header>
        <CardBody className="p-0 grid grid-cols-4 gap-2">
          <Typography className="text-foreground col-span-3">
            &quot;{review.comment}&quot;
          </Typography>
          <div className="flex gap-2 md:gap-4 justify-end items-center">
            {/* edit  */}
            <Tooltip>
              <Tooltip.Trigger variant="ghost" color="secondary">
                <EditPencil className="h-5 w-5 text-green-500 dark:text-white" />
              </Tooltip.Trigger>
              <Tooltip.Content>
                Edit Review
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
            {/* delete  */}
            <Tooltip>
              <Tooltip.Trigger variant="ghost" color="secondary">
                <Trash className="h-5 w-5 text-red-500 dark:text-white" />
              </Tooltip.Trigger>
              <Tooltip.Content>
                Delete Review
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReviewCard;
