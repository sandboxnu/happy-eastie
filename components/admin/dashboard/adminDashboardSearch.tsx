import { Button, Input } from "@nextui-org/react"
import { WithId } from "mongodb"
import { ChangeEvent, useEffect } from "react"
import { Resource } from "../../../models/types2"
import { FormElement } from "@nextui-org/react";

type SearchProps = {
    onChange(e: ChangeEvent<FormElement>): void
}

export const AdminDashboardSearch = (props: SearchProps) => {
    return <> 
        <Input fullWidth bordered placeholder="Search" onChange={props.onChange} labelRight={<img src="/magnifierflat.svg"></img>}></Input>
        <Button auto iconRight={<img src="/filter.svg"></img>}>Filters</Button>
    </>
}