import React, { useState } from 'react'
import { Card, Row, Text, Col, Link, Image, Spacer } from '@nextui-org/react';
import { Resource } from '../../models/types2';
import styles from './ResourceCardDisplay.module.css';
import Tag from "../../components/tag";
import TagsMap from "../../models/TagsMap";
import Bookmark from "../../components/bookmark";
import Dialog from '../dialog';
import { WithId } from 'mongodb';
import NextLink from "next/link"

interface ResourceCardDisplayProps {
    resource: WithId<Resource>;
}

export const ResourceCardDisplay: React.FC<ResourceCardDisplayProps> = (props: ResourceCardDisplayProps) => {
    const [visible, setVisible] = useState(false);
    const toggleState = () => {
        setVisible(!visible);
    };

    return (
        <>
            <Card isHoverable variant="flat" className={styles.card}>
                <Card.Header css={{ marginBottom: "0px" }}>
                    <Row css={{ display: "flex", alignItems: "center", marginTop: "25px", paddingRight: "20px" }} justify='space-between'>
                        <NextLink href={"/resources/" + props.resource._id}>
                            <Text b className={styles.cardHeader}>{props.resource.name}</Text>
                        </NextLink>
                        <Bookmark enabled={false} />
                    </Row>
                </Card.Header>
                <Card.Body css={{ marginTop: "0px", paddingTop: "0px" }}>
                    <NextLink href={"/resources/" + props.resource._id}>
                        <Link>
                            <Col>
                                <Row justify="flex-start" css={{ gap: 10, pb: "$10", paddingLeft: 20, flexWrap: "wrap" }}>
                                    {props.resource.category?.map((tag, index) => (
                                        <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
                                    ))}
                                </Row>
                                <Row>
                                    <Text className={styles.cardSummary}>
                                        {props.resource.summary ?? ""}
                                    </Text>
                                </Row>
                            </Col>
                        </Link>
                    </NextLink>
                </Card.Body>

                <Card.Divider />

                <Card.Footer className={styles.cardFooter}>
                    <Row justify="flex-start">
                        <ApplyForResourceButtons toggleState={toggleState} />
                        <CallResourceButtons toggleState={toggleState} />
                    </Row>
                </Card.Footer>
            </Card>
            <Dialog title="New feature" message="Stay tuned... This feature is coming soon!!" visible={visible} onCloseHandler={toggleState} />
        </>
    )
}

type ChildProps = {
    toggleState: () => void;
}

const ApplyForResourceButtons: React.FC<ChildProps> = (props: ChildProps) => {
    return (
        <Link href="#" onPress={() => props.toggleState()}>
            <Row css={{ px: "0", display: "flex", alignItems: "center" }}>
                <Image src="/laptop.svg" alt="Apply"></Image>
                <Text className={styles.cardFooterText}>Apply Online</Text>
            </Row>
        </Link>
    )
}

const CallResourceButtons: React.FC<ChildProps> = (props: ChildProps) => {
    return (
        <Link href="#" onPress={() => props.toggleState()}>
            <Row css={{ px: "0", display: "flex", alignItems: "center" }}>
                <Image src="/phone.svg" alt="Call"></Image>
                <Text className={styles.cardFooterText}>By Phone</Text>
            </Row>
        </Link>
    )
}
