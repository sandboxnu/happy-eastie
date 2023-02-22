import React, { useState } from 'react'
import { Card, Row, Text, Col, Link, Image } from '@nextui-org/react';
import { Resource } from '../../models/types2';
import styles from './ResourceCardDisplay.module.css';
import Tag from "../../components/tag";
import TagsMap from "../../models/TagsMap";
import Bookmark from "../../components/bookmark";
import Dialog from '../dialog';
import {WithId} from 'mongodb';
import ReactMarkdown from 'react-markdown';
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
            <Card isHoverable className={styles.card}>
                <Card.Header>
                    <Row justify='space-between'>
                    <NextLink href={"/resources/" + props.resource._id}>
                        <Text b className={styles.cardHeader}>{props.resource.name}</Text>
                        </NextLink>
                        <Bookmark enabled={false} />
                    </Row>
                </Card.Header>

                <Card.Body css={{ py: "$10", pb: "$15" }}>
                    <NextLink href={"/resources/" + props.resource._id}>
        <Link >

                    <Col>
                        <Row justify="flex-start" css={{ gap: 10, pb: "$10", paddingLeft: 20 }}>
                            {props.resource.category?.map((tag, index) => (
                                <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
                            ))}
                        </Row>
                        <Row>
                            <ReactMarkdown className={styles.cardSummary}>
                                {props.resource.summary ?? ""}
                            </ReactMarkdown>
                        </Row>
                    </Col>
        </Link>
        </NextLink>

                </Card.Body>

                <Card.Divider />

                <Card.Footer className={styles.cardFooter}>
                    <Row justify="flex-start">
                        <ApplyForResourceButtons toggleState={toggleState}/>
                        <CallResourceButtons toggleState={toggleState}/>
                    </Row>
                </Card.Footer>
            </Card>
        <Dialog title="New feature" message="Stay tuned... This feature is coming soon!!" visible={visible} onCloseHandler={toggleState}/>
        </>
    )
}

type ChildProps = {
    toggleState : () => void;
}

const ApplyForResourceButtons : React.FC<ChildProps> = (props: ChildProps) => {
    return (
        <Link href="#" onPress={() => props.toggleState()}>
            <Row css={{ px: "0" }}>
                <Image src="/laptop.svg" alt="Apply"></Image>
                <Text className={styles.cardFooterText}>Apply Online</Text>
            </Row>
        </Link>
    )
}

const  CallResourceButtons : React.FC<ChildProps> = (props: ChildProps) => {
    return (
        <Link href="#" onPress={() => props.toggleState()}>
            <Row css={{ px: "0" }}>
                <Image src="/phone.svg" alt="Call"></Image>
                <Text className={styles.cardFooterText}>By Phone</Text>
            </Row> 
        </Link>
    )
}
