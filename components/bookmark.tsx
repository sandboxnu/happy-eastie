import React, { SyntheticEvent, useState } from "react";
import { Image } from "@nextui-org/react";

type BookmarkProps = {
  enabled: boolean;
};

export default function Bookmark(props: BookmarkProps) {
  const [state, setState] = useState(props.enabled);

  const onClick = (e: SyntheticEvent) => {
    setState(!state);
    e.stopPropagation()
  };

  return (
    <button style={{all: "unset", padding: 0, margin: 0 }} onClick={onClick}>
      <Image src={`${state ? "/filledbookmark.svg" : "/bookmark.svg"}`} alt="Bookmark" />
    </button>
  );
}
