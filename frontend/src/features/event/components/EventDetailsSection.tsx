import FormInput from "@/components/forms/FormInput";
import { useFormContext } from "react-hook-form";
import FormTextarea from "@/components/forms/FormTextarea";
import FormCheckbox from "@/components/forms/FormCheckbox";
import { Event } from "../types/eventType";
import EventFormSection from "./EventFormSection";

const EventDetailsSection = () => {
  const { control } = useFormContext<Event>();

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
      <FormCheckbox control={control} name="isFree" value="Free to attend" />
    </EventFormSection>
  );
};

export default EventDetailsSection;
