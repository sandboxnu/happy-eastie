import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import { Grid, Image, Text, Button } from "@nextui-org/react";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Grid.Container gap={2} justify="center" direction='column' css={{ color: '$white' }}>
        <Grid>
          <InfoComponent />
        </Grid>
        <Grid>
          <TrendingComponent />
        </Grid>
        <Grid>
          <DirectoryComponent />
        </Grid>
      </Grid.Container>
    </div>
  )
}

function InfoComponent() {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} md={5}>
        <Image alt="Default Image" src="/homeImage.svg" objectFit="scale-down" />
      </Grid>
      <Grid xs={12} md={7} direction="column" justify='space-around' alignItems='center'>
        <Text className={'homepage-title'}>Here to help find the resources for you!</Text>
        <Text className={'homepage-subtitle'}>Tap &quot;Help My Search&quot; to answer questions and get personalized resoure results.</Text>
        <Button className='homepage-button' shadow>Help My Search</Button>
      </Grid>
    </Grid.Container>
  )
}

function TrendingComponent() {
  return (
    <div />
  );
}

function DirectoryComponent() {
  return (
    <div />
  );
}

export default Home
