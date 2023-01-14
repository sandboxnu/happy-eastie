import { Container, Grid, Text } from "@nextui-org/react"

const mockItems = [0,1,2,3,4,5,6,7,8,9]
export default function Test() {
    return (
<Grid.Container gap={8}>
        {mockItems.map(i => (
            <Grid key={i} sm={6} xs={12}>
                <Text>Item {i}</Text>
            </Grid>
        ))}
    </Grid.Container>
        )
}