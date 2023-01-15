import { Container, Grid, Radio, Text } from "@nextui-org/react"
import { useState } from "react"

const mockItems = ["blake", "hey", "man", "test"]
export default function Test() {
    const [broken, setBroken] = useState<undefined | string>(undefined)
    console.log(broken)
    return (
        <>
        <Radio.Group value={broken} onChange={setBroken}>
            {mockItems.map(s => <Radio value={s} key={s}>{s}</Radio>)}
        </Radio.Group>
        <button onClick={() => {
            setBroken(null)
            console.log(broken)
            console.log("heehee")}}>fuck</button>
        </>

        )
}