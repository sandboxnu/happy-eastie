import { Card, Col, Grid, Row, Spacer, Text, Image } from "@nextui-org/react";
import TagsMap from "../../models/TagsMap";
import Bookmark from "../bookmark";
import Tag from "./tag";

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

type EastieEvent = {
    name: string,
    imageFilename: string,
    summary: string,
    tags: string[]
}

function EventCard({event}: {event: EastieEvent}) {
    return (
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
    )
}
export default function TrendingSection() {  
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
                <EventCard event={event}/>
            </Grid>
          ))}
        </div>
      </Grid.Container>
    );
  }