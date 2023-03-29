import { Input, Text } from "@nextui-org/react";

type InputFieldProps = {
  editing: boolean;
  placeholder: string;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const FormInput = ({
  placeholder,
  fullWidth,
  size = "xs",
  editing,
}: InputFieldProps) => {
  return editing ? (
    <Input
      placeholder={placeholder}
      fullWidth={fullWidth}
      size={size}
      bordered
      borderWeight="light"
      color="primary"
      css={{ my: "5px" }}
    />
  ) : size === "xl" ? (
    <Text h1 color="primary">
      {placeholder}
    </Text>
  ) : (
    <Text size={16}>{placeholder}</Text>
  );
};
