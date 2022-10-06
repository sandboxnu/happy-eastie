import React from 'react'
import { Text, Textarea, Input, Card } from '@nextui-org/react';
import { Event } from '../models/types';

interface EventCardDisplayProps {
    event: Event;
}

export const EventCardDisplay: React.FC<EventCardDisplayProps> = (props: EventCardDisplayProps) => {
    return (
        <Card css={{ mw: "400px" }}>
            <Card.Body>
                <Textarea bordered label="Name" placeholder={props.event.name} />
                <Textarea bordered label="Description" placeholder={props.event.description} />
                <Textarea bordered label="Summary" placeholder={props.event.summary} />
            </Card.Body>
        </Card>
    )
}