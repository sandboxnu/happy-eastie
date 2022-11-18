import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";

type DialogProps = {
    message: string,
    visible: boolean
}
export default function Dialog(props: DialogProps) {
  const [visible, setVisible] = React.useState(props.visible);

  const closeHandler = () => {
    setVisible(false);
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
            {props.message}
          </Text>
        </Modal.Header>
        <Modal.Body>
            {/* <Text> New feature {props} is coming soon!</Text> */}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
