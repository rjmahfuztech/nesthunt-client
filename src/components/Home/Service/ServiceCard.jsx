import { Card, Typography, Button } from "@material-tailwind/react";

const ServiceCard = ({ service }) => {
  return (
    <div>
      <Card className="max-w-full text-center shadow-lg hover:shadow-xl py-8 transition-shadow duration-300">
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
    </div>
  );
};

export default ServiceCard;
