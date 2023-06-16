import { Card, Row, Spacer, Text, Image, Container, Link, Grid } from "@nextui-org/react";
import Bookmark from "../bookmark";
import styles from "./TrendingSection.module.css"
import NextLink from "next/link"
import HomeStyles from "./Home.module.css"
import Tag from "../tag";
import { useRouter } from "next/router";

const defaultEvents = [
  {
    name: "Women, Infants, & Children",
    imageFilename: "happychildliftingbarbell.png",
    summary: "Learn more about WIC, providing free services for those who qualify.",
    tags: ["Childcare", "Healthcare", "Any Income"],
  },
  {
    name: "Healthy Baby, Healthy Mama",
    imageFilename: "healthyBabyHealthyMama.png",
    summary: "Learn if you and your child may be eligible for this service. If you are eligible, please apply! Adding more text to make this summary longer! One more sentence.",
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
    summary: "Click here if you are in need of emergency housing.",
    tags: ["Housing"],
  },
];

export type EastieEvent = {
  id?: string
  name: string,
  imageFilename: string,
  summary: string,
  tags: string[]
}

function EventCard({ event }: { event: EastieEvent }) {

  const router = useRouter()
  return (
    <Card isPressable className={styles.eventCard}>
      <Card.Header css={{ p: 0, borderBottom: "10px solid var(--brand-primary)", height: "50%", marginBottom: "15px" }}>
        <Card.Image src={event.imageFilename} objectFit="scale-down" width="100%" />
      </Card.Header>

      <Card.Body css={{ paddingTop: "0px", paddingLeft: "21px", paddingRight: "21px", overflowY: "hidden" }}>
        <NextLink href={event.id? `/resources/${event.id}` : '/future'}>
          <Link css={{ flexDirection: "column" }}>
            <Row css={{ display: "flex", alignItems: "center" }} justify="space-between">
              <Text b className={styles.eventCardHeaderText}>{event.name}</Text>
              <Bookmark enabled={false} />
            </Row>
            <Spacer y={0.25} />
            <Text className={styles.eventCardBodyText}>{event.summary}</Text>
            <Spacer y={1} />
          </Link>
        </NextLink>
      </Card.Body>

      <Card.Footer>
        <Grid.Container css={{ gap: 10 }}>
          {event.tags.map((tag, index) => (
            <Grid key={index}>
              <Tag text={tag} key={index} />
            </Grid>
          ))}
        </Grid.Container>
      </Card.Footer>
    </Card >
  )
}
export default function TrendingSection({events = defaultEvents}: {events?: EastieEvent[]} ) {
  return (
    <Container className={styles.container} fluid>
      <Row align="baseline">
        <Image src="triangle.svg" alt="" containerCss={{ margin: 0 }} />
        <Spacer x={0.8} />
        <Text h1 className={HomeStyles.sectionHeader}>Trending Near You</Text>
      </Row>
      <Spacer y={1} />
      <Row gap={4} className={styles.eventCardsRow}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </Row>
      <Spacer y={2} />
    </Container>
  );
}
