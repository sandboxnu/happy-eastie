import { Button, Card, Checkbox, Col, Row, Text } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";

type CardProps = {
  title: string;
  setSelected(s: string): void;
};

export function CategoryCard(props: CardProps) {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      onPress={() => {
        setSelected(!selected);
        props.setSelected(props.title);
      }}
    >
      <Card.Body>
        <Row justify="space-between" align="center">
          <Text>{props.title}</Text>
          <Checkbox isRounded size="xl" isSelected={selected}></Checkbox>
        </Row>
      </Card.Body>
    </Card>
  );
}
