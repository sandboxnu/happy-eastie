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
        padding: "5px 15px",
        borderRadius: "5px",
        color: "white",
        fontSize: "14px",
        fontFamily: "Raleway",
        fontWeight: "500",
        letterSpacing: "0.5px",
      }}
    >
      {props.text}
    </Text>
  );
}
