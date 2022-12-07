import { Grid } from '@nextui-org/react';
import { Link, Image, Text } from "@nextui-org/react";

export default function Footer() {

    return (
        <Grid.Container direction='row' className='footer-grid'>
            <Grid xs={3} alignItems='flex-start' style={{paddingLeft: 10}}>
                <Image src="/HappyEastieWhite.svg" alt="HappyEastie" style={{marginTop: 50}}/>
            </Grid>
            <Grid xs={6}>
                <Grid.Container direction='row'> 
                    <Grid xs={12} sm={6} justify="center">
                        <Link className='footer-link' href="/quiz">Quiz</Link>                   
                    </Grid>
                    <Grid xs={12} sm={6} justify="center">
                        <Link className='footer-link' href="/directory">Resource</Link>
                    </Grid>
                    <Grid xs={12} sm={6} justify="center">
                        <Link className='footer-link' href="/#">Community Events</Link>
                    </Grid>
                    <Grid xs={12} sm={6} justify="center">
                        <Link className='footer-link' href="/about">About Us</Link>
                    </Grid>
                </Grid.Container>
            </Grid>
            <Grid xs={3} justify="flex-end" style={{paddingRight: 10}}>
                <Grid.Container direction='row'>
                    <Grid xs={12} alignItems='flex-end'>
                        <Text className='footer-link-description '>Made by Sandbox</Text>
                    </Grid>
                    <Grid xs={12} alignItems='flex-start'>
                        <Link underline className='footer-link' href='https://www.sandboxnu.com'>https://www.sandboxnu.com</Link>
                    </Grid>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )

}