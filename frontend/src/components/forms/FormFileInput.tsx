import React from "react";
import { Control, useController } from "react-hook-form";
import clsx from "clsx";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

interface FileInputProps {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
  multiple?: boolean;
  accept?: string;
  [key: string]: any;
}

const FormFileInput: React.FC<FileInputProps> = ({
  control,
  name,
  label,
  className = "",
  multiple = false,
  accept = "",
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  // Custom change handler for file inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    field.onChange(files);
  };

  return (
    <FormItem className={clsx("custom-form-item", className)}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          {...rest}
        />
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};

export default FormFileInput;
