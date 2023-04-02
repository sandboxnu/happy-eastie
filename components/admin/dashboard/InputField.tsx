import { Input, Text, Textarea } from "@nextui-org/react";

type InputFieldProps = {
  editing: boolean;
  placeholder: string;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  multiLine?: boolean;
  value?: string;
};

export const FormInput = ({
  placeholder,
  fullWidth,
  size = "xs",
  editing,
  value,
  multiLine,
}: InputFieldProps) => {
  const InputField = () =>
    multiLine ? (
      <Textarea
        placeholder={placeholder}
        fullWidth={fullWidth}
        size={size}
        bordered
        borderWeight="light"
        color="primary"
        css={{ my: "5px" }}
        value={value}
      />
    ) : (
      <Input
        placeholder={placeholder}
        fullWidth={fullWidth}
        size={size}
        bordered
        borderWeight="light"
        color="primary"
        css={{ my: "5px" }}
        value={value}
      />
    );

  const TextValue = () =>
    size === "xl" ? (
      <Text h1 color="primary">
        {value}
      </Text>
    ) : (
      <Text size={16}>{value}</Text>
    );

  return editing ? <InputField /> : <TextValue />;
};
