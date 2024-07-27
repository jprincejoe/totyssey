import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  className?: string;
  text?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = "",
  text = "Loading...",
}) => {
  return (
    <div className={cn(`flex items-center text-totysseyBlue ${className}`)}>
      <Loader2 className="mr-2 size-4 animate-spin" />
      <div>{text}</div>
    </div>
  );
};

export default LoadingSpinner;
