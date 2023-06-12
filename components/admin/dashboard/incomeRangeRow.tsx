import { IncomeRange } from "../../../models/types2";
import {Button, FormElement, Input, Text, Textarea, Image, Container} from "@nextui-org/react"

interface IncomeRangeRowProps {
    size: number
    range: IncomeRange
    editing: boolean
    onChange: (mutator: (ranges?: IncomeRange[]) => IncomeRange[] | undefined) => void
}

interface IncomeRangeInputProps {
    value: number
    onChange: (e: React.ChangeEvent<FormElement>) => void
}

function IncomeRangeInput({value, onChange}: IncomeRangeInputProps) {
    return  <Input
    value={value}
    onChange={onChange}
    bordered
    name="minimum"
    borderWeight="light"
    color="primary"
    css={{ my: "5px", width: "20%", mx:"" }}
    
    />
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
    <IncomeRangeInput
    value={range.minimum}
    onChange={handleMinimumChange}    
    /> : 
    <Text>{range.minimum}</Text>

    const maximum = editing ?
    <IncomeRangeInput
    value={range.maximum}
    onChange={handleMaximumChange}
    /> : 
    <Text>range.maximum</Text>

    const deleteButton = <Button
    css={{
        minWidth: '0',
        backgroundImage: "url('/greyx.svg')",
        backgroundSize: "90% 90%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "transparent",
        maxHeight: "40%",
        maxWidth: "40%"}}
        onClick={deleteRange}>
            
    </Button>

    const person = <Image src="/personBlack.svg" alt=""
    containerCss={{
        width: "5%",
        height: "100%",
        margin: "0 2%",
        top: "2%"
    }}/>


    return <Container
            direction="row"
            display="flex"
            alignItems="center"
            css={{
                padding: 0
            }}>
            <Text>{size}</Text>
            {person} 
            <Text>$</Text>
            {minimum}
            <Text css={{marginLeft: 5}}> - $</Text>
            {maximum}
            {editing && deleteButton}
            </Container>
}