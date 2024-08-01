import FormInput from "@/components/forms/FormInput";
import { useFormContext } from "react-hook-form";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

const EventWhenSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection
      title="Where"
      description="Enter details for the location of the event"
    >
      {/* Location */}
      <FormInput control={control} name="location" label="Location" />

      {/* Address Line 1 */}
      <FormInput control={control} name="addressLine1" label="Address Line 1" />

      {/* Start Date & Time */}
      <div className="flex flex-col gap-4 items-center md:flex-row">
        {/* Start Date */}
        <FormInput
          control={control}
          name="startDate"
          label="Start Date"
          type="date"
          className="flex-1"
        />

        {/* Start Time */}
        <FormInput
          control={control}
          name="startTime"
          label="Start Time"
          type="time"
          className="flex-1"
        />
      </div>

      {/* End Date & Time */}
      <div className="flex flex-col gap-4 items-center md:flex-row">
        {/* End Date */}
        <FormInput
          control={control}
          name="endDate"
          label="End Date"
          type="date"
          className="flex-1"
        />

        {/* End Time */}
        <FormInput
          control={control}
          name="endTime"
          label="End Time"
          type="time"
          className="flex-1"
        />
      </div>

      {/* Occurence */}
      <FormInput control={control} name="occurence" label="Occurence" />
    </EventFormSection>
  );
};

export default EventWhenSection;
