import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useEvents } from '../../hooks/useEvents'
import { Event } from '../../models/types'
import { EventCardDisplay } from '../../components/EventCardDisplay'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const Home: NextPage = () => {
    const validationSchema = Yup.object({
        name: Yup.string(),
        description: Yup.string(),
        summary: Yup.string(),
      });
    
    const initialValues = {
        name: "",
        description: "",
        summary: "",
      };
    const [communityEventList, setCommunityEventList] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventList = await fetch('/api/events').then(res => res.json());
            setCommunityEventList(eventList)
        }
        if (communityEventList.length === 0) {
            fetchEvents()
        }
    }, [communityEventList])

    
    // TODO: need to actually send the updated list of events to Firestore
    async function onSubmit(values: any) {
        const bodyContent = {
            name: values.name,
            description: values.description,
            summary: values.summary
        }

        if (values.name !== "") {
            await fetch('/api/events', { method: 'POST', body: JSON.stringify(bodyContent), headers: { 'Content-Type': 'application/json' } }).then(res => res.json())
            const newEventList = await fetch('/api/events').then(res => res.json())
            setCommunityEventList(newEventList)
        }
    };

    const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

    return (
        <div className={styles.container}>
            <h1>Admin Page</h1>
            <Link href='/'>Back to Home</Link>
            <br />
            <br />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <span className={styles.form}>
                      <label className={styles.label}>Name</label>
                      <Field type="text" name="name" />
                      <ErrorMessage name="name" render={renderError} />

                      <label className={styles.label}>Description</label>
                      <Field type="text" name="description" />
                      <ErrorMessage name="description" render={renderError} />

                      <label className={styles.label}>Summary</label>
                      <Field type="text" name="summary" />
                      <ErrorMessage name="summary" render={renderError} />

                      <button className={styles.submit} type="submit">Submit</button>
                    </span>
                </Form>
            </Formik>

            <ul>
                {communityEventList?.map((communityEvent: Event) => (
                    <div style={{}} key={communityEvent.id}>
                        <EventCardDisplay event={communityEvent}></EventCardDisplay>
                    </div>
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
