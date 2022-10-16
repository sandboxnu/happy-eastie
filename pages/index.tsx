import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Event } from "../models/types";
import Header from "../components/header";
import { Grid, Image, Text, Button, Spacer, Card, Row, Col } from "@nextui-org/react";
import Tag from "../components/tag";
import TagsMap from "../models/TagsMap";
import Bookmark from "../components/bookmark";

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
      tags: ["Childcare", "Any Income"],
    },
    {
      name: "Women, Infants, & Children",
      imageFilename: "happychildliftingbarbell.png",
      summary: "Tap to learn more about WIC, providing free services for those who qualify.",
      tags: ["Any Income"],
    },
  ];

  return (
    <Grid.Container justify="center" gap={8}>
      <Row align="baseline">
        <img src="triangle.svg" />
        <Spacer x={0.8} />
        <Text h1>Trending Near You</Text>
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "safe center",
          overflowX: "auto",
          width: "100vw",
        }}
      >
        {events.map((event, index) => (
          <Grid key={index}>
            <Card isPressable css={{ width: "400px" }}>
              <Card.Body css={{ p: 0, borderBottom: "10px solid var(--brand-primary)" }}>
                <Card.Image src={event.imageFilename} objectFit="cover" width="100%" />
              </Card.Body>
              <Card.Footer>
                <Col>
                  <Row justify="space-between">
                    <Text b>{event.name}</Text>
                    <Bookmark enabled={false} />
                  </Row>
                  <Spacer y={0.5} />
                  <Text>{event.summary}</Text>
                  <Spacer y={1} />
                  <Row justify="flex-start" css={{ gap: 10 }}>
                    {event.tags.map((tag, index) => (
                      <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
                    ))}
                  </Row>
                </Col>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </div>
    </Grid.Container>
  );
}

function DirectoryComponent() {
  type TableLinkProps = {
    name: string;
  };

  const TableLink = (props: TableLinkProps) => (
    <td>
      <a href="resources" style={{ color: "var(--text-primary)" }}>
        {props.name}
      </a>
    </td>
  );

  return (
    <Grid.Container justify="center" gap={8}>
      <Row align="baseline">
        <img src="star.svg" />
        <Spacer x={0.8} />
        <Text h1>Resource Directory</Text>
      </Row>
      <Row>{/* Add the search bar and buttons here */}</Row>
      <Row justify="center">
        <table className="table-content" style={{}}>
          <tbody>
            <tr>
              <TableLink name="Early Childhood" />
              <TableLink name="Cash Assistance" />
            </tr>
            <tr>
              <TableLink name="Healthcare" />
              <TableLink name="Housing" />
            </tr>
            <tr>
              <TableLink name="Food" />
              <TableLink name="Young Parents" />
            </tr>
          </tbody>
        </table>
      </Row>
    </Grid.Container>
  );
}

export default Home;
