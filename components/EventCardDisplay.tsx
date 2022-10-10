import React from 'react'
import { Card } from '@nextui-org/react';
import { Event, EventInfo } from '../models/types';
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from '../styles/Home.module.css'
import { useSWRConfig } from 'swr';
import { deleteEventHandlerGenerator, modifyEventHandlerGenerator } from '../hooks/useEvents';
interface EventCardDisplayProps {
    event: Event;
}

export const EventCardDisplay: React.FC<EventCardDisplayProps> = (props: EventCardDisplayProps) => {
    const { mutate } = useSWRConfig()

    const errorMessages = {
      nameError: 'Cannot have empty name event',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required(errorMessages.nameError),
        description: Yup.string(),
        summary: Yup.string(),
    });
    
    const initialValues : {[key: string]: string} = {
        name: props.event.name,
        description: props.event.description,
        summary: props.event.summary,
    };
    
    const handleSubmit = (values: {[key: string]: string}) : void => {        
        const newEvent : EventInfo = {
          name: values.name,
          description: values.description,
          summary: values.summary  
        }

        mutate('/api/events', modifyEventHandlerGenerator(newEvent, props.event.id), { revalidate: false })
    };

    const deleteEvent = (e: React.MouseEvent<HTMLButtonElement>) : void => {
        e.preventDefault()
        mutate('/api/events', deleteEventHandlerGenerator(props.event.id), { revalidate: false })
    }
    
    const renderError = (message: string) : JSX.Element => <p className={styles.errorMessage}>{message}</p>;

    return (
        <Card css={{ mw: "600px" }}>
          <Card.Body>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>

              <Form>
                <span className={styles.form}>
                  <label className={styles.label}>Name</label>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name" render={renderError} />

                  <label className={styles.label}>Description</label>
                  <Field type="text" name="description" />

                  <label className={styles.label}>Summary</label>
                  <Field type="text" name="summary" />

                  <button className={styles.submit} type="submit">Modify</button>
                  <button className={styles.submit} onClick={deleteEvent}>Delete</button>
                </span>
              </Form>
            </Formik>     
          </Card.Body>
        </Card>
    )
}