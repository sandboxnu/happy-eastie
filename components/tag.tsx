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
      "#C7F1FF",
      "#E1CFFF",
      "#DFFCD2",
      "#FDE5FF",
      "#FFE9CF"
    ]
    const index = tagName.length % tagColors.length;
    return tagColors[index];
  }

  const borderColor = (tagName: string) => {
    const tagColors = [
      "#005A8F",
      "#6200FF",
      "#32631D",
      "#9800A3",
      "#854700"
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
        border: `0.5px solid ${borderColor(text)}`,
        color: "black",
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
