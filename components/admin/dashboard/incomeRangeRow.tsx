import { IncomeRange } from "../../../models/types2";
import {Button, FormElement, Input, Text, Textarea} from "@nextui-org/react"

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

    const deleteRange = () => {
        onChange((ranges) => {
            if(ranges === undefined) return undefined
            ranges = ranges.filter(r => r.id !== range.id)
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

    const deleteButton = <Button
    css={{
        minWidth: '0',
        display: 'inline'}}
        onClick={deleteRange}>
            x
    </Button>

    return <Text>{size}🕴️${minimum} - ${maximum} {editing && deleteButton}</Text>
}