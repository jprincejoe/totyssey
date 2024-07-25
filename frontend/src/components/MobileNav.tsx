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
          <div className="flex flex-col flex-1 gap-y-2">
            <Button>Log In</Button>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
