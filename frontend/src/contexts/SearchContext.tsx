import { createContext, useContext, useState } from "react";

type SearchContext = {
  location: string;
  freeToAttend: boolean;
  startDate: Date | null;
  endDate: Date | null;
  eventId?: string;
  saveSearchValues: (
    location: string,
    freeToAttend: boolean,
    startDate: Date | null,
    endDate: Date | null
  ) => void;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<string>("");
  const [freeToAttend, setFreeToAttend] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [eventId, setEventId] = useState<string>("");

  const saveSearchValues = (
    location: string,
    freeToAttend: boolean,
    startDate: Date | null,
    endDate: Date | null,
    eventId?: string
  ) => {
    setLocation(location);
    setFreeToAttend(freeToAttend);
    setStartDate(startDate);
    setEndDate(endDate);
    if (eventId) {
      setEventId(eventId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        location,
        freeToAttend,
        startDate,
        endDate,
        eventId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearchContext must be used with SearchProvider");
  }

  return context as SearchContext;
};
