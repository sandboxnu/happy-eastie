import { Card, Col, Grid, Row, Spacer, Text, Image, Container, Link } from "@nextui-org/react";
import TagsMap from "../../models/TagsMap";
import Bookmark from "../bookmark";
import Tag from "./tag";
import styles from "./TrendingSection.module.css"
import NextLink from "next/link"

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
    {
      name: "Pine Street Inn Emergency Shelters",
      imageFilename: "https://www.pinestreetinn.org/site/assets/images/banners/banner-find-help-guest.jpg",
      summary: "Clickk here if you are in need of emergency housing.",
      tags: ["Housing"],
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
        <Card isPressable className={styles.event}>
        <Card.Header css={{ p: 0, borderBottom: "10px solid var(--brand-primary)", height: "40%"}}>
          <Card.Image src={event.imageFilename} objectFit="cover" width="100%" />
        </Card.Header>
        <Card.Body css={{overflowY: "hidden"}}>
          <NextLink href="/future">
            <Link css={{flexDirection: "column"}}>
            <Row justify="space-between">
              <Text b>{event.name}</Text>
              <Bookmark enabled={false} />
            </Row>
            <Spacer y={0.5} />
            <Text>{event.summary}</Text>
            <Spacer y={1} />
            </Link>
          </NextLink>
        </Card.Body>
        <Card.Footer>
            <Row justify="flex-start" css={{ gap: 10 }}>
              {event.tags.map((tag, index) => (
                <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
              ))}
            </Row>
            </Card.Footer>
      </Card>
    )
}
export default function TrendingSection() {  
    return (
      <Container className={styles.container} fluid>
        <Row align="baseline">
          <Image src="triangle.svg" alt="" containerCss={{ margin: 0 }} />
          <Spacer x={0.8} />
          <Text h1>Trending Near You</Text>
        </Row>
        <Row gap={4} className={styles.events}>
          {events.map((event, index) => (
            <EventCard key={index} event={event}/>
          ))}
        </Row>
      </Container>
    );
  }