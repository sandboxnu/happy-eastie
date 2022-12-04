import { Grid } from '@nextui-org/react';
import { Link, Image, Text } from "@nextui-org/react";

export default function Footer() {

    return (
        <Grid.Container direction='row' className='footer-grid'>
            <Grid md={3}>
                <Image src="/HappyEastieWhite.svg" alt="HappyEastie" style={{}}/>
            </Grid>
            <Grid md={6}>
                <Grid.Container direction='row'> 
                    <Grid md={6}>
                        <Link className='footer-link' href="/quiz">Quiz</Link>                    
                    </Grid>
                    <Grid md={6}>
                        <Link className='footer-link' href="/resources">Resource</Link>
                    </Grid>
                    <Grid md={6}>
                        <Link className='footer-link' href="/#">Community Events</Link>
                    </Grid>
                    <Grid md={6}>
                        <Link className='footer-link' href="/about">About Us</Link>
                    </Grid>
                </Grid.Container>
            </Grid>
            <Grid md={3} justify="flex-end">
                <Grid.Container direction='row'>
                    <Grid md={12}>
                        <Text className='footer-link'>Made by Sandbox</Text>
                    </Grid>
                    <Grid md={12}>
                        <Link className='footer-link' href='https://www.sandboxnu.com'>https://www.sandboxnu.com</Link>
                    </Grid>
                </Grid.Container>
                

                
            </Grid>
        </Grid.Container>
    )

}