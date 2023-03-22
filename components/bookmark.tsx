import React, { SyntheticEvent, useState } from "react";
import { Image } from "@nextui-org/react";
import Dialog from "./dialog";

type BookmarkProps = {
  enabled: boolean;
};

export default function Bookmark(props: BookmarkProps) {
  const [state, setState] = useState(props.enabled);

  const onClick = (e: SyntheticEvent) => {
    setState(!state);
    // e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // e.preventDefault();
  };

  return (
    <div>
      <button style={{ all: "unset", padding: 0, margin: 0 }} onClick={onClick}>
        <Image src={`${state ? "/filledbookmark.svg" : "/bookmark.svg"}`} css={{ minHeight: "27px", minWidth: "20px" }} alt="Bookmark" />
      </button>
      <Dialog
        title="New feature"
        message="This feature is coming soon!!"
        visible={state}
        onCloseHandler={() => { setState(false) }}
      />
    </div>
  );
}
