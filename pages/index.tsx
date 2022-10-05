import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import { Grid, Image, Text, Button } from "@nextui-org/react";

const Home: NextPage = () => {
  return (
    <div>
      <Header/>
      <Grid.Container gap={2} justify="center" direction='column'>
      <Grid>
        <InfoComponent/>
      </Grid>
      <Grid>
        <TrendingComponent/>
      </Grid>
      <Grid>
        <DirectoryComponent/>
      </Grid>
      </Grid.Container>
    </div>
  )
}

function InfoComponent() {
  return (
    <Grid.Container gap={2} justify="center">
    <Grid>
      <Image alt="Default Image" src="/homeImage.svg" objectFit="scale-down"/>
    </Grid>
    <Grid direction="column">
      <Text>Here to help find the resources for you!</Text>
      <Text>Tap "Help My Search" to answer questions and get personalized resoure results</Text>
      <Button shadow>Help My Search</Button>
    </Grid>
    </Grid.Container>
  )
}

function TrendingComponent() {
  return (
    <div/>
  );
}

function DirectoryComponent() {
  return (
    <div/>
  );
}

export default Home
