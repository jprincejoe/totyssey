import { FC } from "react";
import { cn } from "@/lib/utils";
import { FA, IconWeight } from "@/enums/Icons";

interface IconProps {
  icon: FA;
  iconWeight?: IconWeight;
  className?: string;
}

const Icon: FC<IconProps> = ({
  icon: FA,
  iconWeight = IconWeight.Regular,
  className,
}) => {
  return <i className={cn(iconWeight, FA, className)}></i>;
};

export default Icon;
