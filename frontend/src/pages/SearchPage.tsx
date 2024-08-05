import LoadingSpinner from "@/components/LoadingSpinner";
import SearchBar from "@/components/SearchBar";
import { useSearchContext } from "@/contexts/SearchContext";
import { eventApi } from "@/features/event/api/eventApi";
import EventCard from "@/features/event/components/EventCard";
import EventPagination from "@/features/event/components/EventPagination";
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="container mx-auto flex flex-col gap-8">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md  flex flex-col gap-5 text-center p-4">
          <SearchBar />
        </div>

        <div className="ml-4 font-bold">
          {eventData?.pagination.total ?? 0} events found
        </div>

        {/* Cards */}
        {eventData?.data?.map((event) => {
          return (
            <div key={event._id}>
              <EventCard event={event} />
            </div>
          );
        })}

        {/* Pagination */}
        <EventPagination
          page={eventData?.pagination.page || 1}
          pages={eventData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default SearchPage;
