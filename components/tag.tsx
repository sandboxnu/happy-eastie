import React from "react";
import { Text } from "@nextui-org/react";

type TagProps = {
  text: string;
  color: string;
};

export default function Tag(props: TagProps) {
  return (
    <Text
      css={{
        backgroundColor: props.color,
        padding: "5px 22px",
        borderRadius: "5px",
        color: "white",
        fontSize: "12pt",
        fontFamily: "Raleway",
        fontWeight: "600",
      }}
    >
      {props.text}
    </Text>
  );
}
