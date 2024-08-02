import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Control, useController } from "react-hook-form";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  value: string;
  className?: string;
  group?: boolean;
  [key: string]: any;
}

const FormCheckbox: React.FC<CustomFormFieldProps> = ({
  control,
  name,
  value,
  className = "",
  group = false,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleChange = (checked: boolean) => {
    if (group) {
      const currentValue = field.value || [];
      const updatedValue = checked
        ? [...currentValue, value]
        : currentValue.filter((v: string) => v !== value);
      field.onChange(updatedValue);
    } else {
      field.onChange(checked);
    }
  };

  const isChecked = group
    ? Array.isArray(field.value) && field.value.includes(value)
    : field.value;

  return (
    <FormItem className={clsx("custom-form-item", className)}>
      <FormControl>
        <div className="flex items-center space-x-2">
          <Checkbox
            {...field}
            id={value}
            key={group ? value : name}
            checked={isChecked}
            onCheckedChange={handleChange}
          />
          <label
            htmlFor={value}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {value}
          </label>
        </div>
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};

export default FormCheckbox;
