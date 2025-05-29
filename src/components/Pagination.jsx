import { Button, IconButton } from "@material-tailwind/react";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        disabled={currentPage == 1}
        onClick={() => {
          window.scrollTo(0, 0);
          setCurrentPage(currentPage - 1);
        }}
        variant="ghost"
      >
        <NavArrowLeft className="mr-1.5 h-4 w-4 stroke-2" />
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => (
        <IconButton
          key={i}
          onClick={() => {
            setCurrentPage(i + 1);
            window.scrollTo(0, 0);
          }}
          variant={currentPage == i + 1 ? "solid" : "ghost"}
        >
          {i + 1}
        </IconButton>
      ))}
      <Button
        disabled={currentPage == totalPages}
        onClick={() => {
          window.scrollTo(0, 0);
          setCurrentPage(currentPage + 1);
        }}
        variant="ghost"
      >
        Next
        <NavArrowRight className="ml-1.5 h-4 w-4 stroke-2" />
      </Button>
    </div>
  );
};

export default Pagination;
