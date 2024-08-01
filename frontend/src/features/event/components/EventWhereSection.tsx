import FormInput from "@/components/forms/FormInput";
import { useFormContext } from "react-hook-form";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

const EventWhereSection = () => {
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

      {/* City, State, and Zip */}
      <div className="flex flex-col gap-4 items-center md:flex-row">
        {/* City */}
        <FormInput
          control={control}
          name="city"
          label="City"
          className="flex-1"
        />

        {/* State */}
        <FormInput
          control={control}
          name="state"
          label="State"
          className="flex-1"
        />

        {/* Zip */}
        <FormInput
          control={control}
          name="zip"
          label="Zip"
          className="flex-1"
        />
      </div>
    </EventFormSection>
  );
};

export default EventWhereSection;
