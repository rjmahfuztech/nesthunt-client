import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Rating,
} from "@material-tailwind/react";

const ReviewCard = () => {
  return (
    <div>
      <Card className="w-full border-none shadow-none bg-[#F0F2F4] p-3 md:p-4 mt-6">
        <Card.Header className="mx-0 flex items-center gap-4 pb-4 pt-0">
          <Avatar
            size="lg"
            shape="rounded"
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <div className="ml-2 flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography type="h6">Tania Andrew</Typography>
              <Rating color="warning" value={5} readonly />
            </div>
            <Typography>Frontend Lead @ Google</Typography>
          </div>
        </Card.Header>
        <CardBody className="p-0">
          <Typography className="text-foreground">
            &quot;I found solution to all my design needs from Creative Tim. I
            use them as a freelancer in my hobby projects for fun! And its
            really affordable, very humble guys !!!&quot;
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReviewCard;
