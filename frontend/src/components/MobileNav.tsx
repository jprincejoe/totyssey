import { FA } from "@/types/Icons";
import Icon from "./Icon";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Icon icon={FA.Menu} className="p-2" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          <span>Welcome to Totyssey!</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex">
          <Button className="flex-1 font-bold bg-orange-500">Log In</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
