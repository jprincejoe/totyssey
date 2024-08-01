import { FormProvider, useForm } from "react-hook-form";
import EventDetailsSection from "./EventDetailsSection";
import { TEvent } from "../types/eventType";
import EventWhereSection from "./EventWhereSection";
import EventWhenSection from "./EventWhenSection";
import EventCategoriesSection from "./EventCategoriesSection";

const ManageEventForm = () => {
  const formMethods = useForm<TEvent>();

  return (
    <FormProvider {...formMethods}>
      <form>
        <EventDetailsSection />
        <EventWhereSection />
        <EventWhenSection />
        <EventCategoriesSection />
      </form>
    </FormProvider>
  );
};

export default ManageEventForm;
