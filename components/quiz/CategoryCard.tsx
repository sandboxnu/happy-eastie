import { Button, Card, Checkbox, Col, Row, Text } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";

type CardProps = {
  title: string;
  setSelected(s: string): void
};

export function CategoryCard(props: CardProps) {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      css={{ mw: "400px" }}
      onPress={() => {
        setSelected(!selected)
        props.setSelected(props.title)
      }}
    >
      <Card.Body>
        <Row align="center">
          <Col>
            <Row>
              <Col>
                <Text>{props.title}</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Checkbox isRounded size="xl" isSelected={selected}></Checkbox>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
