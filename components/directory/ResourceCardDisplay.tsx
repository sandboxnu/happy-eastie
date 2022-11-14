import React from 'react'
import { Card, Row, Text, Col, Link, Image } from '@nextui-org/react';
import { Resource } from '../../models/types';
import styles from '../../styles/Directory.module.css';
import Tag from "../../components/tag";
import TagsMap from "../../models/TagsMap";
import Bookmark from "../../components/bookmark";

interface ResourceCardDisplayProps {
    resource: Resource;
}

export const ResourceCardDisplay: React.FC<ResourceCardDisplayProps> = (props: ResourceCardDisplayProps) => {

    return (
        <Link href={"/resources/" + props.resource.id}>
            <Card isHoverable css={{ width: "515px", height: "300px", backgroundColor: "var(--brand-light-blue)" }}>
                <Card.Header>
                    <Row justify='space-between'>
                        <Text b className={styles.cardHeader}>{props.resource.name}</Text>
                        <Bookmark enabled={false} />
                    </Row>
                </Card.Header>

                <Card.Body css={{ py: "$10", pb: "$15" }}>
                    <Col>
                        <Row justify="flex-start" css={{ gap: 10, pb: "$10" }}>
                            {props.resource.category?.map((tag, index) => (
                                <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
                            ))}
                        </Row>
                        <Row>
                            <Text className={styles.cardSummary}>
                                {props.resource.description}
                            </Text>
                        </Row>
                    </Col>
                </Card.Body>

                <Card.Divider />

                <Card.Footer>
                    <Row justify="flex-start">
                        <ApplyForResourceButtons />
                        <CallResourceButtons />
                    </Row>
                </Card.Footer>
            </Card>
        </Link>
    )
}

function ApplyForResourceButtons() {
    return (
        <Link href="#">
            <Row css={{ px: "0" }}>
                <Image src="/laptop.svg" alt="Apply"></Image>
                <Text className={styles.cardFooter}>Apply Online</Text>
            </Row>
        </Link>
    )
}

function CallResourceButtons() {
    return (
        <Link href="#">
            <Row css={{ px: "0" }}>
                <Image src="/phone.svg" alt="Call"></Image>
                <Text className={styles.cardFooter}>By Phone</Text>
            </Row>
        </Link>
    )
}
