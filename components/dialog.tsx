import React, { useState } from "react";
import { Modal, Button, Text } from "@nextui-org/react";

type DialogProps = {
    title: string,
    message: string,
    onCloseHandler: () => void,
}
export default function Dialog(props: DialogProps) {
  const [visible, setVisible] = useState(true);

  const closeHandler = () => {
    setVisible(false);
    props.onCloseHandler();
  };

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
