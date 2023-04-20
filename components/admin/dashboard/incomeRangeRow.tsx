import { IncomeRange } from "../../../models/types2";
import {FormElement, Text, Textarea} from "@nextui-org/react"

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

        onChange((ranges) => {
            if(ranges == undefined) return undefined
            ranges = [...ranges]
            ranges[size + 1] = { ...range, [name]: value}
            return ranges
        })
    };

    const minimum = editing ? 
    <Textarea
    value={range.minimum}
    onChange={handleInputChange}
    /> : 
    range.minimum

    const maximum = editing ?
    <Textarea
    value={range.maximum}
    onChange={handleInputChange}
    /> : 
    range.maximum

    return <Text>{size}🕴️${minimum} - ${maximum}</Text>
}