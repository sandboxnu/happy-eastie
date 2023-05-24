import { IncomeRange } from "../../../models/types2";
import {FormElement, Input, Text, Textarea} from "@nextui-org/react"

interface IncomeRangeRowProps {
    size: number
    range: IncomeRange
    editing: boolean
    onChange: (mutator: (ranges?: IncomeRange[]) => IncomeRange[] | undefined) => void
}


  
export default function IncomeRangeRow({size, range, editing, onChange} : IncomeRangeRowProps){

    const handleMinimumChange = (event: React.ChangeEvent<FormElement>) => {
        const value = event.target.value

        onChange((ranges) => {
            if(ranges === undefined) return undefined
            ranges = [...ranges]
            ranges[size-1].minimum = parseInt(value)
            return ranges
        })
    }

    const handleMaximumChange = (event: React.ChangeEvent<FormElement>) => {
        const value = event.target.value

        onChange((ranges) => {
            if(ranges === undefined) return undefined
            ranges = [...ranges]
            ranges[size-1].maximum = parseInt(value)
            return ranges
        })
    }
    const minimum = editing ? 
    <Input
    value={range.minimum}
    onChange={handleMinimumChange}
    bordered
    name="minimum"
    borderWeight="light"
    color="primary"
    css={{ my: "5px" }}
    
    /> : 
    range.minimum

    const maximum = editing ?
    <Input
    value={range.maximum}
    onChange={handleMaximumChange}
    bordered
    borderWeight="light"
    name="maximum"
    color="primary"
    css={{ my: "5px" }}
    /> : 
    range.maximum

    return <Text>{size}🕴️${minimum} - ${maximum}</Text>
}