import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Event } from "../models/types";
import Header from "../components/header";
import { Grid, Image, Text, Button, Spacer, Card, Row, Col } from "@nextui-org/react";
import Tag from "../components/tag";
import TagsMap from "../models/TagsMap";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Grid.Container gap={2} justify="center" direction="column" css={{ color: "$white" }}>
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
  );
};

function InfoComponent() {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} md={5}>
        <Image alt="Default Image" src="/homeImage.svg" objectFit="scale-down" />
      </Grid>
      <Grid xs={12} md={7} direction="column" alignItems="center">
        <Text className={"homepage-title"}>Here to help find the resources for you!</Text>
        <Spacer y={2} />
        <Text className={"homepage-subtitle"}>
          Tap &quot;Help My Search&quot; to answer questions and get personalized resoure results.
        </Text>{" "}
        <Spacer y={2} />
        <Button className="homepage-button" shadow>
          Help My Search
        </Button>
      </Grid>
    </Grid.Container>
  );
}

function TrendingComponent() {
  const events = [
    {
      name: "Women, Infants, & Children",
      imageFilename: "happychildliftingbarbell.png",
      summary: "Tap to learn more about WIC, providing free services for those who qualify.",
      tags: ["Childcare", "Healthcare", "Any Income"],
    },
    {
      name: "Women, Infants, & Children",
      imageFilename: "happychildliftingbarbell.png",
      summary: "Tap to learn more about WIC, providing free services for those who qualify.",
      tags: ["Childcare", "Healthcare", "Any Income"],
    },
    {
      name: "Women, Infants, & Children",
      imageFilename: "happychildliftingbarbell.png",
      summary: "Tap to learn more about WIC, providing free services for those who qualify.",
      tags: ["Childcare", "Healthcare", "Any Income"],
    },
  ];

  return (
    <Grid.Container alignItems="flex-start" css={{overflowX: "auto"}}>
      <Row align="baseline">
        <img src="triangle.svg" />
        <Spacer x={0.8} />
        <Text h1>Trending near you</Text>
      </Row>
      {events.map((event, index) => (
        <Grid xs sm key={index}>
          <Card isPressable css={{width: "380px"}}>
            <Card.Body css={{ p: 0, borderBottom: "5px solid var(--brand-primary)"}}>
              <Card.Image src={event.imageFilename} objectFit="cover" width="100%" />
            </Card.Body>
            <Card.Footer>
              <Col>
                <Text b>{event.name}</Text>
                <Spacer y={0.5} />
                <Text>{event.summary}</Text>
                <Spacer y={1} />
                <Row justify="space-between">
                  {event.tags.map((tag, index) => (
                    <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
                  ))}
                </Row>
              </Col>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}

function DirectoryComponent() {
  return <div />;
}

export default Home;
