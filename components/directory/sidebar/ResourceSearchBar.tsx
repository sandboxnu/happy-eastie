import { FormElement, Input, Image } from "@nextui-org/react";
import { ChangeEvent } from "react";

interface ResourceSearchBarProps {
    placeholder: string;
    onChange: (e: ChangeEvent<FormElement>) => void
}

export const ResourceSearchBar: React.FC<ResourceSearchBarProps> = (props: ResourceSearchBarProps) => {
    return (
        <Input
            size="xl"
            aria-label="Search"
            type="search"
            bordered
            color="primary"
            placeholder={props.placeholder}
            onChange={props.onChange}
            css={{ margin: "25px", paddingTop: "5px" }}
            rounded
            contentLeft={<Image alt="Search Resources" src="magnifierflat.svg"></Image>}
        />
    )
}
