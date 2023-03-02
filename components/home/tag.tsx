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
        fontFamily: "Raleway",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "14px",
        letterSpacing: "0.3px",
        textAlign: "center",
        color: "white",
        backgroundColor: props.color,
        padding: "9px 20px",
        borderRadius: "5px",
      }}
    >
      {props.text}
    </Text>
  );
}
