import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, useController } from "react-hook-form";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}

const FormTextarea: React.FC<CustomFormFieldProps> = ({
  control,
  name,
  label,
  placeholder = "",
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
        <Textarea {...field} placeholder={placeholder} />
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};

export default FormTextarea;
