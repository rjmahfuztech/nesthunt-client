import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  const isContactSection = service.to.startsWith("#");

  const cardContent = (
    <Card className="max-w-full text-center shadow-lg  py-8  hover:scale-105 transition-transform duration-300">
      <Card.Header className="mx-3 mt-3">
        <service.icon className="h-16 w-16 mx-auto" />
      </Card.Header>
      <Card.Body>
        <Typography type="h6">{service.title}</Typography>
        <Typography className="my-1 text-foreground">
          {service.description}
        </Typography>
      </Card.Body>
    </Card>
  );
  return (
    <div>
      {isContactSection ? (
        <a href={service.to}>{cardContent}</a>
      ) : (
        <Link to={service.to}>{cardContent}</Link>
      )}
    </div>
  );
};

export default ServiceCard;
