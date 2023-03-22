import React, { SyntheticEvent, useState } from 'react'
import { Card, Row, Text, Col, Link, Image } from '@nextui-org/react';
import { Resource } from '../../models/types2';
import styles from './ResourceCardDisplay.module.css';
import Tag from "../../components/tag";
import TagsMap from "../../models/TagsMap";
import Bookmark from "../../components/bookmark";
import Dialog from '../dialog';
import { WithId } from 'mongodb';
import { useRouter } from "next/router";

interface ResourceCardDisplayProps {
    resource: WithId<Resource>;
}

export const ResourceCardDisplay: React.FC<ResourceCardDisplayProps> = (props: ResourceCardDisplayProps) => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const toggleState = () => {
        setVisible(!visible);
    };

    const handleResourceCardPress = (e: any) => {
        e.preventDefault();
        router.push("/resources/" + props.resource._id);
    }

    return (
        <>
            <Card isHoverable isPressable variant="flat" className={styles.card} onPress={(e) => handleResourceCardPress(e)}>
                <Card.Header css={{ marginBottom: "0px" }}>
                    <Row css={{ display: "flex", alignItems: "center", marginTop: "25px", paddingRight: "20px" }} justify='space-between'>
                        <Text b className={styles.cardHeaderText}>{props.resource.name}</Text>
                        <Bookmark enabled={false} />
                    </Row>
                </Card.Header>
                <Card.Body css={{ marginTop: "0px", paddingTop: "0px" }}>
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
