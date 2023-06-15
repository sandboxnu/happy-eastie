import { useRef, useState } from "react"
import {IncomeRange} from "../../../models/types"
import IncomeRangeRow from "./incomeRangeRow"
import {Button, Text} from "@nextui-org/react"

interface IncomeRangeContainerProps {
    ranges?: IncomeRange[]
    editing: boolean
    onChange: (mutator: (ranges?: IncomeRange[]) => IncomeRange[] | undefined) => void
}
export default function IncomeRangeContainer({ranges, editing, onChange} : IncomeRangeContainerProps) {

    const addSize = () => {
        onChange((ranges) => {
            if(ranges === undefined) ranges = []

            //taken from https://stackoverflow.com/a/12502559
            let id = Math.random().toString(36).slice(2);
            while(ranges.map(r => r.id).includes(id)) {
                id = Math.random().toString(36).slice(2)
            }

            ranges.push({minimum: 0, maximum: 0, id})

            return ranges
        })
    }

    const addButton = <Button onClick={addSize} css={{width: "40%", minWidth: "0"}}>
    <Text span css={{fontSize: "36px", marginRight: 5, fontWeight: "300", color: "White"}}>+</Text> Add Size
    </Button>

    return <>
        {ranges?.map((range,i) => <IncomeRangeRow key={range.id} size={i+1} range={range} editing={editing} onChange={onChange}/>) ?? <Text>No income ranges specified.</Text>}
        {editing && addButton}

    </>
}