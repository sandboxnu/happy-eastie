import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useEvents } from '../../hooks/useEvents'
import { useSWRConfig } from 'swr'
import { EventsDisplay } from '../../components/admin/EventsDisplay'
import { CreateEventForm } from '../../components/admin/CreateEventForm'

const Home: NextPage = () => {
    const {events, isLoading, error} = useEvents()

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>loading...</div>
    if (!events) return <div>Interval server: could not load events</div>

    return (
        <div className={styles.container}>
            <h1>Admin Page</h1>
            <Link href='/'>Back to Home</Link>
            <br />
            <br />
            <CreateEventForm />
            <br />
            <EventsDisplay events={events}/>
            <br />
            <br />
            {/* TODO: Currently just goes back to home page */}
            <Link href='/'>Log Out</Link>
        </div>
    )
}

export default Home
