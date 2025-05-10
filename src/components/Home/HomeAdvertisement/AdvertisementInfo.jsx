import React from "react";
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import {
  HeartSolid,
  StarSolid,
  Bathroom,
  HouseRooms,
  Square3dThreePoints,
} from "iconoir-react";
import { Link } from "react-router";

const AdvertisementInfo = ({ advertisement }) => {
  return (
    <div>
      <Card className="w-full max-w-[26rem] mx-auto shadow-lg">
        <Card.Header className="relative overflow-hidden p-0">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          <IconButton
            size="sm"
            color="error"
            variant="ghost"
            className="!absolute right-2 top-2 rounded-full"
          >
            <HeartSolid className="h-5 w-5" />
          </IconButton>
          <Typography className="!absolute left-2 bottom-2 font-semibold bg-slate-200 px-4 py-2 rounded-full">
            {advertisement.rental_amount}/Mo
          </Typography>
        </Card.Header>
        <Card.Body>
          <div className="mb-2 flex items-center justify-between">
            <Typography type="h6">{advertisement.title}</Typography>
            <Typography className="flex items-center gap-1.5 ">
              <StarSolid className="h-[18px] w-[18px] text-warning" />
              5.0
            </Typography>
          </div>
          <Typography className="text-foreground">
            {advertisement.description.slice(0, 35)}...
          </Typography>
          <div className="group mt-6 inline-flex flex-wrap text-gray-500 items-center gap-3">
            <div className="flex gap-2 items-center">
              <HouseRooms strokeWidth={2} className="h-5 w-5" />
              <span>{advertisement.bedroom} Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <Bathroom strokeWidth={2} className="h-5 w-5" />
              <span>{advertisement.bathroom} Baths</span>
            </div>
            <div className="flex gap-2 items-center">
              <Square3dThreePoints strokeWidth={2} className="h-5 w-5" />
              <span>{advertisement.apartment_size} sqft</span>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="pt-3">
          <Link to={`/rentals/${advertisement.id}`}>
            <Button className="w-full bg-green-600 px-8 py-3 font-bold hover:bg-green-700 border-none">
              See Details
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AdvertisementInfo;
