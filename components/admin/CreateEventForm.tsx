import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import styles from '../../styles/Home.module.css'

interface CreateEventFormProps {
    onSubmitHandler: (values: any) => Promise<void>
}

export const CreateEventForm: React.FC<CreateEventFormProps> = (props: CreateEventFormProps) => {
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

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={props.onSubmitHandler}>
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