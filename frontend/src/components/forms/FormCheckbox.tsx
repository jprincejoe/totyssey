import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Control, useController } from "react-hook-form";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
}

const FormCheckbox: React.FC<CustomFormFieldProps> = ({
  control,
  name,
  label,
  className = "",
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <FormItem className={clsx("custom-form-item", className)}>
      <FormControl>
        <div className="flex items-center space-x-2">
          <Checkbox {...field} />
          <label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        </div>
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};

export default FormCheckbox;
