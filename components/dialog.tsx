import React, { useState } from "react";
import { Modal, Button, Text } from "@nextui-org/react";

type DialogProps = {
    title: string,
    message: string,
    visible: boolean,
    onCloseHandler: () => void,
}
export default function Dialog(props: DialogProps) {

  const closeHandler = () => {
    props.onCloseHandler();
  };

  return (
      <Modal
        aria-labelledby="modal-title"
        open={props.visible}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {props.title}
          </Text>
        </Modal.Header>
        <Modal.Body>
            <Text> {props.message} </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
