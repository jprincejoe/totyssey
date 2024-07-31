import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ManageEventForm from "@/features/event/components/ManageEventForm";

const AddEventPage = () => {
  return (
    <div className="container flex flex-col">
      <ManageEventForm />
    </div>
    // <div className="container flex justify-center">
    //   <Card className="shadow-md w-full">
    //     <CardHeader>
    //       <CardTitle className="text-3xl font-bold text-center">
    //         Create an event
    //       </CardTitle>
    //     </CardHeader>
    //     <CardContent>{/* <EventDetailsFormSection /> */}</CardContent>
    //   </Card>
    // </div>
  );
};

export default AddEventPage;
