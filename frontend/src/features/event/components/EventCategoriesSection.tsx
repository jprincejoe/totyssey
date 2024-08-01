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
    <EventFormSection title="Categories" description="Select all that apply">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 exlg:grid-cols-4 gap-4">
        {categories.map(({ name, label }) => {
          return <FormCheckbox control={control} name={name} label={label} />;
        })}
      </div>
    </EventFormSection>
  );
};

export default EventCategoriesSection;
