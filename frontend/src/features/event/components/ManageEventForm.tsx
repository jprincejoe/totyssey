import { FormProvider, useForm } from "react-hook-form";
import EventDetailsSection from "./EventDetailsSection";
import { TEventDetails } from "../types/eventDetailsTypes";

const ManageEventForm = () => {
  const formMethods = useForm<TEventDetails>();

  return (
    <FormProvider {...formMethods}>
      <form>
        <EventDetailsSection />
      </form>
    </FormProvider>
  );
};

export default ManageEventForm;
