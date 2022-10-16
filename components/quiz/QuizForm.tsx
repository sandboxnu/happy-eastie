import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { Accessibility, Citizenship, EmploymentStatus, Family, Insurance, Language, ResourceCategory } from "../../models/types";
import styles from '../../styles/Home.module.css'

interface QuizFormProps {
  onSubmitHandler: (values: any) => void
}

export const QuizForm: React.FC<QuizFormProps> = (props: QuizFormProps) => {

  const errorMessages = {
    categoryError: 'Please select at least 1 category to get resources for',
    incomeError: 'Please enter a positive number for income',
    ageError: 'Please enter a valid age'
  }

  const validationSchema = Yup.object({
    category: Yup.array().min(1, errorMessages.categoryError),
    income: Yup.number()
      .positive(errorMessages.incomeError)
      .typeError(errorMessages.incomeError)
      .nullable(),
    language: Yup.string(),
    citizenship: Yup.string(),
    parentAge: Yup.number()
      .positive(errorMessages.ageError)
      .integer(errorMessages.ageError)
      .typeError(errorMessages.ageError)
      .nullable(),
    childAge: Yup.number()
      .positive(errorMessages.ageError)
      .integer(errorMessages.ageError)
      .typeError(errorMessages.ageError)
      .nullable(),
    family: Yup.string(),
    employmentStatus: Yup.string(),
    insurance: Yup.string(),
    accessibility: Yup.string(),
  });

  const initialValues = {
    category: [],
    income: null,
    language: "",
    citizenship: "",
    parentAge: null,
    childAge: null,
    family: "",
    employmentStatus: "",
    insurance: "",
    accessibility: ""
  };


  const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmitHandler}>

      {/* form */}
      <Form>
        <span className={styles.form}>
          <label className={styles.label}>Categories</label>
          <div>
            {Object.values(ResourceCategory).map(c =>
              <label key={c}>
                <Field type="checkbox" name="category" value={c} id={c} />{c}
                <br></br>
              </label>
            )}
          </div>
          <ErrorMessage name="category" render={renderError} />

          <label className={styles.label}>Estimated Annual Income</label>
          <Field type="number" name="income" />
          <ErrorMessage name="income" render={renderError} />

          <label className={styles.label}>Language</label>
          <Field as='select' name="language">
            <option></option>
            {
              enumValues<Language>(Language)
            }
          </Field>

          <label className={styles.label}>Citizenship</label>
          <Field as='select' name="citizenship">
            <option></option>
            {
              enumValues<Citizenship>(Citizenship)
            }
          </Field>

          <label className={styles.label}>Parent Age</label>
          <Field type="number" name="parentAge" />
          <ErrorMessage name="parentAge" render={renderError} />

          <label className={styles.label}>Child Age</label>
          <Field type="number" name="childAge" />
          <ErrorMessage name="childAge" render={renderError} />

          <label className={styles.label}>Family Type</label>
          <Field as='select' name="family">
            <option></option>
            {
              enumValues<Family>(Family)
            }
          </Field>

          <label className={styles.label}>Employment Status</label>
          <Field as='select' name="employmentStatus">
            <option></option>
            {
              enumValues<EmploymentStatus>(EmploymentStatus)
            }
          </Field>

          <label className={styles.label}>Insurance Type</label>
          <Field as='select' name="insurance">
            <option></option>
            {
              enumValues<Insurance>(Insurance)
            }
          </Field>

          <label className={styles.label}>Accessibility Needs</label>
          <Field as='select' name="accessibility">
            <option></option>
            {
              enumValues<Accessibility>(Accessibility)
            }
          </Field>

          <button className={styles.submit} type="submit">Submit</button>
        </span>
      </Form>
      {/* form */}

    </Formik>
  )
}

function enumValues<E>(value: any): any {
  return Object.keys(value)
    .filter((elt: any) => !isNaN(Number(value[elt])))
    .map(element => <option key={element}>{element}</option>)
}

