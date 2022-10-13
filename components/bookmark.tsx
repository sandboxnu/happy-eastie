import React, { useState } from "react";
import { Image } from "@nextui-org/react";

type BookmarkProps = {
  enabled: boolean;
};

export default function Bookmark(props: BookmarkProps) {
  const [state, setState] = useState(props.enabled);

  const onClick = () => {
    setState(!state);
  };

  return (
    <button style={{all: "unset", padding: 0, margin: 0 }} onClick={onClick}>
      <Image src={`${state ? "bookmark.svg" : "globe.svg"}`} alt="Bookmark" />
    </button>
  );
}
