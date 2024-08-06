import LoadingSpinner from "@/components/LoadingSpinner";
import { eventApi } from "@/features/event/api/eventApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EventPage = () => {
  console.log("On event page");
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("EventID: ", id);
  if (id === undefined) {
    navigate("/");
  }

  const {
    data: eventData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getEvent", id],
    queryFn: () => eventApi.getEvent(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    toast.error(error.message);
    navigate("/");
  }

  return <div>{eventData?.title}</div>;
};

export default EventPage;
