import { Input } from "@nextui-org/react";

type InputFieldProps = {
  placeholder: string;
  fullWidth?: boolean;
};

export const FormInput = ({ placeholder, fullWidth }: InputFieldProps) => {
  return (
    <Input
      placeholder={placeholder}
      fullWidth={fullWidth}
      size="xs"
      bordered
      borderWeight="light"
      color="primary"
      css={{my: "5px"}}
    />
  );
};
