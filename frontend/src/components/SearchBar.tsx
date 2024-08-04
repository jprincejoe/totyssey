import { useSearchContext } from "@/contexts/SearchContext";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [location, setLocation] = useState<string>(search.location);
  const [freeToAttend, setFreeToAttend] = useState<boolean>(
    search.freeToAttend
  );
  const [startDate, setStartDate] = useState<Date | null>(search.startDate);
  const [endDate, setEndDate] = useState<Date | null>(search.endDate);

  const handleSubmit = (event: FormEvent) => {
    event?.preventDefault();
    search.saveSearchValues(location, freeToAttend, startDate, endDate);
    navigate("/search");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full grid grid-cols-5 items-end gap-4">
        {/* Location */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-left">Location</Label>
          <Input
            type="text"
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Start Date */}
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-left">Start Date</Label>
          <Input
            type="date"
            value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </div>

        {/* End Date */}
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-left">End Date</Label>
          <Input
            type="date"
            value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </div>

        {/* Free to Attend */}
        <div className="flex items-center space-x-2 mb-3">
          <Checkbox
            id="freeToAttend"
            checked={freeToAttend}
            onCheckedChange={(checked) => setFreeToAttend(!!checked)}
          />
          <label
            htmlFor="freeToAttend"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Free to attend?
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="w-full flex-1">
            Clear
          </Button>
          <Button variant="outline" className="w-full" type="submit">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
