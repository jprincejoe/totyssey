import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TEvent } from "../types/eventType";
import { eventSchema } from "../validation/eventValidation";
import { eventApi } from "../api/eventApi";
import { convertEventObjectToFormData } from "../utils/convertEventObjectToFormData";
import { convertToISODateString } from "@/utils/dateUtils";

// Default Values
const defaultValues: TEvent = {
  title: "",
  description: "",
  eventLink: "",
  isFree: false,
  startDate: undefined,
  endDate: undefined,
  occurrence: "",
  location: "",
  addressLine1: "",
  city: "",
  state: "",
  zip: "",
  categories: [],
  ages: [],
  imageFiles: undefined,
};

export const useCreateEvent = () => {
  // Form
  const form = useForm<TEvent>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  // On Success
  const onSuccess = (data: TEvent) => {
    toast.success("Event created!");
    console.log(data);
  };

  // On Error
  const onError = (error: Error) => {
    console.log(error.message);
    toast.error(error.message);
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: eventApi.createEvent,
    onSuccess,
    onError,
  });

  // Submit Handler
  const onSubmit = async (data: TEvent) => {
    console.log(data);

    data.startDate = convertToISODateString(data.startDate);
    data.endDate = convertToISODateString(data.endDate);
    console.log(data);

    // Needs to be in FormData format for images
    const formData = convertEventObjectToFormData(data);

    mutation.mutate(formData);
  };

  return { form, onSubmit, mutation };
};
