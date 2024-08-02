import FormInput from "@/components/forms/FormInput";
import { useFormContext } from "react-hook-form";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

const EventWhenSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection
      title="When"
      description="Enter details for the dates & times of the event"
    >
      <div className="flex flex-col gap-4 items-center md:flex-row">
        {/* Start Date */}
        <FormInput
          control={control}
          name="startDate"
          label="Start Date"
          type="datetime-local"
          className="flex-1 w-full"
        />

        {/* End Date */}
        <FormInput
          control={control}
          name="endDate"
          label="End Date"
          type="datetime-local"
          className="flex-1 w-full"
        />
      </div>

      {/* Occurence */}
      <FormInput control={control} name="occurrence" label="Occurence" />
    </EventFormSection>
  );
};

export default EventWhenSection;
