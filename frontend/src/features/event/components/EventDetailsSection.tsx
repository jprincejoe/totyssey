import FormInput from "@/components/forms/FormInput";
import { useFormContext } from "react-hook-form";
import FormTextarea from "@/components/forms/FormTextarea";
import FormCheckbox from "@/components/forms/FormCheckbox";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

const EventDetailsSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection
      title="Event Details"
      description="Enter details for the event"
    >
      {/* Title */}
      <FormInput control={control} name="title" label="Title" />

      {/* Description */}
      <FormTextarea control={control} name="description" label="Description" />

      {/* Event Link */}
      <FormInput control={control} name="eventLink" label="Event Link" />

      {/* Is Free */}
      <FormCheckbox control={control} name="isFree" label="Free to attend" />
    </EventFormSection>
  );
};

export default EventDetailsSection;
