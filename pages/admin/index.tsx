import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { addEventHandlerGenerator, useEvents } from '../../hooks/useEvents'
import { EventInfo } from '../../models/types'
import { useSWRConfig } from 'swr'
import { EventsDisplay } from '../../components/admin/EventsDisplay'
import { CreateEventForm } from '../../components/admin/CreateEventForm'

const Home: NextPage = () => {
    const { mutate } = useSWRConfig()
    const {events, isLoading, error} = useEvents()

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>loading...</div>
    if (!events) return <div>Interval server: could not load events</div>
    
    async function onSubmit(values: any) {
        const bodyContent : EventInfo = {
            name: values.name,
            description: values.description,
            summary: values.summary
        }

        mutate('/api/events', addEventHandlerGenerator(bodyContent), { revalidate: false })
        
    };

    return (
        <div className={styles.container}>
            <h1>Admin Page</h1>
            <Link href='/'>Back to Home</Link>
            <br />
            <br />
            <CreateEventForm onSubmitHandler={onSubmit}/>
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
