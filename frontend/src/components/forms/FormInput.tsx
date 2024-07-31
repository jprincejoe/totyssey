import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, useController } from "react-hook-form";
import clsx from "clsx";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

const FormInput: React.FC<CustomFormFieldProps> = ({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
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
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...field} type={type} placeholder={placeholder} />
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};

export default FormInput;
