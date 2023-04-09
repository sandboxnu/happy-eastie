import { FormElement, Input, Text, Textarea } from "@nextui-org/react";

type InputFieldProps = {
  name: string;
  editing: boolean;
  placeholder: string;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  multiLine?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<FormElement>) => void;
};
const InputField = ({
  name,
  placeholder,
  fullWidth,
  size = "xs",
  editing,
  value,
  multiLine,
  onChange
}: InputFieldProps) =>
    multiLine ? (
      <Textarea
      name={name}
        placeholder={placeholder}
        fullWidth={fullWidth}
        size={size}
        bordered
        borderWeight="light"
        color="primary"
        css={{ my: "5px" }}
        value={value}
        onChange={onChange}
      />
    ) : (
      <Input
      name={name}
        placeholder={placeholder}
        fullWidth={fullWidth}
        size={size}
        bordered
        borderWeight="light"
        color="primary"
        css={{ my: "5px" }}
        value={value}
        onChange={onChange}
      />
    );

    const TextValue = ({
      name,
      placeholder,
      fullWidth,
      size = "xs",
      editing,
      value,
      multiLine,
      onChange
    }: InputFieldProps) =>
    size === "xl" ? (
      <Text h1 color="primary">
        {value}
      </Text>
    ) : (
      <Text size={16}>{value}</Text>
    );
export const FormInput = ({
  name,
  placeholder,
  fullWidth,
  size = "xs",
  editing,
  value,
  multiLine,
  onChange
}: InputFieldProps) => {
  return editing ? <InputField name={name} placeholder={placeholder} fullWidth={fullWidth} size={size} editing={editing} value={value} multiLine={multiLine}/> : <TextValue name={name} placeholder={placeholder} fullWidth={fullWidth} size={size} editing={editing} value={value} multiLine={multiLine}/>;
};
