import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { addEventHandlerGenerator, useEvents } from '../../hooks/useEvents'
import { Event, EventInfo } from '../../models/types'
import { EventCardDisplay } from '../../components/EventCardDisplay'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSWRConfig } from 'swr'

const Home: NextPage = () => {
    const { mutate } = useSWRConfig()
    const {events, isLoading, isError} = useEvents()

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        description: Yup.string(),
        summary: Yup.string(),
    });
    
    const initialValues = {
        name: "",
        description: "",
        summary: "",
      };

    
    async function onSubmit(values: any) {
        const bodyContent : EventInfo = {
            name: values.name,
            description: values.description,
            summary: values.summary
        }

        mutate('/api/events', addEventHandlerGenerator(bodyContent), { revalidate: false })
        
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
                {events?.map((communityEvent: Event) => (
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
