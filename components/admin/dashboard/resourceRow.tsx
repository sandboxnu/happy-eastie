import { Card, Text, Row, Button, Col } from "@nextui-org/react";
import { useRouter } from "next/router";
import TagsMap from "../../../models/TagsMap";
import Tag from "../../home/tag";

type ResourceRowProps = {
    name: string,
    summary: string,
    categories: string[],
    resourceId: string,
}

export const ResourceRow = (props: ResourceRowProps) => {
    const router = useRouter();
    const onPress = () => {
        router.push(`/admin/resource/${props.resourceId}`)
    }
  return (
    <Card onPress={onPress} isPressable isHoverable variant="shadow" css={{ borderRadius: 0 }}>
      <Card.Divider />
      <Card.Header css={{ pb: "$0" }}>
        <Row align="center">
            <Text b size={22} color="$black">{props.name}</Text>
            <Button light auto icon={<img src="/pencil.svg"></img>}></Button>
        </Row>
      </Card.Header>
      <Card.Body css={{ py: "$0" }}>
        <Row>
          <Col span={11}>
            <Text color="$black" size={16}>
              {props.summary}
            </Text>
          </Col>
          <Col span={1}>
            <Button light auto icon={<img src="/delete.svg"></img>}></Button>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer css={{ pb: "$10" }}>
        <Row justify="flex-start" css={{ gap: 10 }}>
            {props.categories.map((tag, index) => (
                <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
              ))}
        </Row>
      </Card.Footer>
    </Card>
  );
};
