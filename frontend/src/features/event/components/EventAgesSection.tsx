import { useFormContext } from "react-hook-form";
import FormCheckbox from "@/components/forms/FormCheckbox";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

type Age = {
  name: string;
  label: string;
};

const ages: Age[] = [
  { name: "toddler", label: "Toddler (0 - 3 years)" },
  { name: "preschool", label: "Preschool (3 - 5 years)" },
  { name: "schoolAge", label: "School Age (6 - 12 years)" },
  { name: "teens", label: "Teens (13+ years)" },
  { name: "family", label: "Family (all ages)" },
];

const EventAgesSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection title="Ages" description="Select all that apply">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 exlg:grid-cols-4 gap-4">
        {ages.map(({ name, label }) => {
          return <FormCheckbox control={control} name={name} label={label} />;
        })}
      </div>
    </EventFormSection>
  );
};

export default EventAgesSection;
