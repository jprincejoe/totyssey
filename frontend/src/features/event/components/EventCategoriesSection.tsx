import { useFormContext } from "react-hook-form";
import FormCheckbox from "@/components/forms/FormCheckbox";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

type Category = {
  name: string;
  label: string;
};

const categories: Category[] = [
  { name: "adventureAndOutdoor", label: "Adventure & Outdoor" },
  { name: "animaleAndNature", label: "Animal & Nature" },
  { name: "communityEvent", label: "Community Event" },
  { name: "educational", label: "Educational" },
  { name: "entertainmentVenue", label: "Entertainment Venue" },
  { name: "fundraiser", label: "Fundraiser" },
  { name: "indoorPlayPlace", label: "Indoor Play Place" },
  { name: "park", label: "Park" },
  { name: "seasonal", label: "Seasonal" },
  { name: "sports", label: "Sports" },
  { name: "workshopAndClass", label: "Workshop & Class" },
];

const EventCategoriesSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection
      title="Event Details"
      description="Enter details for the event"
    >
      {categories.map(({ name, label }) => {
        return <FormCheckbox control={control} name={name} label={label} />;
      })}

      {/* Title */}
    </EventFormSection>
  );
};

export default EventCategoriesSection;
