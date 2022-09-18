import type { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
    // TODO: acquire this list of events from Firebase
    const [communityEvent, setCommunityEvent] = useState("");
    const [communityEventList, setCommunityEventList] = useState<string[]>([]);

    const handleChangeEvent = (event: { target: { value: any } }) => {
        setCommunityEvent(event.target.value);
    };

    // TODO: need to actually send the updated list of events to Firestore
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (communityEvent !== "") {
            setCommunityEventList([...communityEventList, communityEvent]);
            setCommunityEvent("");
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
                    placeholder="Add an event..."
                    value={communityEvent}
                    className='add-item-input'
                    name="event"
                    onChange={handleChangeEvent}
                />

                <button type="submit">Add</button>
            </form>

            <ul>
                {communityEventList.map((communityEvent) => (
                    <li key={communityEvent}>{communityEvent}</li>
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
