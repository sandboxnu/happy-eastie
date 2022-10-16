import { Event } from "../../models/types";
import { EventCardDisplay } from "./EventCardDisplay";

interface EventsDisplayProps {
    events: Event[];
}

export const EventsDisplay: React.FC<EventsDisplayProps> = (props: EventsDisplayProps) => {
    return (
        <ul>
            {props.events?.map((communityEvent: Event) => (
                <div style={{}} key={communityEvent.id}>
                    <EventCardDisplay event={communityEvent}></EventCardDisplay>
                </div>
            ))}
        </ul>
    )
}
