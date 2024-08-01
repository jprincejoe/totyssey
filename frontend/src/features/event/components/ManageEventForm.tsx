import { FormProvider, useForm } from "react-hook-form";
import EventDetailsSection from "./EventDetailsSection";
import { TEvent } from "../types/eventType";
import EventWhereSection from "./EventWhereSection";
import EventWhenSection from "./EventWhenSection";
import EventCategoriesSection from "./EventCategoriesSection";
import EventAgesSection from "./EventAgesSection";
import EventImagesSection from "./EventImagesSection";
import { Button } from "@/components/ui/button";

const ManageEventForm = () => {
  const formMethods = useForm<TEvent>();

  return (
    <FormProvider {...formMethods}>
      <form>
        <EventDetailsSection />
        <EventWhereSection />
        <EventWhenSection />
        <EventCategoriesSection />
        <EventAgesSection />
        <EventImagesSection />
        <div className="flex justify-end mx-6 mt-8">
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageEventForm;
