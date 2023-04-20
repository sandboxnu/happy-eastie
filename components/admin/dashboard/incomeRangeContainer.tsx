import { useRef, useState } from "react"
import {IncomeRange} from "./../../../models/types2"
import IncomeRangeRow from "./incomeRangeRow"
import {Text} from "@nextui-org/react"

interface IncomeRangeContainerProps {
    ranges?: IncomeRange[]
    editing: boolean
    onChange: (mutator: (ranges?: IncomeRange[]) => IncomeRange[] | undefined) => void
}
export default function IncomeRangeContainer({ranges, editing, onChange} : IncomeRangeContainerProps) {
    return <>
        {ranges?.map((range,i) => <IncomeRangeRow key={i} size={i+1} range={range} editing={editing} onChange={onChange}/>) ?? <Text>No income ranges specified.</Text>}
    </>
}