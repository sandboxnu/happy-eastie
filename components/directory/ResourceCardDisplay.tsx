import React from 'react'
import { Card, Text } from '@nextui-org/react';
import { Resource } from '../../models/types';

interface ResourceCardDisplayProps {
    resource: Resource;
}

export const ResourceCardDisplay: React.FC<ResourceCardDisplayProps> = (props: ResourceCardDisplayProps) => {
    return (
        <Card isPressable isHoverable css={{ mw: "600px" }}>
            <Card.Body>
                <Text>{props.resource.name}</Text>
            </Card.Body>
        </Card>
    )
}
