import { IncomeRange } from "../../../models/types2";
import {FormElement, Input, Text, Textarea} from "@nextui-org/react"

interface IncomeRangeRowProps {
    size: number
    range: IncomeRange
    editing: boolean
    onChange: (mutator: (ranges?: IncomeRange[]) => IncomeRange[] | undefined) => void
}


  
export default function IncomeRangeRow({size, range, editing, onChange} : IncomeRangeRowProps){

    const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        //todo: there's gotta be a better way to do this, currently there is no data validation and it's not even typesafe
        onChange((ranges) => {
            if(ranges == undefined) return undefined
            ranges = [...ranges]
            ranges[size - 1] = { ...range, [name]: value}
            return ranges
        })
    };

    const minimum = editing ? 
    <Input
    value={range.minimum}
    onChange={handleInputChange}
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
    onChange={handleInputChange}
    bordered
    borderWeight="light"
    name="maximum"
    color="primary"
    css={{ my: "5px" }}
    /> : 
    range.maximum

    return <Text>{size}🕴️${minimum} - ${maximum}</Text>
}