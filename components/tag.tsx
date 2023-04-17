import React from "react";
import { Text, Image, Row } from "@nextui-org/react";

type TagProps = {
  text: string;
  editing?: boolean;
  colorful: boolean;
  onXClick?: (s: string) => void;
};

export default function Tag({
  text,
  editing = false,
  colorful,
  onXClick,
}: TagProps) {
  const tagColor = (tagName: string) => {
    const tagColors = [
      "var(--brand-blue)",
      "var(--brand-purple)",
      "var(--brand-green)",
      "#D00DF0",
      "var(--brand-orange)",
      "var(--brand-primary)",
      "rgb(230, 172, 0)",
      "#e35cce"
    ]
    const index = tagName.length % tagColors.length;
    return tagColors[index];
  }


  return (
    <Row
      align="center"
      css={{
        backgroundColor: colorful ? tagColor(text):"#757575",
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
