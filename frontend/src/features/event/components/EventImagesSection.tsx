import { useFormContext } from "react-hook-form";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";
import FormFileInput from "@/components/forms/FormFileInput";

const EventImagesSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection
      title="Images"
      description="Upload images of the event (max 6)"
    >
      {/* Images */}
      <FormFileInput
        multiple
        accept="image/*"
        control={control}
        name="imageFiles"
        label="Images"
        type="file"
      />
    </EventFormSection>
  );
};

export default EventImagesSection;
