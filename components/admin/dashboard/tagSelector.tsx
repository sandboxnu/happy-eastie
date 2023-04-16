import { Grid, Input } from "@nextui-org/react";
import Tag from "../../tag";

type TagSelectorProps = {
    name: string
    tags: string[]
    editing: boolean
}

export const TagSelector = ({
    name,
    tags,
    editing
  }: TagSelectorProps) => {
    return (<div>{editing && 
    <Input 

        bordered
        borderWeight="light"
        color="primary"
        fullWidth
        size="xs"
        css={{ my: "5px" }}></Input>}
        <Grid.Container gap={0.75} css={{px: 0}}>
            {tags.map( tag =>
                <Grid>
                <Tag text={tag} color="pink"/>
                    
                
            </Grid>
            )}
                    
                
            </Grid.Container></div>)
  };