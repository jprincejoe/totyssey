import LoadingSpinner from "@/components/LoadingSpinner";
import SearchBar from "@/components/SearchBar";
import { useSearchContext } from "@/contexts/SearchContext";
import { eventApi } from "@/features/event/api/eventApi";
import EventCard from "@/features/event/components/EventCard";
import { SearchParams } from "@/features/event/types/searchParams";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SearchPage = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);

  const searchParams: SearchParams = {
    location: search.location,
    freeToAttend: search.freeToAttend.toString(),
    startDate: search.startDate?.toISOString(),
    endDate: search.endDate?.toISOString(),
    page: page.toString(),
  };

  const { data: eventData, isLoading } = useQuery({
    queryKey: ["searchEvents", searchParams],
    queryFn: () => eventApi.searchEvents(searchParams),
  });

  console.log(eventData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="container mx-auto flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md  flex flex-col gap-5 text-center">
          <div className="m-4">
            <SearchBar />
          </div>
        </div>
        <div className="">
          {eventData?.data?.map((event) => {
            return (
              <div className="mb-4" key={event._id}>
                <EventCard event={event} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
