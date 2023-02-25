import { Card, Col, Grid, Row, Spacer, Text, Image, Container, Link } from "@nextui-org/react";
import TagsMap from "../../models/TagsMap";
import Bookmark from "../bookmark";
import Tag from "./tag";
import styles from "./TrendingSection.module.css"
import NextLink from "next/link"
import HomeStyles from "./Home.module.css"

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
        <Card isPressable className={styles.eventCard}>
        <Card.Header className={styles.eventCardImageHeader}>
          <Card.Image css={{borderBottom: "10px solid var(--brand-primary)"}} src={event.imageFilename} objectFit="fill" width="100%" />
        </Card.Header>
        <Card.Body css={{paddingTop:"0px", paddingLeft:"21px", paddingRight:"21px", overflowY: "hidden"}}>
          <NextLink href="/future">
            <Link css={{flexDirection: "column"}}>
            <Row css={{display:"flex", alignItems:"center"}} justify="space-between">
              <Text b className={styles.eventCardHeaderText}>{event.name}</Text>
              <Bookmark enabled={false} />
            </Row>
            <Spacer y={0.5} />
            <Text className={styles.eventCardBodyText}>{event.summary}</Text>
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
          <Text h1 className={HomeStyles.sectionHeader}>Trending Near You</Text>
        </Row>
        <Row gap={4} className={styles.eventCardsRow}>
          {events.map((event, index) => (
            <EventCard key={index} event={event}/>
          ))}
        </Row>
      </Container>
    );
  }