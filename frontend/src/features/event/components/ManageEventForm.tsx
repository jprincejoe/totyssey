import { FormProvider } from "react-hook-form";
import EventDetailsSection from "./EventDetailsSection";
import EventWhereSection from "./EventWhereSection";
import EventWhenSection from "./EventWhenSection";
import EventCategoriesSection from "./EventCategoriesSection";
import EventAgesSection from "./EventAgesSection";
import EventImagesSection from "./EventImagesSection";
import { Button } from "@/components/ui/button";
import { useCreateEvent } from "../hooks/useCreateEvent";

const ManageEventForm = () => {
  const { form, onSubmit, mutation } = useCreateEvent();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <EventDetailsSection />
        <EventWhereSection />
        <EventWhenSection />
        <EventCategoriesSection />
        <EventAgesSection />
        <EventImagesSection />
        {/* Submit Button */}
        <div className="flex justify-end mx-6 mt-8">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating Event..." : "Create Event"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageEventForm;
