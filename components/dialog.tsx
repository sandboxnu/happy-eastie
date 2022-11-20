import React, { useState } from "react";
import { Modal, Button, Text } from "@nextui-org/react";

type DialogProps = {
    title: string,
    message: string,
    visible: boolean,
    onCloseHandler: () => void,
}
export default function Dialog(props: DialogProps) {
  const [visible, setVisible] = useState(props.visible);

  const closeHandler = () => {
    setVisible(false);
    props.onCloseHandler();
  };

  console.log(visible);
  return (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
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
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
