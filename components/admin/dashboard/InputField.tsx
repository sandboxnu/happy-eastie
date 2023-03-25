import { Input } from "@nextui-org/react";

type InputFieldProps = {
  placeholder: string;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const FormInput = ({ placeholder, fullWidth, size }: InputFieldProps) => {
  return (
    <Input
      placeholder={placeholder}
      fullWidth={fullWidth}
      size={size ?? "xs"}
      bordered
      borderWeight="light"
      color="primary"
      css={{my: "5px"}}
    />
  );
};
