import { useFormContext } from "react-hook-form";
import FormCheckbox from "@/components/forms/FormCheckbox";
import { TEvent } from "../types/eventType";
import EventFormSection from "./EventFormSection";

const AGES = [
  "Toddler (0 - 3 years)",
  "Preschool (3 - 5 years)",
  "School Age (6 - 12 years)",
  "Teens (13+ years)",
  "Family (all ages)",
];

const EventAgesSection = () => {
  const { control } = useFormContext<TEvent>();

  return (
    <EventFormSection title="Ages" description="Select all that apply">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 exlg:grid-cols-4 gap-4">
        {AGES.map((age) => (
          <FormCheckbox
            control={control}
            name="ages"
            value={age}
            label={age}
            group={true}
            key={age}
          />
        ))}
      </div>
    </EventFormSection>
  );
};

export default EventAgesSection;
