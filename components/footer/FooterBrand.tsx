import { Grid, Image } from "@nextui-org/react";


//TODO: change to NextJs image
export default function FooterBrand() {
    return (            
    <Grid xs={3} alignItems='flex-start' style={{paddingLeft: 10}}>
    <Image src="/HappyEastieWhite.svg" alt="HappyEastie" style={{marginTop: 50}}/>
</Grid>)
}