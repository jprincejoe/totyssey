import FormInput from "@/components/forms/FormInput";
import { useFormContext } from "react-hook-form";
import { TEventDetails } from "../types/eventDetailsTypes";
import FormTextarea from "@/components/forms/FormTextarea";
import FormCheckbox from "@/components/forms/FormCheckbox";

const EventDetailsSection = () => {
  const { control } = useFormContext<TEventDetails>();

  return (
    <div className="flex-flex-col space-y-4">
      <h1 className="text-3xl font-bold mb-3">Create Event</h1>
      {/* Title */}
      <FormInput control={control} name="title" label="Title" />

      {/* Description */}
      <FormTextarea control={control} name="description" label="Description" />

      {/* Event Link */}
      <FormInput control={control} name="eventLink" label="Event Link" />

      {/* Is Free */}
      <FormCheckbox control={control} name="isFree" label="Free to attend" />

      <FormInput
        control={control}
        name="startDate"
        label="Start Date"
        type="date"
      />
      <FormInput
        control={control}
        name="startTime"
        label="Start Time"
        type="time"
      />
    </div>
  );
};

export default EventDetailsSection;
