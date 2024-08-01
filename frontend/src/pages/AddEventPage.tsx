import ManageEventForm from "@/features/event/components/ManageEventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddEventPage = () => {
  return (
    <Card className="container flex flex-col border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center text-totysseyBlue">
          Create Event
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <ManageEventForm />
      </CardContent>
    </Card>
  );
};

export default AddEventPage;
