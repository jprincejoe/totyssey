import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const EventPagination = ({ page, pages, onPageChange }: Props) => {
  // create array for page numbers
  let pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-2">
      {pageNumbers.map((p) => {
        return (
          <Button
            onClick={() => onPageChange(p)}
            key={p}
            variant={p === page ? "default" : "outline"}
            className="w-12"
          >
            {p}
          </Button>
        );
      })}
    </div>
  );
};

export default EventPagination;
