import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TEventFormSection = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const EventFormSection = ({
  title,
  description,
  children,
}: TEventFormSection) => {
  return (
    <div className="container flex flex-col justify-center">
      <Card className="w-full border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {children}
        </CardContent>
      </Card>
      <Separator className="mt-6 w-[98%] mx-auto" />
    </div>
  );
};

export default EventFormSection;
