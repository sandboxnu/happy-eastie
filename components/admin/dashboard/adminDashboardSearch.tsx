import { Button, Input } from "@nextui-org/react"
import { WithId } from "mongodb"
import { ChangeEvent } from "react"
import { Resource } from "../../../models/types2"
import { FormElement } from "@nextui-org/react";

type SearchProps = {
    setResourcesDisplayed: any
}

export const AdminDashboardSearch = (props: SearchProps) => {
    const onSearchChange = (event: ChangeEvent<FormElement>) => {
        const searchInput = event.target.value
        props.setResourcesDisplayed((resources: WithId<Resource>[]) =>
            resources 
        )
    }

    return <> 
        <Input fullWidth bordered placeholder="Search" onChange={onSearchChange} labelRight={<img src="/magnifierflat.svg"></img>}></Input>
        <Button auto iconRight={<img src="/filter.svg"></img>}>Filters</Button>
    </>
}