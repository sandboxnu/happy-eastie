import React, { useState } from 'react'
import { Card, Row, Text, Col, Link, Image } from '@nextui-org/react';
import { Resource } from '../../models/types';
import styles from './ResourceCardDisplay.module.css';
import Tag from "../../components/tag";
import TagsMap from "../../models/TagsMap";
import Bookmark from "../../components/bookmark";
import Dialog from '../dialog';
import {WithId} from 'mongodb';
import ReactMarkdown from 'react-markdown';

interface ResourceCardDisplayProps {
    resource: WithId<Resource>;
}

export const ResourceCardDisplay: React.FC<ResourceCardDisplayProps> = (props: ResourceCardDisplayProps) => {
    const [visible, setVisible] = useState(false);
    const toggleState = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <Card isHoverable className={styles.card}>
                <Card.Header>
                    <Row justify='space-between'>
                        <Text b className={styles.cardHeader}>{props.resource.name}</Text>
                        <Bookmark enabled={false} />
                    </Row>
                </Card.Header>

                <Card.Body css={{ py: "$10", pb: "$15" }}>
        <Link href={"/resources/" + props.resource._id}>

                    <Col>
                        <Row justify="flex-start" css={{ gap: 10, pb: "$10", paddingLeft: 20 }}>
                            {props.resource.category?.map((tag, index) => (
                                <Tag text={tag} color={TagsMap().get(tag) ?? "black"} key={index} />
                            ))}
                        </Row>
                        <Row>
                            <ReactMarkdown className={styles.cardSummary}>
                                {props.resource.description ?? ""}
                            </ReactMarkdown>
                        </Row>
                    </Col>
        </Link>

                </Card.Body>

                <Card.Divider />

                <Card.Footer>
                    <Row justify="flex-start">
                        <ApplyForResourceButtons toggleState={toggleState}/>
                        <CallResourceButtons toggleState={toggleState}/>
                    </Row>
                </Card.Footer>
            </Card>
        <Dialog title="New feature" message="Stay tuned... This feature is coming soon!!" visible={visible} onCloseHandler={toggleState}/>
        </div>
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
                <Text className={styles.cardFooter}>Apply Online</Text>
            </Row>
        </Link>
    )
}

const  CallResourceButtons : React.FC<ChildProps> = (props: ChildProps) => {
    return (
        <Link href="#" onPress={() => props.toggleState()}>
            <Row css={{ px: "0" }}>
                <Image src="/phone.svg" alt="Call"></Image>
                <Text className={styles.cardFooter}>By Phone</Text>
            </Row> 
        </Link>
    )
}
