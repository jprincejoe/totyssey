import { FA } from "@/enums/Icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icon from "@/components/Icon";

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
