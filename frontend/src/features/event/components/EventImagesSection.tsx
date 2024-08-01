import FormInput from "@/components/forms/FormInput";
import { useFormContext } from "react-hook-form";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

const EventImagesSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection
      title="Images"
      description="Upload images of the event (max 6)"
    >
      {/* Title */}
      <FormInput
        control={control}
        name="imageFiles"
        label="Images"
        type="file"
      />
    </EventFormSection>
  );
};

export default EventImagesSection;
