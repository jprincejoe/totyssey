import { useFormContext } from "react-hook-form";
import FormCheckbox from "@/components/forms/FormCheckbox";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

const CATEGORIES = [
  "Adventure & Outdoor",
  "Animal & Nature",
  "Community Event",
  "Educational",
  "Entertainment Venue",
  "Fundraiser",
  "Indoor Play Place",
  "Park",
  "Seasonal",
  "Sports",
  "Workshop & Class",
];

const EventCategoriesSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection title="Categories" description="Select all that apply">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 exlg:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => (
          <FormCheckbox
            control={control}
            name="categories"
            value={category}
            label={category}
            group={true}
            key={category}
          />
        ))}
      </div>
    </EventFormSection>
  );
};

export default EventCategoriesSection;
