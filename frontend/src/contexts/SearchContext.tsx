import { createContext, useContext, useState } from "react";

type EventSearchContext = {
  location: string;
  freeToAttend: boolean;
  startDate: Date;
  endDate: Date;
  eventId?: string;
  saveSearchValues: (
    location: string,
    freeToAttend: boolean,
    startDate: Date,
    endDate: Date
  ) => void;
};

const EventSearchContext = createContext<EventSearchContext | undefined>(
  undefined
);

export const EventSearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<string>("");
  const [freeToAttend, setFreeToAttend] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [eventId, setEventId] = useState<string>("");

  const saveSearchValues = (
    location: string,
    freeToAttend: boolean,
    startDate: Date,
    endDate: Date,
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
    <EventSearchContext.Provider
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
    </EventSearchContext.Provider>
  );
};

export const useEventSearchContext = () => {
  const context = useContext(EventSearchContext);

  if (context === undefined) {
    throw new Error(
      "useEventSearchContext must be used with EventSearchProvider"
    );
  }

  return context as EventSearchContext;
};
