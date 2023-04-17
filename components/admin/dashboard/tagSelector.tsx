import { FormElement, Grid, Input } from "@nextui-org/react";
import Tag from "../../tag";
import { useEffect, useState } from "react";

type TagSelectorProps = {
  name: string;
  tags: string[];
  editing: boolean;
  colorful?: boolean;
  onChange?: (e: React.ChangeEvent<FormElement>) => void;
  fetchDatalist?: () => Promise<string[]>;
};

export const TagSelector = ({
  name,
  tags,
  editing,
  colorful = false,
  onChange,
  fetchDatalist
}: TagSelectorProps) => {
  const [inputValue, setInputValue] = useState("")
  const [dropdownTags, setDropdownTags] = useState<string[]>([])
  useEffect(()=>{
    fetchDatalist?.().then(data => setDropdownTags(data))
  }, [] )
  const handleXClick = (tagName: string) => {
    // Remove the tag from the list of tags
    onChange?.({
      target: {
        name,
        value: tags.filter((tag) => tag !== tagName),
      },
    } as unknown as React.ChangeEvent<FormElement>);
  };

  const addTag = (newTagName: string) => {
    // Don't add the tag if it's already in the list
    if (tags.includes(newTagName)) return;

    // Add the tag to the list of tags
    onChange?.({
      target: {
        name,
        value: [...tags, newTagName],
      },
    } as unknown as React.ChangeEvent<FormElement>);
  };

  return (
    <div>
      {editing && ( <>
        <Input
        value={inputValue}
        list={name}
        onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Prevent form submission when pressing enter
              e.preventDefault();
              addTag(e.currentTarget.value);
              setInputValue("");
            }
          }}
          bordered
          borderWeight="light"
          color="primary"
          fullWidth
          size="xs"
          css={{ my: "5px" }}
        ></Input>
        <datalist id={name}>
          {dropdownTags
          .filter(dt => dt.toLowerCase().startsWith(inputValue.toLowerCase())) 
          .filter(dt => inputValue !== dt)
          .filter(dt => !tags.includes(dt))
          .map(dt => <option style={{fontSize: "16px"}}>{dt}</option>)}
        </datalist>
        </>
      )}
      <Grid.Container gap={0.75} css={{ px: 0 }}>
        {tags.map((tag) => (
          <Grid>
            <Tag
              text={tag}
              editing={editing}
              colorful={colorful}
              onXClick={handleXClick}
            />
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};
