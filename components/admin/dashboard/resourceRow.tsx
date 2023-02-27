import {
  Card,
  Text,
  Row,
  Button,
  Col,
  Input,
  FormElement,
  Loading,
} from "@nextui-org/react";
import { WithId } from "mongodb";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import TagsMap from "../../../models/TagsMap";
import { Resource } from "../../../models/types2";
import { ResourceData, ResourcesResponse } from "../../../pages/api/resources";
import Dialog from "../../dialog";
import Tag from "../../home/tag";

type ResourceRowProps = {
  resourceData: WithId<Resource>;
};

enum EditState {
  EDITING,
  LOADING,
  VIEWING,
}

const renameResource = async (newName: string, r: WithId<Resource>) => {
  const replacement = {
    name: newName,
    description: r.description,
    summary: r.summary,
    category: r.category,
    keywords: r.keywords,
    incomeByHouseholdMembers: r.incomeByHouseholdMembers,
    documentationRequired: r.documentationRequired,
    headerImageUrl: r.headerImageUrl,
    website: r.website,
    phone: r.phone,
    email: r.email,
    address: r.address,
    location: r.location,
    availableLanguages: r.availableLanguages,
    accessibilityOptions: r.accessibilityOptions,
    eligibilityInfo: r.eligibilityInfo,
  };

  const requestBody = {
    _id: r._id,
    replacement: replacement,
  };

  const requestSettings: RequestInit = {
    method: "PUT",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  };
  const response: Response = await fetch("/api/admin", requestSettings);
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
        method: "DELETE",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      };
      const response: Response = await fetch("/api/admin", requestSettings);
      const result = await response.json();
      console.log(result)
  }

  return (
    <Card
      onPress={onPress}
      isPressable={editing == EditState.VIEWING}
      isHoverable
      variant="flat"
      css={{ borderRadius: 0, backgroundColor: "White"}}

    >
      <Card.Divider />
      <Card.Header id="name" css={{ pb: "$0" }}>
        <Row align="center">
          {editing == EditState.VIEWING ? (
            <Text b size={22} color="$black">
              {editName}
            </Text>
          ) : (
            <Input
              fullWidth
              value={editName}
              autoFocus
              css={{ zIndex: 100 }}
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
                ></img>
              )
            }
          >
            {editing == EditState.LOADING && <Loading />}
          </Button>
        </Row>
        {errorMsg && (
          <Row>
            <Text color="error">{errorMsg}</Text>
          </Row>
        )}
      </Card.Header>
      <Card.Body css={{ py: "$0" }}>
        <Row>
          <Col span={11}>
            <Text color="$black" size={16}>
              {props.resourceData.summary}
            </Text>
          </Col>
          <Col span={1}>
            <Button light auto icon={<img src="/delete.svg"></img>} onPress={deleteResource}></Button>
            {/* <Dialog title="Warning" 
              message="This feature is coming soon!!" 
              visible={state} 
              onCloseHandler={() => {setState(false)}}/> */}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer css={{ pb: "$10" }}>
        <Row justify="flex-start" css={{ gap: 10 }}>
          {props.resourceData.category.map((tag, index) => (
            <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
          ))}
        </Row>
      </Card.Footer>
    </Card>
  );
};
