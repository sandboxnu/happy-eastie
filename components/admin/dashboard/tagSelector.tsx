import { FormElement, Grid, Input } from "@nextui-org/react";
import Tag from "../../tag";

type TagSelectorProps = {
  name: string;
  tags: string[];
  editing: boolean;
  onChange?: (e: React.ChangeEvent<FormElement>) => void;
};

export const TagSelector = ({
  name,
  tags,
  editing,
  onChange,
}: TagSelectorProps) => {
  const handleXClick = (tagName: string) => {
    // Remove the tag from the list of tags
    onChange?.({
      target: {
        name,
        value: tags.filter((tag) => tag !== tagName),
      },
      // We have to cast the event to unknown and then to FormElement because
      // the onChange prop is expecting a FormElement, but we're not actually
      // using a FormElement here.
    } as unknown as React.ChangeEvent<FormElement>);
  };

  return (
    <div>
      {editing && (
        <Input
          bordered
          borderWeight="light"
          color="primary"
          fullWidth
          size="xs"
          css={{ my: "5px" }}
        ></Input>
      )}
      <Grid.Container gap={0.75} css={{ px: 0 }}>
        {tags.map((tag) => (
          <Grid>
            <Tag
              text={tag}
              color="pink"
              editing={editing}
              onXClick={handleXClick}
            />
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};
