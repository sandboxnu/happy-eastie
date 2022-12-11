import type { NextPage } from "next";
import Header from "../components/header";
import Footer from "../components/footer"
import { Grid, Image, Text, Button, Spacer, Card, Row, Col } from "@nextui-org/react";
import Tag from "../components/tag";
import TagsMap from "../models/TagsMap";
import Bookmark from "../components/bookmark";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <div style={{ margin: "0 20px" }}>
        <InfoComponent />
        <TrendingComponent />
        <DirectoryComponent />
      </div>
      <Footer/>
    </div>
  );
};

function InfoComponent() {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={5}>
        <Image alt="Default Image" src="/homeImage2.svg" objectFit="scale-down" />
      </Grid>
      <Grid xs={12} sm={7} direction="column" alignItems="center">
        <Text className={"homepage-title"}>Here to help find the resources for you!</Text>
        <Spacer y={2} />
        <Text className={"homepage-subtitle"}>
          Tap &quot;Help My Search&quot; to answer questions and get personalized resoure results.
        </Text>
        <Spacer y={2} />
        <Button className="homepage-button" shadow>
          <Link href="/quiz">Help My Search</Link>
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
      summary: "Learn more about WIC, providing free services for those who qualify.",
      tags: ["Childcare", "Healthcare", "Any Income"],
    },
    {
      name: "Healthy Baby, Healthy Mama",
      imageFilename: "healthyBabyHealthyMama.png",
      summary: "Learn if you and your child may be eilgible for this service.",
      tags: ["Childcare", "Healthcare", "Any Income"],
    },
    {
      name: "Eastie Week 2022",
      imageFilename: "eastieWeek2022.png",
      summary: "Learn more about this celebration of East Boston!",
      tags: ["Community", "Events", "Family-Friendly"],
    },
  ];

  return (
    <Grid.Container justify="center" gap={8} xs={12}>
      <Row align="baseline">
        <Image src="triangle.svg" alt="" containerCss={{ margin: 0 }} />
        <Spacer x={0.8} />
        <Text h1>Trending Near You</Text>
      </Row>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          width: "95vw",
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
      <Link href="/directory" style={{color: "black"}}>
        {props.name}
      </Link>
    </td>
  );

  return (
    <Grid.Container justify="center">
      <Row align="baseline">
        <Image src="star.svg" alt="" containerCss={{ margin: 0 }} />
        <Spacer x={0.8} />
        <Link href="/directory"><Text h1>Resource Directory</Text></Link>
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
      <Spacer />
    </Grid.Container>
  );
}

export default Home;
