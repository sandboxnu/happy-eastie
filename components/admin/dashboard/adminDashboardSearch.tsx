import { Button, Input, Row, Image } from "@nextui-org/react";
import { ChangeEvent } from "react";
import { FormElement } from "@nextui-org/react";

type SearchProps = {
  onChange(e: ChangeEvent<FormElement>): void;
};

export const AdminDashboardSearch = (props: SearchProps) => {
  return (
    <Row align="center" css={{ gap: 20 }}>
      <Input
        size="lg"
        fullWidth
        bordered
        placeholder="Search"
        onChange={props.onChange}
        labelRight={<Image src="/magnifierflat.svg" />}
      />
      <Button
        auto
        size="lg"
        iconRight={<Image alt="Filter" src="/filter.svg" width={23} />}
      >
        Filters
      </Button>
    </Row>
  );
};
