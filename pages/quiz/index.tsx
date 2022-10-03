import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styles from '../../styles/Home.module.css'
import { AES } from 'crypto-js'
import { AppContext } from '../../context/context'
import { Accessibility, Citizenship, EmploymentStatus, Family, Insurance, SurveyAnswers } from '../../models/types'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

const errorMessages = {
  incomeError: 'Please enter a positive number for income',
  ageError: 'Please enter a valid age'
}


const Quiz: NextPage = () => {


  const quizState = useContext(AppContext)

  const router = useRouter();

  const validationSchema = Yup.object({
    income: Yup.number()
      .positive(errorMessages.incomeError)
      .typeError(errorMessages.incomeError),
    language: Yup.string(),
    citizenship: Yup.string(),
    parentAge: Yup.number()
      .positive(errorMessages.ageError)
      .integer(errorMessages.ageError)
      .typeError(errorMessages.ageError),
    childAge: Yup.number()
      .positive(errorMessages.ageError)
      .integer(errorMessages.ageError)
      .typeError(errorMessages.ageError),
    family: Yup.string(),
    employmentStatus: Yup.number().min(1).max(10),
    insuranace: Yup.string(),
    accessibility: Yup.string(),
  });

  const initialValues = {
    income: "",
    language: "",
    citizenship: "",
    parentAge: "",
    childAge: "",
    family: "",
    employmentStatus: "",
    insurance: "",
    accessibility: ""
  };

  const handleSubmit = (values: any) => {
    console.log(values)

    const incomeLevel = values.income;

    const data = {
      incomeLevel,
    }

    const encrypted = AES.encrypt(JSON.stringify(data), "Secret Passphrase")
    quizState.changeEncryptedQuizResponse(encrypted.toString())
    router.push(`/resources`)
  };

  const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>

        {/* form */}
        <Form>
          <span className={styles.form}>
            <label className={styles.label}>Estimated Annual Income</label>
            <Field type="text" name="income" />
            <ErrorMessage name="income" render={renderError} />

            <label className={styles.label}>Language</label>
            <Field as='select' name="languages" id="languages">
              <option>English</option>
              <option>Spanish</option>
            </Field>

            <label className={styles.label}>Citizenship</label>
            <Field as='select' name="citizenship" id="citizenship">
              <option></option>
              {
                enumValues<Citizenship>(Citizenship)
              }
            </Field>

            <label className={styles.label}>Parent Age</label>
            <Field name="parentAge" />
            <ErrorMessage name="parentAge" render={renderError} />

            <label className={styles.label}>Child Age</label>
            <Field name="childAge" />
            <ErrorMessage name="childAge" render={renderError} />

            <label className={styles.label}>Family Type</label>
            <Field as='select' name="family" id="family">
              <option></option>
              {
                enumValues<Family>(Family)
              }
            </Field>

            <label className={styles.label}>Employment Status</label>
            <Field as='select' name="work" id="work">
              <option></option>
              {
                enumValues<EmploymentStatus>(EmploymentStatus)
              }
            </Field>

            <label className={styles.label}>Insurance Type</label>
            <Field as='select' name="insurance" id="insurance">
              <option></option>
              {
                enumValues<Insurance>(Insurance)
              }
            </Field>

            <label className={styles.label}>Accesibility Needs</label>
            <Field as='select' name="accessibility" id="accessibility">
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
    </div>

  )
}

function enumValues<E>(value: any): any {
  return Object.keys(value)
    .filter((elt: any) => !isNaN(Number(value[elt])))
    .map(element => <option key={element}>{element}</option>)
}

export default Quiz
