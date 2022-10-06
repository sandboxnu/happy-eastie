import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useEvents } from '../../hooks/useEvents'
import { Event } from '../../models/types'
import { EventCardDisplay } from '../../components/EventCardDisplay'

const Home: NextPage = () => {
    // const { events, isLoading, isError } = useEvents()
    // TODO: acquire this list of events from Firebase
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventSummary, setEventSummary] = useState("");
    const [communityEventList, setCommunityEventList] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventList = await fetch('/api/events').then(res => res.json());
            setCommunityEventList(eventList)
        }
        fetchEvents()
    }, [communityEventList])

    // if (isError) return <div>failed to load</div>
    // if (isLoading) return <div>loading...</div>


    const handleChangeName = (event: { target: { value: any } }) => {
        setEventName(event.target.value);
    };

    const handleChangeDescription = (event: { target: { value: any } }) => {
        setEventDescription(event.target.value);
    };

    const handleChangeSummary = (event: { target: { value: any } }) => {
        setEventSummary(event.target.value);
    };

    // TODO: need to actually send the updated list of events to Firestore
    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string },
            description: { value: string },
            summary: { value: string }
        }
        const bodyContent = {
            name: target.name.value,
            description: target.description.value,
            summary: target.summary.value
        }

        if (eventName !== "") {
            setCommunityEventList([...communityEventList]);
            setEventName("");
            setEventDescription("");
            setEventSummary("");

            await fetch('/api/events', { method: 'POST', body: JSON.stringify(bodyContent), headers: { 'Content-Type': 'application/json' } }).then(res => res.json())
            const newEventList = await fetch('/api/events').then(res => res.json())
            console.log("NEW EVENT LIST", newEventList);
            setCommunityEventList(newEventList)
        }
    };

    return (
        <div className={styles.container}>
            <h1>Admin Page</h1>
            <Link href='/'>Back to Home</Link>
            <br />
            <br />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name of event..."
                    value={eventName}
                    className='add-item-input'
                    name="name"
                    onChange={handleChangeName}
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="Description of event..."
                    value={eventDescription}
                    className='add-item-input'
                    name="description"
                    onChange={handleChangeDescription}
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="Summary of event..."
                    value={eventSummary}
                    className='add-item-input'
                    name="summary"
                    onChange={handleChangeSummary}
                />

                <br />
                <br />

                <button type="submit">Add</button>
            </form>

            <ul>
                {communityEventList?.map((communityEvent: Event) => (
                    <div style={{}} key={communityEvent.id}>
                        <EventCardDisplay event={communityEvent}></EventCardDisplay>
                    </div>
                    // <li key={communityEvent.id}>{communityEvent.name}</li>
                ))}
            </ul>

            <br />
            <br />

            {/* TODO: Currently just goes back to home page */}
            <Link href='/'>Log Out</Link>
        </div>
    )
}

export default Home
