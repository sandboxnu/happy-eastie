import React from 'react'
import { Button, Card, Row, Text } from '@nextui-org/react';
import { Resource } from '../../models/types';
import router from 'next/router';

interface ResourceCardDisplayProps {
    resource: Resource;
}

export const ResourceCardDisplay: React.FC<ResourceCardDisplayProps> = (props: ResourceCardDisplayProps) => {

    // TODO: make this go to specific resource page once those are built
    const goToResourcePage = () => {
        router.push("/")
    }

    return (
        <Card isPressable onPress={goToResourcePage} isHoverable css={{ mw: "500px" }}>
            <Card.Header>
                <Text b>{props.resource.name}</Text>
            </Card.Header>

            <Card.Divider />

            <Card.Body css={{ py: "$10" }}>
                <Text>
                    {props.resource.description}
                </Text>
            </Card.Body>

            <Card.Divider />

            <Card.Footer>
                <Row justify="flex-end">
                    <Button size="sm" light>Share</Button>
                    <Button size="sm">Learn More</Button>
                </Row>
            </Card.Footer>
        </Card>
    )
}
