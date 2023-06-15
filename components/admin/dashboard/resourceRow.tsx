import {
  Card,
  Text,
  Row,
  Button,
  Col,
  Input,
  FormElement,
  Loading,
  Modal,
  Grid,
  Image,
} from "@nextui-org/react";
import { WithId } from "mongodb";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { Resource } from "../../../models/types";
import Tag from "../../tag";

type ResourceRowProps = {
  resourceData: WithId<Resource>;
  listLayout: Boolean;
};

enum EditState {
  EDITING,
  LOADING,
  VIEWING,
}

const renameResource = async (newName: string, r: WithId<Resource>) => {
  const { _id, ...replacement } = r;
  // Set the updated name
  replacement.name = newName;

  const requestBody = {
    _id,
    replacement,
  };

  const requestSettings: RequestInit = {
    method: "PUT",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  };
  const response: Response = await fetch("/api/admin/resources", requestSettings);
  const result = await response.json();
  return result.modifiedCount;
};

export const ResourceRow = (props: ResourceRowProps) => {
  const router = useRouter();
  const onPress = () => {
    router.push(`/admin/resource/${props.resourceData._id}`);
  };

  const [editing, setEditing] = useState<EditState>(EditState.VIEWING);
  const [editName, setEditName] = useState<string>(props.resourceData.name);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [deletePopup, setDeletePopup] = useState<boolean>(false);

  const toggleEditing = async () => {
    if (editing == EditState.EDITING) {
      setEditing(EditState.LOADING);
      const result = await renameResource(editName, props.resourceData);
      if (result > 0) {
        setEditing(EditState.VIEWING);
        setErrorMsg("");
      } else {
        setErrorMsg("Failed to rename this resource.");
        setEditing(EditState.EDITING);
      }
    } else if (editing == EditState.VIEWING) {
      setEditing(EditState.EDITING);
    }
  };

  const deleteResource = async () => {
    const requestBody = {
      _id: props.resourceData._id,
    };

    const requestSettings: RequestInit = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify(requestBody),
    };
    const response: Response = await fetch("/api/admin", requestSettings);
    const result = await response.json();
    setDeletePopup(false);
  };

  return (
    <Grid xs={12} sm={props.listLayout ? 12 : 6} md={props.listLayout ? 12 : 4}>
      <Card
        onPress={onPress}
        isPressable={editing == EditState.VIEWING}
        isHoverable
        variant="flat"
        css={{ borderRadius: 0, bgColor: props.listLayout ? "$white" : "" }}
      >
        {props.listLayout ? <Card.Divider /> : null}
        <Card.Header id="name" css={{ pb: "$0" }}>
          <Col>
            <Row align="center">
              {editing == EditState.VIEWING ? (
                <Text b size={22} color="$black">
                  {editName}
                </Text>
              ) : (
                <Input
                  width="40%"
                  value={editName}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      toggleEditing();
                    }
                  }}
                  onChange={(e: ChangeEvent<FormElement>) => {
                    setEditName(e.target.value);
                  }}
                />
              )}
              <Button
                onPress={toggleEditing}
                light
                auto
                icon={
                  editing != EditState.LOADING && (
                    <img
                      src={
                        editing == EditState.EDITING
                          ? "/checkmark.svg"
                          : "/pencil.svg"
                      }
                    />
                  )
                }
              >
                {editing == EditState.LOADING && <Loading />}
              </Button>
            </Row>
            {errorMsg && (
              <Row>
                <Text size={14} color="error">
                  {errorMsg}
                </Text>
              </Row>
            )}
          </Col>
        </Card.Header>
        <Card.Body css={{ py: "$0" }}>
          <Row>
            <Col span={11}>
              <Text color="$black" size={16}>
                {props.resourceData.summary}
              </Text>
            </Col>
            <Col span={1}>
              <Button
                light
                auto
                icon={<Image src="/delete.svg" />}
                onPress={() => setDeletePopup(true)}
              ></Button>
              <Modal
                closeButton
                aria-labelledby="modal-title"
                open={deletePopup}
                onClose={() => {
                  setDeletePopup(false);
                }}
              >
                <Modal.Header>
                  <Text color="warning" b id="modal-title" size={20}>
                    Warning!
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Text> Are you sure you want to delete this resource? </Text>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    auto
                    flat
                    onPress={() => {
                      setDeletePopup(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button auto color="error" onPress={deleteResource}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer css={{ pb: "$10" }}>
          <Grid.Container css={{ gap: 10 }} direction="row">
            {props.resourceData.category.map((tag, index) => (
              <Grid key={index}>
                <Tag text={tag} />
              </Grid>
            ))}
          </Grid.Container>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
