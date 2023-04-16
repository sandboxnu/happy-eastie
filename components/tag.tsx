import React from "react";
import { Text, Image, Row } from "@nextui-org/react";

type TagProps = {
  text: string;
  color: string;
  editing?: boolean;
  onXClick?: (s: string) => void;
};

export default function Tag({
  text,
  color,
  editing = false,
  onXClick,
}: TagProps) {
  return (
    <Row
      align="center"
      css={{
        backgroundColor: color,
        padding: "5px 8px",
        borderRadius: "5px",
        color: "white",
        fontSize: "14px",
        fontFamily: "Raleway",
        fontWeight: "500",
        letterSpacing: "0.5px",
        gap: "4px",
      }}
    >
      {text}
      {/* Show an X if the tag is editable */}
      {editing && (
        <Image
          src="/close.svg"
          css={{ cursor: "pointer" }}
          onClick={() => {
            onXClick?.(text);
          }}
        />
      )}
    </Row>
  );
}
