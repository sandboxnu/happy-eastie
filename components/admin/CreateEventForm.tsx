import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSWRConfig } from "swr";
import * as Yup from 'yup'
import { addEventHandlerGenerator } from "../../hooks/useEvents";
import { EventInfo } from "../../models/types";
import styles from '../../styles/Home.module.css'

export const CreateEventForm: React.FC = () => {
    const { mutate } = useSWRConfig()

    const validationSchema = Yup.object({
        name: Yup.string().required("A name is required for this event"),
        description: Yup.string(),
        summary: Yup.string(),
    });
    
    const initialValues = {
        name: "",
        description: "",
        summary: "",
      };
    
    const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

    async function onSubmit(values: any) {
        const bodyContent : EventInfo = {
            name: values.name,
            description: values.description,
            summary: values.summary
        }

        mutate('/api/events', addEventHandlerGenerator(bodyContent), { revalidate: false })
        
    };

    return (
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
    )
}