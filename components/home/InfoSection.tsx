import { Grid, Image, Text, Button, Spacer, Link } from "@nextui-org/react";
import styles from "./Home.module.css"
import NextLink from "next/link"
import NextImage from "next/image"
export default function InfoSection() {
    return (
      <Grid.Container gap={2} justify="center" css={{mt: 10, mb: 20}}>
        <Grid xs={12} sm={5}>
          <Image alt="Default Image" src="/homeImage2.svg" objectFit="scale-down"/>
        </Grid>
        <Grid xs={12} sm={7} direction="column" alignItems="center">
          <Text className={styles.title}>Here to help find the resources for you!</Text>
          <Spacer y={2} />
          <Text className={styles.subtitle}>
            Tap &quot;Help My Search&quot; to answer questions and get personalized resource results.
          </Text>
          <Spacer y={2} />
          <Button className={styles.button} shadow>
            <NextLink href="/quiz">
                Help My Search
            </NextLink>
          </Button>
        </Grid>
      </Grid.Container>
    );
  }